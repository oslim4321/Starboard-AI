import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import os from "os";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { Buffer } from "buffer";
import axios from "axios";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    if (!file.type.includes("pdf")) {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // save temporarily (optional)
    const tempPath = join(os.tmpdir(), file.name);
    await writeFile(tempPath, buffer);

    const pdfData = await pdfParse(buffer);
    const pdfText = pdfData.text;

    // Extract data using both methods
    const extractedData = extractDataFromOM(pdfText);

    // Extract sale comparables section text
    const saleBlockMatch =
      /SALE\s+COMPARABLES([\s\S]*?)CAPITAL\s+MARKETS/i.exec(pdfText);
    const saleBlock = saleBlockMatch ? saleBlockMatch[1].trim() : "";

    if (saleBlock) {
      try {
        // Get enhanced sale comparables from Groq
        const groqComparables = await extractSaleComparablesWithGroq(saleBlock);

        // If Groq successfully returns sale comparables, replace the regex-extracted ones
        if (groqComparables && groqComparables.length > 0) {
          extractedData.saleComparables = groqComparables;
        }
      } catch (groqError) {
        console.error(
          "Groq extraction failed, using regex-based extraction:",
          groqError
        );
      }
    }

    return NextResponse.json({ data: extractedData });
  } catch (err) {
    console.error("PDF processing error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export interface Comparable {
  date: string;
  propertyName: string;
  submarket: string;
  sf: string;
  pp: string;
  owner: string;
  tenant: string;
  capRate: string;
}

interface ExtractedData {
  propertyName: string;
  location: string;
  squareFootage: string;
  tenant: string;
  financing: string;
  leaseTerm: string;
  rentalIncreases: string;
  noi: string;
  creditRating: string;
  propertyType: string;
  highlights: string[];
  //   new
  clearHeight: string;
  columnSpacing: string;
  parkingSpaces: string;
  dockDoors: string;
  evChargingStations: string;
  seawardArea: string;
  occupancyRate: string;
  saleComparables: Comparable[];
}

async function extractSaleComparablesWithGroq(
  saleBlockText: string
): Promise<Comparable[]> {
  const prompt = `Extract an array of sale comparable objects with the following keys exactly as JSON: 
  date, propertyName, submarket, sf (square footage), pp (purchase price), owner (purchaser), tenant (major tenant), capRate.
  
  Format the data consistently and include all entries from the table.`;

  const resp = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a data-extraction assistant. Respond only with valid JSON and make sure to extract all items as an array of objects with consistent field names.",
        },
        { role: "user", content: `${prompt}\n\n${saleBlockText}` },
      ],
    },
    { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
  );

  const raw = resp.data.choices[0].message.content;
  // Find JSON array in response
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");
  if (start === -1 || end === -1)
    throw new Error("No JSON array in Groq response");
  let jsonStr = raw.slice(start, end + 1);

  // Clean up JSON string
  jsonStr = jsonStr
    .trim()
    .replace(/(\d+)\s+SF/gi, '"$1 SF"')
    .replace(/("\$[\d,\.]+),"/g, '$1"')
    .replace(/(\d+(?:\.\d+)?)%/g, '"$1%"')
    .replace(/,\s*]/g, "]");

  try {
    const comparables = JSON.parse(jsonStr);
    return comparables;
  } catch (error) {
    console.error("JSON parsing error with string:", jsonStr);
    throw new Error(`Failed to parse LLM response as JSON:`);
  }
}

function extractDataFromOM(pdfText: string): ExtractedData {
  const propertyNameMatch = pdfText.match(/(\d+\s+[A-Z]+)/);
  const propertyName = propertyNameMatch?.[1] ?? "Unknown";

  const locationMatch = pdfText.match(/BROOKLYN\s*,\s*NEW\s*YORK\s*CITY/i);
  const location = locationMatch ? "BROOKLYN, NEW YORK CITY" : "Unknown";

  const sqftMatch =
    pdfText.match(/(\d+)K\s*SF/i) ??
    pdfText.match(/(\d+),000\s*square\s*feet/i);
  const squareFootage = sqftMatch ? `${sqftMatch[1]}K SF` : "Unknown";

  const tenantMatch = pdfText.match(
    /100%\s+(?:NET\s+)?LEASED\s+TO\s+([A-Z0-9]+)/i
  );
  const tenant = tenantMatch?.[1] ?? "Unknown";

  const financingMatch = pdfText.match(
    /ASSUMABLE\s+FINANCING\s+AT\s+(\d+\.\d+)%/i
  );
  const financing = financingMatch ? `${financingMatch[1]}%` : "Unknown";

  const leaseTermMatch = pdfText.match(
    /(\d+)\s+YEARS\s+OF\s+REMAINING\s+TERM/i
  );
  const leaseTerm = leaseTermMatch ? `${leaseTermMatch[1]} years` : "Unknown";

  const rentalIncreasesMatch = pdfText.match(
    /(\d+)%\s+ANNUAL\s+(?:BUMPS|ESCALATIONS)/i
  );
  const rentalIncreases = rentalIncreasesMatch
    ? `${rentalIncreasesMatch[1]}%`
    : "Unknown";

  const noiMatch = pdfText.match(/Net\s+Operating\s+Income[\s\S]*?([\d,\.]+)/i);
  const noi = noiMatch?.[1] ?? "Unknown";

  const creditRatingMatch = pdfText.match(
    /([A-Z]+)\s*\(S&P\)\s*INVESTMENT\s*GRADE/i
  );
  const creditRating = creditRatingMatch?.[1] ?? "Unknown";

  const propertyTypeMatch = pdfText.match(/LOGISTICS\s+(?:FACILITY|CENTER)/i);
  const propertyType = propertyTypeMatch ? propertyTypeMatch[0] : "Unknown";

  const highlights = extractHighlights(pdfText);

  const clearHeightMatch = pdfText.match(/(\d+)['']\s*CLEAR\s*HEIGHTS/i);
  const clearHeight = clearHeightMatch ? `${clearHeightMatch[1]}'` : "Unknown";

  // Column Spacing: e.g. "63' X 54' COLUMN SPACING"
  const columnMatch = pdfText.match(
    /(\d+)['']\s*[xX]\s*(\d+)['']\s*COLUMN\s*SPACING/i
  );
  const columnSpacing = columnMatch
    ? `${columnMatch[1]}' X ${columnMatch[2]}'`
    : "Unknown";

  // Parking Spaces: e.g. "393 TOTAL PARKING SPACES"
  const parkMatch = pdfText.match(/(\d+)\s+TOTAL\s+PARKING\s+SPACES/i);
  const parkingSpaces = parkMatch ? parkMatch[1] : "Unknown";

  // Dock Doors: capacity for 28 docks: "(CAPACITY FOR 28)"
  const dockMatch = pdfText.match(/CAPACITY\s+FOR\s+(\d+)/i);
  const dockDoors = dockMatch ? dockMatch[1] : "Unknown";

  // EV Charging Stations: e.g. "55 EV CHARGING STATIONS"
  const evMatch = pdfText.match(/(\d+)\s+EV\s+CHARGING\s+STATIONS/i);
  const evChargingStations = evMatch ? evMatch[1] : "Unknown";

  // Seaward Area: e.g. "SEAWARD AREA: 357,151 SF"
  const seaMatch = pdfText.match(/SEAWARD\s+AREA[:\s]*([\d,]+)\s*SF/i);
  const seawardArea = seaMatch
    ? `${seaMatch[1].replace(/,/g, "")} SF`
    : "Unknown";

  // Occupancy Rate: typically 100% net leased
  const occMatch = pdfText.match(/(\d+)%\s+NET\s+LEASED/i);
  const occupancyRate = occMatch ? `${occMatch[1]}%` : "Unknown";

  const saleBlockMatch = /SALE\s+COMPARABLES([\s\S]*?)CAPITAL\s+MARKETS/i.exec(
    pdfText
  );
  const saleBlock = saleBlockMatch ? saleBlockMatch[1].trim() : "";

  // Split into lines and filter out empty ones
  const lines = saleBlock.split(/\n+/).filter((line) => line.trim() !== "");

  // Find the header line to skip it
  const headerIndex = lines.findIndex(
    (line) => line.includes("Date") && line.includes("Property Name")
  );
  const dataLines = headerIndex !== -1 ? lines.slice(headerIndex + 1) : [];

  // Parse each data line
  const saleComparables: Comparable[] = [];

  dataLines.forEach((line) => {
    // Split by two or more spaces
    const fields = line.split(/\s{2,}/);
    // Ensure there are at least 9 fields (up to Purchaser) and the first field is a date like "Jun-24"
    if (fields.length >= 9 && /^[A-Za-z]{3}-\d{2}$/.test(fields[0])) {
      saleComparables.push({
        date: fields[0], // e.g., "Jun-24"
        propertyName: fields[1], // e.g., "Rock Lake Business Center"
        tenant: fields[2], // e.g., "Amazon" (Major Tenant)
        submarket: fields[3], // e.g., "South Florida (FL)"
        sf: fields[4], // e.g., "256,436"
        pp: fields[5], // e.g., "$100,500,000"
        capRate: fields[7], // e.g., "4.9%"
        owner: fields[8], // e.g., "Tishman Speyer" (Purchaser)
      });
    }
  });
  return {
    propertyName,
    location,
    squareFootage,
    tenant,
    financing,
    leaseTerm,
    rentalIncreases,
    noi,
    creditRating,
    propertyType,
    highlights,

    // new
    clearHeight,
    columnSpacing,
    parkingSpaces,
    dockDoors,
    evChargingStations,
    seawardArea,
    occupancyRate,

    // sale com
    saleComparables,
  };
}

function extractHighlights(pdfText: string): string[] {
  const section = pdfText.match(
    /(?:KEY\s+HIGHLIGHTS|INVESTMENT\s+HIGHLIGHTS)([\s\S]*?)(?:\d{2}\s+the\s+future|market\s+snapshot)/i
  )?.[1];
  if (!section) return [];

  return section
    .split(/\n+|\•/)
    .map((s) => s.trim().replace(/\s+/g, " "))
    .filter((s) => s.length > 10)
    .slice(0, 6);
}
// pages/api/extract.ts

// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";
// import pdfParse from "pdf-parse";

// export const config = {
//   api: { bodyParser: false },
// };

// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const file = formData.get("file") as File;
//   if (!file) {
//     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const pdfData = await pdfParse(buffer);
//   const text = pdfData.text;

//   try {
//     const data = await extractAllDataFromPDF(text);
//     return NextResponse.json({ data }, { status: 200 });
//   } catch (err: any) {
//     console.error("Data extraction failed:", err);
//     const status = err.response?.status === 413 ? 413 : 500;
//     const msg =
//       status === 413
//         ? "Payload too large: splitting text into smaller sections. Please retry."
//         : err.message || "Extraction error";
//     return NextResponse.json({ error: msg }, { status });
//   }
// }

// /**
//  * Extracts specified named sections, calls Grok API in smaller chunks,
//  * and merges results to avoid 413 payload too large errors.
//  */
// async function extractAllDataFromPDF(fullText: string) {
//   // Helper to slice out a section between two headings
//   function sectionBetween(startRegex: RegExp, endRegex: RegExp): string {
//     const start = fullText.search(startRegex);
//     const end = fullText.search(endRegex);
//     if (start === -1) return "";
//     return fullText.slice(start, end === -1 ? undefined : end);
//   }

//   const offeringText = sectionBetween(
//     /^01\s+the offering\./im,
//     /^02\s+the future of e-commerce\./im
//   );
//   const marketText = sectionBetween(
//     /^12\s+market snapshot\./im,
//     /^32\s+capital markets contacts\./im
//   );
//   const amazonText = sectionBetween(
//     /^AMAZON\s+LEASE BREAKDOWN\./im,
//     /^SITE PLAN\./im
//   );
//   const supplyText = sectionBetween(
//     /^Supply\s+Pipeline\b/im,
//     /^Sale\s+Comparables\b/im
//   );
//   const saleText = sectionBetween(
//     /^Sale\s+Comparables\b/im,
//     /^CAPITAL\s+MARKETS\s+CONTACTS\b/im
//   );

//   // Define prompts and field lists per section
//   const calls = [
//     {
//       name: "offering",
//       text: offeringText,
//       fields: [
//         "property_name",
//         "location",
//         "description",
//         "assumable_financing",
//         "lease_remaining_years",
//         "rental_escalations",
//         "clear_height",
//         "column_spacing",
//         "parking_spaces",
//         "loading_capacity",
//         "ev_charging_stations",
//         "occupancy_rate",
//         "square_footage",
//         "land_area",
//         "year_built",
//         "guidance_price",
//         "guidance_price_psf",
//         "cap_rate",
//       ],
//     },
//     {
//       name: "market_snapshot",
//       text: marketText,
//       fields: [
//         "neighborhood",
//         "population",
//         "consumer_base_pct",
//         "vacancy_rate",
//         "rental_growth_opportunity",
//       ],
//     },
//     {
//       name: "amazon_footprint",
//       text: amazonText,
//       fields: ["total_sf", "ny_boroughs_sf", "proximate_nnj_sf"],
//     },
//     {
//       name: "supply_pipeline",
//       text: supplyText,
//       fields: [
//         "address",
//         "submarket",
//         "delivery_date",
//         "owner",
//         "square_footage",
//       ],
//       array: true,
//     },
//     {
//       name: "sale_comparables",
//       text: saleText,
//       fields: [
//         "date",
//         "property_name",
//         "major_tenant",
//         "borough_or_market",
//         "sf",
//         "purchase_price",
//         "ppsf",
//         "cap_rate",
//         "purchaser",
//         "seller",
//       ],
//       array: true,
//     },
//   ];

//   const results: any = {};
//   for (const { name, text, fields, array } of calls) {
//     if (!text) {
//       results[name] = array ? [] : {};
//       continue;
//     }
//     const prompt = buildPrompt(fields, array);
//     const output = await callGrokPrompt(prompt, text);
//     results[name] = output;
//   }

//   return results;
// }

// // Build a concise JSON‐only prompt for one section
// function buildPrompt(fields: string[], isArray = false): string {
//   const container = isArray ? "an array of objects" : "an object";
//   return `Extract ${container} with the following keys exactly as JSON: ${fields.join(
//     ", "
//   )}.`;
// }

// async function callGrokPrompt(prompt: string, sectionText: string) {
//   const resp = await axios.post(
//     "https://api.groq.com/openai/v1/chat/completions",
//     {
//       model: "llama3-8b-8192",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a data‐extraction assistant. Respond only with valid JSON and make sure to extract all items for fields intended as arrays (include every object).",
//         },
//         { role: "user", content: `${prompt}\n\n${sectionText}` },
//       ],
//     },
//     { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
//   );

//   const raw = resp.data.choices[0].message.content;
//   // trim to first JSON block
//   const start = raw.indexOf("{");
//   const end = raw.lastIndexOf("}");
//   if (start === -1 || end === -1) throw new Error("No JSON in Grok response");
//   let jsonStr = raw.slice(start, end + 1);

//   jsonStr = jsonStr
//     .replace(/(?<=\d),(?=\d)/g, "") // remove commas in numbers
//     .replace(/(\d+(?:\.\d+)?)%/g, '"$1%"') // quote percentages
//     .replace(/\$([\d,\.]+)/g, '"$$$1"'); // quote dollar amounts

//   console.log(jsonStr, "jsonStr");
//   return JSON.parse(jsonStr);
// }

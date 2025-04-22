import {
  DollarSign,
  Percent,
  Maximize2,
  Map,
  Mountain,
  Users,
} from "lucide-react";
import Image from "next/image";
import { FileSelect } from "./components/FileSelect";
import PropertyDealSummary from "./components/PropertyDealSummary";
import FinancialMetricsDashboard from "./components/FinancialMetricsDashboard";
import RealEstateListings from "./components/RealEstateListings";
import IRRSensitivityTable from "./components/IRRSensitivityTable";
import { ExtractedData } from "../../type";

interface Props {
  data?: ExtractedData | null;
}

const DealOverview = ({ data }: Props) => {
  const defaultData: ExtractedData = {
    propertyName: "280 Richards, Brooklyn, NY",
    location: "Brooklyn, NY",
    squareFootage: "312,000 sqft",
    tenant: "AMZN",
    financing: "3.85%",
    leaseTerm: "13 years",
    rentalIncreases: "3%",
    noi: "7,271,429",
    creditRating: "AA",
    propertyType: "Warehouse",
    highlights: [],
    clearHeight: "36’",
    columnSpacing: "63’ X 54’",
    parkingSpaces: "393",
    dockDoors: "28",
    seawardArea: "357,151 sqft",
    occupancyRate: "100%",
    evChargingStations: "Amazon",
    saleComparables: [],
  };
  const d = data || defaultData;

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between border-b py-6 container mx-auto">
        <h1 className="text-2xl font-bold">Deal Overview</h1>

        <div className="flex w-full md:w-auto flex-col items-center md:items-end mt-4 md:mt-0">
          <span className="text-lg text-[#09090B] mb-2 text-center md:text-right">
            Underwriting Model
          </span>
          <FileSelect />
        </div>
      </div>
      <IRRSensitivityTable />

      <div className="px-6 py-4 container mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative w-full md:w-1/3">
            <div className="w-full h-64 rounded-lg bg-gray-200 overflow-hidden">
              <Image
                src="/images/deal-image.png"
                alt="280 Richards Property"
                className="w-full h-full object-cover"
                width={400}
                height={320}
              />
            </div>
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs bg-white bg-opacity-75 px-2 py-1 rounded">
                Click for Google Street View
              </span>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">{d.propertyName}</h2>
                <p className="text-gray-500">{d.location}</p>
                <p className="text-gray-500">{d.propertyType}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
                  Export to Excel
                </button>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
                  Generate PowerPoint
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-sm mt-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Users size={14} className="mr-1" />
                  <span>Tenant</span>
                </div>
                <p className="font-medium">{d.tenant}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-1" />
                  <span>Financing</span>
                </div>
                <p className="font-medium">{d.financing}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Percent size={14} className="mr-1" />
                  <span>Rent Increase</span>
                </div>
                <p className="font-medium">{d.rentalIncreases}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Maximize2 size={14} className="mr-1" />
                  <span>Property Size</span>
                </div>
                <p className="font-medium">{d.squareFootage}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Map size={14} className="mr-1" />
                  <span>Lease Term</span>
                </div>
                <p className="font-medium">{d.leaseTerm}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Mountain size={14} className="mr-1" />
                  <span>Credit</span>
                </div>
                <p className="font-medium">{d.creditRating}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-1" />
                  <span>NOI</span>
                </div>
                <p className="font-medium">{d.noi.slice(0, 5)}...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-6"></div>
        <PropertyDealSummary data={d} />
        <FinancialMetricsDashboard />
        <RealEstateListings data={d.saleComparables || []} />
      </div>
    </div>
  );
};

export default DealOverview;

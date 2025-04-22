import { Comparable } from "@/app/api/extract/route";

export interface ExtractedData {
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
  clearHeight: string;
  columnSpacing: string;
  parkingSpaces: string;
  dockDoors: string;
  evChargingStations: string;
  seawardArea: string;
  occupancyRate: string;
  saleComparables: Comparable[];
}

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

const DealOverview = () => {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <IRRSensitivityTable />
      {/* Main Content */}
      <div className="px-6 py-4 container mx-auto space-y-6">
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b py-6">
          <h1 className="text-2xl font-bold">Deal Overview</h1>

          {/* Underwriting Model */}
          <div className="flex w-full md:w-auto flex-col items-center md:items-end mt-4 md:mt-0">
            <span className="text-lg text-[#09090B] mb-2 text-center md:text-right">
              Underwriting Model
            </span>
            <FileSelect />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Property Image */}
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

          {/* Property Details */}
          <div className="w-full md:w-2/3">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  280 Richards, Brooklyn, NY
                </h2>
                <p className="text-gray-500">Date Uploaded: 11/06/2024</p>
                <p className="text-gray-500">Warehouse</p>
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

            {/* Property Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-sm mt-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Users size={14} className="mr-1" />
                  <span>Seller</span>
                </div>
                <p className="font-medium">Thor Equities</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-1" />
                  <span>Guidance Price</span>
                </div>
                <p className="font-medium">$143,000,000</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <DollarSign size={14} className="mr-1" />
                  <span>Guidance Price PSF</span>
                </div>
                <p className="font-medium">$23.92</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Percent size={14} className="mr-1" />
                  <span>Cap Rate</span>
                </div>
                <p className="font-medium">5.0%</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Maximize2 size={14} className="mr-1" />
                  <span>Property Size</span>
                </div>
                <p className="font-medium">312,000 sqft</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Map size={14} className="mr-1" />
                  <span>Land Area</span>
                </div>
                <p className="font-medium">16 acres</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center text-gray-500 mb-1">
                  <Mountain size={14} className="mr-1" />
                  <span>Zoning</span>
                </div>
                <p className="font-medium">M-2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Deal Summary */}
        <PropertyDealSummary />

        <FinancialMetricsDashboard />
        <RealEstateListings />
      </div>
    </div>
  );
};

export default DealOverview;

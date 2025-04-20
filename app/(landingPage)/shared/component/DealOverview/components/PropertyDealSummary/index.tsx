import React from "react";
import {
  Building,
  Columns,
  Car,
  Truck,
  Home,
  Clock,
  UserCheck,
  Ruler,
} from "lucide-react";

const PropertyDealSummary = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Section - Deal Summary */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-800">Deal Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            280 Richards, fully leased to Amazon, aligns with HUSPP's strategy
            of acquiring prime logistics assets in Brooklyn's high-demand Red
            Hook submarket. With 13 years remaining on the lease and 3% annual
            rent escalations, it offers stable, long-term cash flow. While
            single-tenant exposure is a risk, Amazon's investment-grade rating
            and renewal options enhance its resilience, making it a strong
            addition to HUSPP's portfolio.
          </p>

          <div className="pt-2">
            <h2 className="text-lg font-medium text-gray-800 mb-3">
              Personalized Insights
            </h2>
            <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
              <li className="leading-relaxed">
                Jake Klein viewed this deal in 2019, but decided not to proceed
                due to{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  lack of potential upside
                </a>
                .
              </li>
              <li className="leading-relaxed">
                On 10/19/2021, your firm bid on{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  55 Bay St, Brooklyn, NY 11231
                </a>
                , a larger site also occupied by Amazon 0.5 miles away.{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Brookfield won the deal for $45M
                </a>
                , cap rates in the area have compressed 45bps since then.
              </li>
              <li className="leading-relaxed">
                On 01/19/2025, Tom, VP of Research, noted in the Investment
                Committee meeting that congestion pricing has driven{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  renewed demand for infill industrial in Brooklyn
                </a>
                .
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Asset-Level Data */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-[18px] font-[500] text-[#71717A] mb-6 text-center">
            Asset-Level Data
          </h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* First Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Clear Heights</p>
                  <p className="text-xl font-medium">36'</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Columns className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Column Spacing</p>
                  <p className="text-xl font-medium">63' X 54'</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Car className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Parking Spaces</p>
                  <p className="text-xl font-medium">393</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500"># of Dock Doors</p>
                  <p className="text-xl font-medium">28</p>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <UserCheck className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Tenant</p>
                  <p className="text-xl font-medium">Amazon</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Ruler className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Seaward Area</p>
                  <p className="text-xl font-medium">357,151 sqft</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Year Built</p>
                  <p className="text-xl font-medium">2021</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Home className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Occupancy Rate</p>
                  <p className="text-xl font-medium">100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDealSummary;

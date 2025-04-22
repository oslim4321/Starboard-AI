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
  BatteryCharging,
  MapPin,
} from "lucide-react";
import { ExtractedData } from "@/app/(landingPage)/shared/type";

interface Props {
  data: ExtractedData;
}

const PropertyDealSummary: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Summary Text */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-800">Deal Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.propertyName}, fully leased to {data.tenant}, offers{" "}
            {data.squareFootage} of prime {data.propertyType.toLowerCase()}{" "}
            space in {data.location}. With <strong>{data.leaseTerm}</strong>{" "}
            remaining, <strong>{data.rentalIncreases}</strong> annual
            escalations, and an investment grade tenant ({data.creditRating}),
            this deal delivers stable cashflow and embedded upside.
          </p>
        </div>

        {/* Asset-Level Data */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4 text-center">
            Asset-Level Data
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Clear Height</p>
                  <p className="text-xl font-medium">{data.clearHeight}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Columns className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Column Spacing</p>
                  <p className="text-xl font-medium">{data.columnSpacing}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Car className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Parking Spaces</p>
                  <p className="text-xl font-medium">{data.parkingSpaces}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Dock Doors</p>
                  <p className="text-xl font-medium">{data.dockDoors}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BatteryCharging className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">EV Stations</p>
                  <p className="text-xl font-medium">
                    {data.evChargingStations}
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <UserCheck className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Tenant</p>
                  <p className="text-xl font-medium">{data.tenant}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-xl font-medium">{data.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Ruler className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Seaward Area</p>
                  <p className="text-xl font-medium">{data.seawardArea}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">NOI</p>
                  <p className="text-xl font-medium">{data.noi.slice(0, 4)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Home className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Occupancy Rate</p>
                  <p className="text-xl font-medium">{data.occupancyRate}</p>
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

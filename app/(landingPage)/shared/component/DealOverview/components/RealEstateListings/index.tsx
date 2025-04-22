import { Comparable } from "@/app/api/extract/route";
import React from "react";

const RealEstateListings = ({ data = [] }: { data: Comparable[] }) => {
  // Sample data for supply pipeline - in a real app this would come from props or API
  const supplyPipeline = [
    {
      image: "/images/brooklyn.png",
      address: "640 Columbia",
      submarket: "Brooklyn",
      deliveryDate: "Jun-25",
      owner: "CBREI",
      sf: "336,350",
    },
    {
      image: "/images/bronx.png",
      address: "WB Mason",
      submarket: "Bronx",
      deliveryDate: "May-25",
      owner: "Link Logistics",
      sf: "150,000",
    },
  ];

  // Use the first 4 items from the API data if available
  const saleComparables =
    data && data.length > 0
      ? data.slice(0, 4).map((item) => ({
          image: getImageForProperty(item.propertyName), // Helper function to map images
          address: item.propertyName,
          submarket: item.submarket || "N/A",
          date: item.date || "N/A",
          sf: formatNumber(item.sf),
          pp: formatCurrency(item.pp),
          owner: item.owner || "N/A",
          tenant: item.tenant || "N/A",
          capRate: item.capRate || "N/A",
        }))
      : [];

  // Helper functions for formatting
  function formatNumber(value: number | string | undefined): string {
    if (!value) return "N/A";
    return typeof value === "number" ? value.toLocaleString() : value;
  }

  function formatCurrency(value: number | string | undefined): string {
    if (!value) return "N/A";
    return typeof value === "number"
      ? `$${value.toLocaleString()}`
      : value.startsWith("$")
      ? value
      : `$${value}`;
  }

  // Helper function to map property names to images
  function getImageForProperty(propertyName: string) {
    if (!propertyName) return "/images/placeholder.png";

    const imageMap: Record<string, string> = {
      "Rock Lake Business Center": "/images/cabot.png",
      "1 Debaun Rd": "/images/cabot.png",
      "Baylis 495 Business Park": "/images/betnal-green.png",
      "Blackstone Portfolio": "/images/blackstone.png",
      "Bridgepoint Maspeth": "/images/goldman.pncabotg",
      "Northern NJ Core Industrial Portfolio": "/images/blackstone.png",
      "39 Edgeboro Road": "/images/blackstone.png",
      "Terminal Logistics Center": "/images/goldman.png",
      "240 Columbia Street": "/images/brooklyn.png",
      "12555 Flatlands": "/images/brooklyn.png",
      "WB Mason": "/images/bronx.png",
    };

    return imageMap[propertyName] || "/images/cabot.png";
  }

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Supply Pipeline Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Supply Pipeline
          </h2>
          <div className="space-y-6">
            {supplyPipeline.map((property, index) => (
              <div
                key={`pipeline-${index}`}
                className="flex flex-col sm:flex-row gap-4 border-b pb-6"
              >
                <div className="min-w-32 sm:w-32">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Address:
                      </span>{" "}
                      <span className="text-gray-700">{property.address}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Submarket:
                      </span>{" "}
                      <span className="text-gray-700">
                        {property.submarket}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Delivery Date:
                      </span>{" "}
                      <span className="text-gray-700">
                        {property.deliveryDate}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Owner:
                      </span>{" "}
                      <span className="text-gray-700">{property.owner}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">SF:</span>{" "}
                      <span className="text-gray-700">{property.sf}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sale Comparables Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Sale Comparables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saleComparables.length > 0 ? (
              saleComparables.map((property, index) => (
                <div
                  key={`comparable-${index}`}
                  className="flex flex-col gap-2"
                >
                  <div className="relative w-full h-36">
                    <img
                      src={property.image}
                      alt={property.address}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Address:
                        </span>{" "}
                        <span className="text-gray-700">
                          {property.address}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Date:
                        </span>{" "}
                        <span className="text-gray-700">{property.date}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Submarket:
                        </span>{" "}
                        <span className="text-gray-700">
                          {property.submarket}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">PP:</span>{" "}
                        <span className="text-gray-700">{property.pp}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">SF:</span>{" "}
                        <span className="text-gray-700">{property.sf}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Tenant:
                        </span>{" "}
                        <span className="text-gray-700">{property.tenant}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Owner:
                        </span>{" "}
                        <span className="text-gray-700">{property.owner}</span>
                      </div>
                      {property.capRate && (
                        <div>
                          <span className="font-semibold text-gray-800">
                            Cap Rate:
                          </span>{" "}
                          <span className="text-gray-700">
                            {property.capRate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No sale comparables data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateListings;

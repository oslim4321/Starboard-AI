import React from "react";

const RealEstateListings = () => {
  // Sample data - in a real app this would come from props or API
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

  const saleComparables = [
    {
      image: "/images/cabot.png",
      address: "1 Debaun Road",
      submarket: "Millstone, NJ",
      date: "Jun-24",
      sf: "132,930",
      pp: "$41,903,580",
      owner: "Cabot",
      tenant: "Berry Plastics",
    },
    {
      image: "/images/blackstone.png",
      address: "39 Edgeboro Road",
      submarket: "Millstone, NJ",
      date: "Oct-23",
      sf: "513,240",
      pp: "$165,776,520",
      owner: "Blackstone",
      tenant: "FedEx",
    },
    {
      image: "/images/betnal-green.png",
      address: "Baylis 495 Business Park",
      submarket: "Melville, NY",
      date: "May-24",
      sf: "103,500",
      pp: "$44,000,000",
      owner: "Betnal Green",
      tenant: "Dr. Pepper",
    },
    {
      image: "/images/goldman.png",
      address: "Terminal Logistics Center",
      submarket: "Queens, NY",
      date: "Mar-23",
      sf: "336,000",
      pp: "$136,000,000",
      owner: "Goldman",
      tenant: "Do & Co",
    },
  ];

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
            {saleComparables.map((property, index) => (
              <div key={`comparable-${index}`} className="flex flex-col gap-2">
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
                      <span className="text-gray-700">{property.address}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Date:</span>{" "}
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
                  <div>
                    <span className="font-semibold text-gray-800">Owner:</span>{" "}
                    <span className="text-gray-700">{property.owner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateListings;

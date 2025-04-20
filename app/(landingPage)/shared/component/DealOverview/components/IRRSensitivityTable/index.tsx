import React, { useState, useEffect } from "react";

interface SensitivityData {
  exitCapRates: number[];
  rentalGrowth: number[];
  irrValues: number[][];
}

const IRRSensitivityTable: React.FC = () => {
  const [sensitivityData, setSensitivityData] =
    useState<SensitivityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBackgroundColor = (value: number): string => {
    if (value >= 20) return "bg-green-300";
    if (value >= 16) return "bg-green-200";
    if (value >= 13) return "bg-yellow-200";
    if (value >= 10) return "bg-yellow-300";
    if (value >= 7) return "bg-orange-200";
    return "bg-red-200";
  };

  const mockData: SensitivityData = {
    exitCapRates: [4.0, 4.5, 5.0, 5.5, 6.0],
    rentalGrowth: [4.5, 4.0, 3.5, 3.0, 2.5],
    irrValues: [
      [24.0, 21.3, 19.0, 16.9, 15.1],
      [21.5, 18.8, 16.5, 14.5, 12.8],
      [18.7, 16.1, 13.9, 11.9, 10.2],
      [15.6, 13.1, 11.0, 9.1, 7.4],
      [12.2, 9.9, 7.8, 6.0, 4.4],
    ],
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setTimeout(() => {
          setSensitivityData(mockData);
          setLoading(false);
        }, 500);
      } catch {
        setError("Failed to load sensitivity data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading sensitivity data...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!sensitivityData) return null;

  const { exitCapRates, rentalGrowth, irrValues } = sensitivityData;

  return (
    <div className="w-full container bg-[#C1C1C14D] rounded-lg shadow-sm p-4 mx-auto my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-700 text-sm">AI</span>
          </div>
          <h2 className="text-lg sm:text-xl font-medium">Rental Growth</h2>
        </div>
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Sensitize IRR on varying Exit Cap Rates and Rental Growth"
            readOnly
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-200 p-1 sm:p-2"></th>
              {exitCapRates.map((rate, index) => (
                <th
                  key={index}
                  className="border border-gray-200 p-1 sm:p-2 text-center font-medium bg-gray-50"
                >
                  {rate.toFixed(2)}%
                </th>
              ))}
            </tr>
            <tr>
              <th className="border border-gray-200 p-1 sm:p-2"></th>
              <th
                colSpan={exitCapRates.length}
                className="border border-gray-200 p-1 text-center font-medium bg-gray-50"
              >
                Exit Cap Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {rentalGrowth.map((growth, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-200 p-1 sm:p-2 font-medium bg-gray-50">
                  {growth.toFixed(1)}%
                </td>
                {exitCapRates.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-200 p-1 sm:p-2 text-center ${getBackgroundColor(
                      irrValues[rowIndex][colIndex]
                    )}`}
                  >
                    {irrValues[rowIndex][colIndex].toFixed(1)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          Note: Values represent IRR based on different combinations of Exit Cap
          Rate and Rental Growth.
        </p>
      </div>
    </div>
  );
};

export default IRRSensitivityTable;

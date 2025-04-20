import React from "react";
import {
  DollarSign,
  BarChart2,
  Clock,
  Tag,
  Percent,
  TrendingUp,
  Building,
  Users,
  Briefcase,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

const FinancialMetricsDashboard = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Projected Financial Metrics */}
        <div className="space-y-6">
          <h2 className="text-base font-[500] text-[16px] text-[#71717A]">
            Projected Financial Metrics
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <DollarSign className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">IRR</p>
                <p className="text-xl font-semibold">13.9%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BarChart2 className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Equity Multiple</p>
                <p className="text-xl font-semibold">2.3x</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Return on Equity</p>
                <p className="text-xl font-semibold">18.5%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <DollarSign className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Return on Cost</p>
                <p className="text-xl font-semibold">19.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Assumptions */}
        <div className="space-y-6">
          <h2 className="text-base font-[500] text-[16px] text-[#71717A]">
            Key Assumptions
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Tag className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Exit Price</p>
                <p className="text-xl font-semibold">$195,000,000</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Percent className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Exit Cap Rate</p>
                <p className="text-xl font-semibold">5.0%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Rental Growth</p>
                <p className="text-xl font-semibold">3.5%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Hold Period</p>
                <p className="text-xl font-semibold">16 Years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Analysis */}
        <div className="space-y-6">
          <h2 className="text-base font-[500] text-[16px] text-[#71717A]">
            Market Analysis
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Building className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Nearest Urban Center</p>
                <p className="text-xl font-semibold">Brooklyn, NY</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Population Growth Rate</p>
                <p className="text-xl font-semibold">1.2%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Median Household Income</p>
                <p className="text-xl font-semibold">$76,912</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Briefcase className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Unemployment Rate</p>
                <p className="text-xl font-semibold">7.4%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Analysis */}
        <div className="space-y-6">
          <h2 className="text-base font-[500] text-[16px] text-[#71717A]">
            Lease Analysis
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <DollarSign className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Rent PSF</p>
                <p className="text-xl font-semibold">$24.40</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">WALT</p>
                <p className="text-xl font-semibold">13 Yrs (Sep 37)</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <TrendingUp className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">Rent Escalations</p>
                <p className="text-xl font-semibold">3%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ArrowUpRight className="h-6 w-6 p-1 border rounded-md text-gray-700" />
              <div>
                <p className="text-xs text-gray-500">
                  Mark-to-Market Opportunity
                </p>
                <p className="text-xl font-semibold">30%+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetricsDashboard;

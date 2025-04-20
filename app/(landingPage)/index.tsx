"use client";

import Navbar from "./shared/component/Navbar";
import DealOverviewComponent from "./shared/component/DealOverview/";
export default function Home() {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <DealOverviewComponent />
    </div>
  );
}

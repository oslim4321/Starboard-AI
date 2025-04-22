"use client";

import Navbar from "./shared/component/Navbar";
import DealOverviewComponent from "./shared/component/DealOverview/";
import { Modal } from "./shared/component/modal";
import { useState } from "react";
import FileUpload from "./shared/component/FileUpload";
import { ExtractedData } from "./shared/type";

export default function Home() {
  const [open, setopen] = useState(true);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );

  console.log(extractedData, "extractedData");

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      <Modal onOpenChange={setopen} open={open}>
        <FileUpload onDataExtracted={setExtractedData} setopen={setopen} />
      </Modal>
      {/* Header Navigation */}

      {/* Main Content */}
      <DealOverviewComponent data={extractedData} />
    </div>
  );
}

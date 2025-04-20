"use client";
import React, { useState } from "react";
import { ArrowLeft, Menu, X, Search, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Deal Overview");
  const tabs = ["Deal Overview", "Workshop", "Pipeline", "Settings"];

  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-200">
      <div className="flex items-center gap-2 sm:gap-8 container mx-auto">
        {/* Back Button - Visible on all screens */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={20} />
        </button>

        {/* Mobile Menu Button - Only visible on small screens */}
        <div className="block sm:hidden">
          <Sheet>
            <SheetHeader className="hidden">dd</SheetHeader>
            <SheetTrigger asChild>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4">
                  <span className="font-medium text-lg">Menu</span>
                </div>
                <div className="flex flex-col space-y-4 mt-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`flex justify-between items-center py-2 px-1 ${
                        activeTab === tab
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <span>{tab}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation - Hidden on small screens */}
        <div className="hidden sm:flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`font-medium pb-4 transition-colors ${
                activeTab === tab
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar - Adjusts width based on screen size */}
        <div className="flex-1 flex justify-end sm:justify-center mx-2">
          <div className="relative w-full max-w-xs sm:max-w-md">
            <Input
              type="text"
              placeholder="Ask me anything!"
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Brand/Logo - Always visible but can adjust size */}
        <div className="flex items-center">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-gray-500">STARBOARD</span>
          </div>
          <div className="ml-0 sm:ml-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <span className="text-xs font-medium">AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

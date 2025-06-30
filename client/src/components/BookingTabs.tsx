import { useState } from "react";
import { cn } from "@/lib/utils";

interface BookingTab {
  id: string;
  label: string;
  icon: string;
}

const tabs: BookingTab[] = [
  { id: "flights", label: "Flights", icon: "fas fa-plane" },
  { id: "hotels", label: "Hotels", icon: "fas fa-bed" },
  { id: "homestays", label: "Homestays", icon: "fas fa-home" },
  { id: "packages", label: "Holiday Packages", icon: "fas fa-umbrella-beach" },
  { id: "trains", label: "Trains", icon: "fas fa-train" },
  { id: "buses", label: "Buses", icon: "fas fa-bus" },
  { id: "cabs", label: "Cabs", icon: "fas fa-car" },
];

interface BookingTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center space-x-2 px-4 py-3 transition-colors font-semibold",
            activeTab === tab.id
              ? "text-mmt-blue border-b-2 border-mmt-blue"
              : "text-gray-600 hover:text-mmt-blue"
          )}
        >
          <i className={tab.icon}></i>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

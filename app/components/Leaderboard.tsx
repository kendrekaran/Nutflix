"use client";

import { useState } from "react";

type LeaderboardEntry = {
  userId: string;
  userName: string;
  count: number;
};

type LeaderboardProps = {
  daily: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
};

export default function Leaderboard({ daily, weekly, monthly }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");

  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
  ];

  const getLeaderboardData = () => {
    switch (activeTab) {
      case "daily":
        return daily;
      case "weekly":
        return weekly;
      case "monthly":
        return monthly;
      default:
        return daily;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "daily":
        return "Most Logs Today";
      case "weekly":
        return "Most Logs This Week";
      case "monthly":
        return "Most Logs This Month";
      default:
        return "Leaderboard";
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Leaderboard</h3>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "daily" | "weekly" | "monthly")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-text-secondary hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div>
        <h4 className="text-lg font-medium text-text-primary mb-3">{getTabTitle()}</h4>
        
        {getLeaderboardData().length === 0 ? (
          <p className="text-text-secondary py-4">No data available for this period.</p>
        ) : (
          <div className="overflow-hidden">
            <div className="grid grid-cols-12 py-2 px-3 bg-background/40 rounded-t-md text-sm font-medium text-text-secondary">
              <div className="col-span-1">#</div>
              <div className="col-span-8">User</div>
              <div className="col-span-3 text-right">Count</div>
            </div>
            
            <div className="mt-1 space-y-1">
              {getLeaderboardData().map((entry, index) => (
                <div 
                  key={entry.userId} 
                  className={`grid grid-cols-12 py-2 px-3 rounded-md text-sm ${
                    index < 3 
                      ? "bg-primary/5 text-primary font-medium" 
                      : "bg-background/20 text-text-primary"
                  }`}
                >
                  <div className="col-span-1">
                    {index + 1}
                  </div>
                  <div className="col-span-8 truncate">
                    {entry.userName}
                  </div>
                  <div className="col-span-3 text-right font-semibold">
                    {entry.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
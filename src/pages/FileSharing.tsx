import Header from "@/components/custom/Header";
import Sharing from "@/components/custom/Sharing";
import Sidebar from "@/components/custom/Sidebar";
import React from "react";

export default function FileSharing() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium"></h3>
            <Sharing />
          </div>
        </main>
      </div>
    </div>
  );
}
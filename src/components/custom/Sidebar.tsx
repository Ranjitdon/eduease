import React from "react";
import { Home, FileText, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleWhiteBoard = () => {
    navigate("/whiteboard");
  };
  const handleSharing = () => {
    navigate("/file");
  };

  return (
    <div
      className={cn(
        "w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out z-30 md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-gray-800" // Updated text color to contrast with background
      )}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="public/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-extrabold text-gray-800">EduEase</span> {/* Updated text color */}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <Menu className="h-6 w-6 text-gray-800" /> {/* Updated icon color */}
        </Button>
      </div>
      <nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-800" // Updated text color
          onClick={handleDashboard}
        >
          <Home className="mr-3 h-5 w-5 text-gray-800" /> {/* Updated icon color */}
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-800" onClick={handleWhiteBoard}> {/* Updated text color */}
          <FileText className="mr-3 h-5 w-5 text-gray-800" /> {/* Updated icon color */}
          Whiteboard
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-800" onClick={handleSharing}> {/* Updated text color */}
          <Users className="mr-3 h-5 w-5 text-gray-800" /> {/* Updated icon color */}
        Submit Assignments
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { Tool } from "./WhiteBoardComponent";
import { Pen, Eraser, Square, Circle, Save } from "lucide-react";

interface ToolbarProps {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
  onColorChange: (color: string) => void;
  onSave: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  onToolChange,
  onColorChange,
  onSave,
}) => {
  const tools: { name: Tool; icon: React.ReactNode }[] = [
    { name: "pen", icon: <Pen /> },
    { name: "eraser", icon: <Eraser /> },
    { name: "rectangle", icon: <Square /> },
    { name: "circle", icon: <Circle /> },
  ];

  return (
    <div className="bg-white shadow-md w-16 flex flex-col items-center py-4 space-y-4">
      {tools.map((tool) => (
        <button
          key={tool.name}
          className={`p-2 rounded-full ${
            selectedTool === tool.name
              ? "bg-gray-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onToolChange(tool.name)}
        >
          {tool.icon}
        </button>
      ))}
      <input
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
        className="w-8 h-8 cursor-pointer"
      />
      <div className="flex flex-col space-y-2">
        <ToolbarButton onClick={onSave} icon={<Save />} />
      </div>
    </div>
  );
};

const ToolbarButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ onClick, icon }) => (
  <button
    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
    onClick={onClick}
  >
    {icon}
  </button>
);

export default Toolbar;
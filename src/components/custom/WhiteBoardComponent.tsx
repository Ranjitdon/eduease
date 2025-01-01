import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { v4 as uuidv4 } from "uuid";

interface WhiteboardComponentProps {
  selectedTool: Tool;
  color: string;
}

interface DrawingElement {
  id: string;
  tool: Tool;
  points?: number[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
}

export type Tool = "pen" | "eraser" | "rectangle" | "circle";

const WhiteboardComponent: React.FC<WhiteboardComponentProps> = ({
  selectedTool,
  color,
}) => {
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const stageRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.width(window.innerWidth - 320);
        stageRef.current.height(window.innerHeight - 60);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    const newElement: DrawingElement = {
      id: uuidv4(),
      tool: selectedTool,
      color,
      points: [pos.x, pos.y],
    };

    if (selectedTool === "rectangle" || selectedTool === "circle") {
      newElement.x = pos.x;
      newElement.y = pos.y;
      newElement.width = 0;
      newElement.height = 0;
    }

    setElements([...elements, newElement]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastElement = elements[elements.length - 1];

    if (selectedTool === "pen" || selectedTool === "eraser") {
      const newPoints = lastElement.points?.concat([point.x, point.y]);
      const updatedElements = elements.slice(0, -1).concat({
        ...lastElement,
        points: newPoints,
      });
      setElements(updatedElements);
    } else if (selectedTool === "rectangle" || selectedTool === "circle") {
      const updatedElements = elements.slice(0, -1).concat({
        ...lastElement,
        width: point.x - lastElement.x!,
        height: point.y - lastElement.y!,
      });
      setElements(updatedElements);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth - 320}
        height={window.innerHeight - 60}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {elements.map((element) => {
            switch (element.tool) {
              case "pen":
              case "eraser":
                return (
                  <Line
                    key={element.id}
                    points={element.points}
                    stroke={
                      element.tool === "eraser" ? "#ffffff" : element.color
                    }
                    strokeWidth={element.tool === "eraser" ? 20 : 2}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      element.tool === "eraser"
                        ? "destination-out"
                        : "source-over"
                    }
                  />
                );
              case "rectangle":
                return (
                  <Rect
                    key={element.id}
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    stroke={element.color}
                    strokeWidth={2}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={element.id}
                    x={element.x! + element.width! / 2}
                    y={element.y! + element.height! / 2}
                    radius={
                      Math.max(
                        Math.abs(element.width!),
                        Math.abs(element.height!)
                      ) / 2
                    }
                    stroke={element.color}
                    strokeWidth={2}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default WhiteboardComponent;
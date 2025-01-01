import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Toolbar from "@/components/custom/Toolbar";
import WhiteboardComponent, {
  Tool,
} from "@/components/custom/WhiteBoardComponent";
import Timer from "@/components/custom/Timer";
import { Link } from "react-router-dom";

export default function Whiteboard() {
  const [selectedTool, setSelectedTool] = useState<Tool>("pen");
  const [color, setColor] = useState<string>("#000000");
  const [participants, setParticipants] = useState<string[]>([
    "User 1",
    "User 2",
  ]);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const chatInputRef = useRef<HTMLInputElement>(null);

  const handleToolChange = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleSave = () => {
    const stage = document.querySelector("canvas");
    if (stage) {
      const dataURL = stage.toDataURL();
      const link = document.createElement("a");
      link.download = "whiteboard.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSendMessage = () => {
    if (chatInputRef.current && chatInputRef.current.value.trim() !== "") {
      const message = {
        user: "You",
        text: chatInputRef.current.value,
      };
      setMessages((prev) => [...prev, message]);
      chatInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Toolbar
        selectedTool={selectedTool}
        onToolChange={handleToolChange}
        onColorChange={handleColorChange}
        onSave={handleSave}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-2 flex justify-between items-center">
          <Timer />
          <Button>
            <Link to="/dashboard">
              <LogOut />
            </Link>
          </Button>
        </div>
        <WhiteboardComponent selectedTool={selectedTool} color={color} />
      </div>
      <Card className="w-80 m-4 overflow-hidden">
        <CardContent className="p-0 h-full">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="chat" className="flex-1">
                Chat
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1">
                Users
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong>{msg.user}:</strong> {msg.text}
                  </div>
                ))}
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex">
                  <Input
                    ref={chatInputRef}
                    placeholder="Type a message..."
                    className="flex-1 mr-2"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="users" className="flex-1">
              <ScrollArea className="h-full p-4 max-h-[200px] overflow-auto">
                {participants.map((user, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user}`}
                      />
                      <AvatarFallback>{user[0]}</AvatarFallback>
                    </Avatar>
                    {user}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
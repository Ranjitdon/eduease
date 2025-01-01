import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, ClipboardCheck } from "lucide-react";
import CalendarComponent from "react-calendar"; // Import the calendar component
import "react-calendar/dist/Calendar.css";

type CardData = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const DashboardCards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([
    {
      title: "Total Courses",
      value: 0,
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
    },
    {
        title: "Assignments Submitted",
        value: 0,
        icon: <ClipboardCheck className="h-6 w-6 text-green-500" />,
      },
    {
      title: "Upcoming Deadlines",
      value: 0,
      icon: (
        <Calendar
          className="h-6 w-6 text-red-500 cursor-pointer"
          onMouseEnter={() => setShowCalendar(true)}
          onMouseLeave={() => setShowCalendar(false)}
        />
      ),
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const [deadlines, setDeadlines] = useState<Date[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesCount = 12;
        const assignmentCount = 3;
        const deadlinesData = [
          new Date(2024, 10, 25),
          new Date(2024, 10, 30),
        ]; // Replace with actual API data

        setCards([
          {
            title: "Enrolled Courses",
            value: coursesCount,
            icon: <BookOpen className="h-6 w-6 text-blue-500" />,
          },
          {
            title: "Assignments Submitted",
            value: assignmentCount,
            icon: <ClipboardCheck className="h-6 w-6 text-green-500" />,
          },
          {
            title: "Upcoming Deadlines",
            value: deadlinesData.length,
            icon: (
              <Calendar
                className="h-6 w-6 text-red-500 cursor-pointer"
                onMouseEnter={() => setShowCalendar(true)}
                onMouseLeave={() => setShowCalendar(false)}
              />
            ),
          },
        ]);
        setDeadlines(deadlinesData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const tileClassName = ({ date, view }: any) => {
    if (view === "month") {
      return deadlines.some((deadline) => deadline.toDateString() === date.toDateString())
        ? "bg-red-500 text-white"
        : "";
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap -mx-6">
        {cards.map((card, index) => (
          <div key={index} className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 relative">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
            {showCalendar && card.title === "Upcoming Deadlines" && (
              <div className="absolute mt-2 w-full bg-white bg-opacity-70 border rounded-lg p-4 z-10 shadow-md">
                <CalendarComponent
                  tileClassName={tileClassName}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

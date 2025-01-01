// RecentAssignments.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RecentAssignments: React.FC = () => {
  // Example assignments data with submission dates
  const assignments = [
    { id: 1, title: "Assignment 1", submittedDate: "2024-10-15" },
    { id: 2, title: "Assignment 2", submittedDate: "2024-10-16" },
    { id: 3, title: "Assignment 3", submittedDate: "2024-10-17" },
  ];

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments Submitted</CardTitle>
          <CardDescription>
            You have {assignments.length} assignments submitted recently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/placeholder-avatar-${assignment.id}.jpg`} // Placeholder for student avatar
                    alt="Avatar"
                  />
                  <AvatarFallback>UD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted on: {assignment.submittedDate}
                  </p>
                </div>
                <div className="ml-auto font-medium">Submitted</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentAssignments;

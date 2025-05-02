
import React from "react";
import NavBar from "@/components/NavBar";
import TaskDashboard from "@/components/TaskDashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1">
        <TaskDashboard />
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;

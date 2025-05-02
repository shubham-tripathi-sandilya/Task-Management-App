
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const TaskFilter: React.FC = () => {
  const { filterTasks } = useTaskContext();
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const handleStatusChange = (value: string) => {
    setStatus(value);
    filterTasks(value, priority, search);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
    filterTasks(status, value, search);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filterTasks(status, priority, e.target.value);
  };

  const handleReset = () => {
    setStatus("all");
    setPriority("all");
    setSearch("");
    filterTasks();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
      <div className="w-full md:w-1/3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
      </div>
      <div className="w-full md:w-1/4">
        <Select
          value={status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="inprogress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-1/4">
        <Select
          value={priority}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={handleReset}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TaskFilter;

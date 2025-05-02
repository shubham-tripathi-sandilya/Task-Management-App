
import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCheck, ListTodo, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Task, Priority } from "@/context/TaskContext";
import { useTaskContext } from "@/context/TaskContext";

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
}

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const colorMap = {
    low: "bg-task-low text-green-800",
    medium: "bg-task-medium text-amber-800",
    high: "bg-task-high text-red-800"
  };

  return (
    <Badge className={`${colorMap[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap = {
    todo: "bg-slate-200 text-slate-800",
    inprogress: "bg-blue-200 text-blue-800",
    done: "bg-green-200 text-green-800"
  };

  const statusText = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done"
  };

  return (
    <Badge className={`${colorMap[status as keyof typeof colorMap]}`}>
      {statusText[status as keyof typeof statusText]}
    </Badge>
  );
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask, updateTask } = useTaskContext();
  const formattedDate = task.dueDate 
    ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })
    : "";

  const handleStatusChange = () => {
    const statusMap = {
      todo: "inprogress",
      inprogress: "done",
      done: "todo"
    };
    updateTask(task.id, { status: statusMap[task.status as keyof typeof statusMap] });
  };

  return (
    <Card className="w-full transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{task.title}</h3>
          <PriorityBadge priority={task.priority} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <StatusBadge status={task.status} />
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-accent/10">
              {tag}
            </Badge>
          ))}
        </div>
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Calendar className="h-3 w-3 mr-1" /> 
            Due {formattedDate}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 border-t flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(task.id)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => deleteTask(task.id)} 
            className="h-8 w-8 p-0 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStatusChange}
          className="h-8 px-2"
        >
          {task.status === "done" ? 
            <ListTodo className="h-4 w-4 mr-1" /> : 
            <CheckCheck className="h-4 w-4 mr-1" />
          }
          {task.status === "done" ? "Reset" : "Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

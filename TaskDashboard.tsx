
import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "./TaskCard";
import TaskFilter from "./TaskFilter";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TaskDashboard: React.FC = () => {
  const { filteredTasks } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const handleEditTask = (id: string) => {
    setEditingTaskId(id);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTaskId(undefined);
  };

  const handleAddTask = () => {
    setEditingTaskId(undefined);
    setIsFormOpen(true);
  };

  const todoTasks = filteredTasks.filter(task => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(task => task.status === "inprogress");
  const doneTasks = filteredTasks.filter(task => task.status === "done");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-muted-foreground">
            Organize, track and manage your tasks efficiently
          </p>
        </div>
        <Button onClick={handleAddTask} className="flex items-center">
          <Plus className="mr-1 h-4 w-4" /> New Task
        </Button>
      </div>

      <TaskFilter />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium text-muted-foreground">No tasks found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your filters or create a new task.</p>
          <Button onClick={handleAddTask} className="mt-4">
            <Plus className="mr-1 h-4 w-4" /> Create New Task
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Tasks ({filteredTasks.length})</TabsTrigger>
            <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="done">Done ({doneTasks.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="todo">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="inprogress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="done">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doneTasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <TaskForm 
        isOpen={isFormOpen} 
        onClose={handleCloseForm}
        taskId={editingTaskId}
      />
    </div>
  );
};

export default TaskDashboard;

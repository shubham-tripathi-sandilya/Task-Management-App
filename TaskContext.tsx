
import React, { createContext, useContext, useState, useEffect } from "react";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  priority: Priority;
  createdAt: string;
  dueDate?: string;
  tags: string[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filterTasks: (status?: string, priority?: string, search?: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create project structure",
    description: "Set up the initial project structure and configurations",
    status: "done",
    priority: "high",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["setup", "frontend"]
  },
  {
    id: "2",
    title: "Design user interface",
    description: "Create wireframes and UI designs for the application",
    status: "inprogress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["design", "frontend"]
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Add user authentication functionality with JWT",
    status: "todo",
    priority: "high",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["backend", "security"]
  },
  {
    id: "4",
    title: "Create database schema",
    description: "Design and implement MongoDB database schema",
    status: "todo",
    priority: "medium",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["backend", "database"]
  },
  {
    id: "5",
    title: "Write API documentation",
    description: "Document all API endpoints and their usage",
    status: "todo",
    priority: "low",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["documentation"]
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Try to get tasks from localStorage on initial load
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Omit<Task, "id">>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const filterTasks = (status?: string, priority?: string, search?: string) => {
    let filtered = [...tasks];
    
    if (status && status !== "all") {
      filtered = filtered.filter(task => task.status === status);
    }
    
    if (priority && priority !== "all") {
      filtered = filtered.filter(task => task.priority === priority);
    }
    
    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        task => 
          task.title.toLowerCase().includes(searchLower) || 
          task.description.toLowerCase().includes(searchLower) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredTasks(filtered);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    filteredTasks,
    setFilteredTasks,
    filterTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

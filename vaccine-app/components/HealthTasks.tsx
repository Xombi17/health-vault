"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function HealthTasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks')
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
        toast({
          title: "Error",
          description: "Failed to fetch health tasks. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchTasks()
  }, [toast])

  const handleAddTask = async () => {
    if (!newTask) {
      toast({
        title: "Error",
        description: "Please enter a task description.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTask, completed: false }),
      })
      const data = await response.json()
      setTasks([...tasks, data])
      setNewTask('')
      toast({
        title: "Success",
        description: "Health task added successfully.",
      })
    } catch (error) {
      console.error('Failed to add task:', error)
      toast({
        title: "Error",
        description: "Failed to add health task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleTask = async (id: number) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id)
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...taskToUpdate, completed: !taskToUpdate.completed }),
      })
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
    } catch (error) {
      console.error('Failed to update task:', error)
      toast({
        title: "Error",
        description: "Failed to update health task. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Health Tasks</CardTitle>
          <CardDescription>Keep track of your health-related tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2 mb-2"
              >
                <Checkbox 
                  id={`task-${task.id}`} 
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.name}
                </label>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Input 
              placeholder="New Task" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={handleAddTask}>Add</Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


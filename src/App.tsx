// src/App.js
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
} from "@mui/material";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const API_URL = "http://localhost:3000/tasks";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post(API_URL, { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const updateTask = async (id: string, completed: boolean) => {
    await axios.patch(`${API_URL}/${id}`, { completed });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addTask} fullWidth>
        Add Task
      </Button>
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <Card key={task.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Typography variant="body2">{task.description}</Typography>
                </div>
                <div>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => updateTask(task.id.toString(), !task.completed)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteTask(task.id.toString())}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default App;

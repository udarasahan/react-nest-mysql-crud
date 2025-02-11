import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./redux/slices/taskSlice";
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Checkbox,
} from "@mui/material";
import type { RootState, AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      dispatch(
        addTask({
          title,
          description,
          completed: false,
        })
      );
      setTitle("");
      setDescription("");
    }
  };

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        fullWidth
      >
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
                    onChange={() =>
                      dispatch(
                        updateTask({ id: task.id, completed: !task.completed })
                      )
                    }
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => dispatch(deleteTask(task.id))}
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

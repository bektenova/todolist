import { Box, Typography } from "@mui/material";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  console.log("todo: ", todo);
  console.log("todos: ", todos);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAdd = () => {
    if (todo === "") {
      toast.error(
        "Внимание! Нельзя добавить пустое задание. Введите задание!!!"
      );
    } else {
      setTodos((prevState) => {
        const newTodo = {
          name: todo,
          id: uuidv4(),
          isDone: false,
        };
        return [newTodo, ...prevState];
      });

      setTodo("");
      toast.success("Ваше задание успешно добавлена!");
    }
  };

  const handleChangeDone = (event, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);

    const newTodo = {
      ...foundTodo,
      isDone: event.target.checked,
    };

    setTodos([...filterTodos, newTodo]);
    if (event.target.checked) {
      toast.success("Вы успешно выполнили поставленную задачу! ");
    } else {
      toast.warning("Вы отменили поставленную  задачу!!!");
    }
  };

  return (
    <Box sx={{ background: "#e0e0e0" }}>
      <Toaster position="top-center" richColors />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#2737cc",
        }}
      >
        <Typography
          sx={{ fontSize: "50px", fontWeight: "600", color: "white" }}
        >
          ADA TASKS FOR A WEEK
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          rowGap: "20px",
          paddingTop: "30px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AddTodo
            todo={todo}
            handleChange={handleChange}
            handleAdd={handleAdd}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <Todos
              title="ЗАДАЧИ:"
              todos={todos.filter((item) => item.isDone === false)}
              handleChange={handleChangeDone}
            />
          </Box>

          <Todos
            handleChange={handleChangeDone}
            title="СДЕЛАННЫЕ ЗАДАЧИ:"
            todos={todos.filter((item) => item.isDone === true)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

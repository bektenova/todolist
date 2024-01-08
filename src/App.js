import { Box, Typography } from "@mui/material";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(null);
  const [categori, setCategori] = useState("");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleRateChange = (value, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);
    const newTodo = {
      ...foundTodo,
      rate: value,
    };
    setTodos([newTodo, ...filterTodos]);
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
          deadline: date,
          rate: 1,
          categori,
        };
        return [newTodo, ...prevState];
      });

      setTodo("");
      setCategori("");
      setDate(null);
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

  const handleCategoriChange = (event) => {
    setCategori(event.target.value);
  };

  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("__todolist", JSON.stringify(todos));
    } else {
      const todosInLS = JSON.parse(localStorage.getItem("__todolist"));
      setTodos(todosInLS || []);
    }
  }, [todos]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
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
            ADA TASKS FOR A YEAR
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
              date={date}
              handleDateChange={handleDateChange}
              handleAdd={handleAdd}
              categori={categori}
              handleCategoriChange={handleCategoriChange}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box>
              <Todos
                title="ЗАДАЧИ:"
                todos={todos.filter((item) => item.isDone === false)}
                handleChange={handleChangeDone}
                handleRateChange={handleRateChange}
                categori={categori}
              />
            </Box>

            <Todos
              handleChange={handleChangeDone}
              handleRateChange={handleRateChange}
              title="СДЕЛАННЫЕ ЗАДАЧИ:"
              todos={todos.filter((item) => item.isDone === true)}
              categori={categori}
            />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default App;

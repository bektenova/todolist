import { TextField, Box, Typography, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
const categories = [
  "Работа:",
  "Быт:",
  "Хобби:",
  "Финансы",
  "Здоровье",
  "Личное",
  "Здоровье",
];

const AddTodo = ({
  todo,
  date,
  handleChange,
  handleAdd,
  handleDateChange,
  categori,
  handleCategoriChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <Typography
        display={"flex"}
        justifyContent={"center"}
        fontSize={"30px"}
        fontWeight={"400px"}
      >
        Введите задачу:
      </Typography>
      <TextField
        sx={{ width: "400px" }}
        name="todo"
        label="Задача"
        placeholder="Введите задачу"
        value={todo}
        onChange={handleChange}
      />
      <DateTimePicker
        value={date}
        onChange={handleDateChange}
        disablePast={true}
      />

      <TextField
        select
        label="Категория"
        value={categori}
        onChange={handleCategoriChange}
      >
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleAdd}>
        Добавить задачу
      </Button>
    </Box>
  );
};

export default AddTodo;

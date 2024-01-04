import {
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddTodo = ({ todo, handleChange, handleAdd }) => {
  return (
    <Box>
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
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAdd();
          }
        }}
        label="Задача"
        placeholder="Введите задачу"
        value={todo}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default AddTodo;

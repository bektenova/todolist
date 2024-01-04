import {
  Checkbox,
  List,
  Box,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";

const Todos = ({ todos, title, handleChange }) => {
  return (
    <Box>
      <Typography></Typography>
      <List
        sx={{ border: "1px solid grey", minWidth: "300px", padding: "20px" }}
        subheader={title}
      >
        {todos.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <Checkbox
                checked={item.isDone}
                onChange={(event) => handleChange(event, item.id)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Todos;

import "../App.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Login from "./components/Login";

function MainApp() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car shop</Typography>
        </Toolbar>
      </AppBar>

      <Login />
    </div>
  );
}

export default MainApp;

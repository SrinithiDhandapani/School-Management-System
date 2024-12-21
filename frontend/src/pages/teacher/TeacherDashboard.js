import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TeacherSideBar from "./TeacherSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "../Logout";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";
import StudentAttendance from "../admin/studentRelated/StudentAttendance";

import TeacherClassDetails from "./TeacherClassDetails";
import TeacherComplain from "./TeacherComplain";
import TeacherHomePage from "./TeacherHomePage";
import TeacherProfile from "./TeacherProfile";
import TeacherViewStudent from "./TeacherViewStudent";
import StudentExamMarks from "../admin/studentRelated/StudentExamMarks";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme
const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff", // Change primary color to white
    },
    secondary: {
      main: "#ffffff", // Change secondary color to white
    },
    background: {
      default: "#1e1e2f", // Keep the same background color
      paper: "#252532", // Keep the same background color for paper
    },
    text: {
      primary: "#ffffff", // Change primary text to white
      secondary: "#ffffff", // Change secondary text to white
    },
    divider: "#ffffff", // Change divider color to white
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h6: {
      color: "#ffffff", // Ensure h6 text is white
    },
    body1: {
      color: "#ffffff", // Ensure body text is white
    },
    button: {
      textTransform: "capitalize",
    },
  },
});

const TeacherDashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: customTheme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <AppBar open={open} position="absolute">
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: customTheme.palette.text.primary }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, color: customTheme.palette.text.primary }}
            >
              Teacher Dashboard
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: customTheme.palette.text.primary }} />
            </IconButton>
          </Toolbar>
          <Divider sx={{ backgroundColor: customTheme.palette.divider }} />
          <List component="nav">
            <TeacherSideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<TeacherHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
            <Route path="/Teacher/profile" element={<TeacherProfile />} />
            <Route path="/Teacher/complain" element={<TeacherComplain />} />
            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route
              path="/Teacher/class/student/:id"
              element={<TeacherViewStudent />}
            />
            <Route
              path="/Teacher/class/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Teacher/class/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TeacherDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) => theme.palette.background.default,
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
    backgroundColor: (theme) => theme.palette.background.paper,
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
    backgroundColor: (theme) => theme.palette.background.paper,
  },
};

import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const styles = {
        appBar: {
            background: '#1f2d3a', // AppBar background color
        },
        toolbar: {
            pr: '24px',
            backgroundColor: '#16222c', // Slightly darker toolbar
            color: '#ffffff', // White text for contrast
        },
        boxStyled: {
            backgroundColor: '#202833', // Main content background
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            color: 'white', // Light text for visibility
            padding: 2, // Padding for spacing
        },
        toolBarStyled: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            background: '#16222c', // Drawer header
            color: '#ffffff',
        },
        drawerStyled: {
            display: 'flex',
            background: '#1c2938', // Drawer background
            color: '#e0e0e0',
        },
        hideDrawer: {
            display: 'flex',
            '@media (max-width: 600px)': {
                display: 'none',
            },
        },
        tableContainer: {
            backgroundColor: '#ffffff', // White background for table
            padding: '10px',
            borderRadius: '8px',
        },
        table: {
            minWidth: 650,
            backgroundColor: '#ffffff', // Table background color
            color: 'white', // Text color inside table (black for contrast)
        },
        tableHead: {
            backgroundColor: '#f4f4f4', // Light gray background for table header
            color: '#000000', // Text color for table header
        },
        tableCell: {
            borderBottom: '1px solid #ddd', // Light gray border for cells
        },
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar open={open} position="absolute" sx={styles.appBar}>
                <Toolbar sx={styles.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Student Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <StudentSideBar />
                </List>
            </Drawer>
            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<StudentHomePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/Student/dashboard" element={<StudentHomePage />} />
                    <Route path="/Student/profile" element={<StudentProfile />} />
                    <Route path="/Student/subjects" element={<StudentSubjects />} />
                    <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                    <Route path="/Student/complain" element={<StudentComplain />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default StudentDashboard;

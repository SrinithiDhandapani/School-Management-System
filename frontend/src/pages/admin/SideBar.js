import * as React from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();

    // Function to check if the current path is active
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div style={{ backgroundColor: '#F5F5F5', height: '100vh', width: '250px', padding: '10px' }}>
            <React.Fragment>
                <ListItemButton
                    component={Link}
                    to="/"
                    selected={isActive("/") || isActive("/Admin/dashboard")}
                    sx={getStyles(isActive("/") || isActive("/Admin/dashboard"))}
                >
                    <ListItemIcon>
                        <HomeIcon color={isActive("/") || isActive("/Admin/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={{ color: isActive("/") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/classes"
                    selected={isActive("/Admin/classes")}
                    sx={getStyles(isActive("/Admin/classes"))}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon color={isActive("/Admin/classes") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" sx={{ color: isActive("/Admin/classes") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/subjects"
                    selected={isActive("/Admin/subjects")}
                    sx={getStyles(isActive("/Admin/subjects"))}
                >
                    <ListItemIcon>
                        <AssignmentIcon color={isActive("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" sx={{ color: isActive("/Admin/subjects") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/teachers"
                    selected={isActive("/Admin/teachers")}
                    sx={getStyles(isActive("/Admin/teachers"))}
                >
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={isActive("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" sx={{ color: isActive("/Admin/teachers") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/students"
                    selected={isActive("/Admin/students")}
                    sx={getStyles(isActive("/Admin/students"))}
                >
                    <ListItemIcon>
                        <PersonOutlineIcon color={isActive("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" sx={{ color: isActive("/Admin/students") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/notices"
                    selected={isActive("/Admin/notices")}
                    sx={getStyles(isActive("/Admin/notices"))}
                >
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" sx={{ color: isActive("/Admin/notices") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/Admin/complains"
                    selected={isActive("/Admin/complains")}
                    sx={getStyles(isActive("/Admin/complains"))}
                >
                    <ListItemIcon>
                        <ReportIcon color={isActive("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" sx={{ color: isActive("/Admin/complains") ? 'black' : '#757575' }} />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1, borderColor: '#CCCCCC' }} />
            <React.Fragment>
                <ListSubheader component="div" inset sx={{ color: '#757575' }}>
                    User
                </ListSubheader>
                <ListItemButton
                    component={Link}
                    to="/Admin/profile"
                    selected={isActive("/Admin/profile")}
                    sx={getStyles(isActive("/Admin/profile"))}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={isActive("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" sx={{ color: isActive("/Admin/profile") ? 'black' : '#757575' }} />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/logout"
                    selected={isActive("/logout")}
                    sx={getStyles(isActive("/logout"))}
                >
                    <ListItemIcon>
                        <ExitToAppIcon color={isActive("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" sx={{ color: isActive("/logout") ? 'black' : '#757575' }} />
                </ListItemButton>
            </React.Fragment>
        </div>
    );
};

export default SideBar;

// Helper function for conditional styles
const getStyles = (isActive) => ({
    backgroundColor: isActive ? '#E0E0E0' : 'transparent',
    '&:hover': {
        backgroundColor: '#D0D0D0',
    },
    borderRadius: '8px',
    marginBottom: '5px',
});

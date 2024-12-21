import React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const { pathname } = useLocation();

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Subjects', icon: <AssignmentIcon />, path: '/Student/subjects' },
        { text: 'Attendance', icon: <ClassOutlinedIcon />, path: '/Student/attendance' },
        { text: 'Complain', icon: <AnnouncementOutlinedIcon />, path: '/Student/complain' },
    ];

    const userMenuItems = [
        { text: 'Profile', icon: <AccountCircleOutlinedIcon />, path: '/Student/profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
    ];

    const renderMenuItems = (items) =>
        items.map(({ text, icon, path }) => (
            <ListItemButton
                key={text}
                component={Link}
                to={path}
                selected={pathname.startsWith(path)}
                sx={{
                    backgroundColor: pathname.startsWith(path) ? '#4CAF50' : 'transparent', // Active menu: Green
                    '&:hover': {
                        backgroundColor: '#333333', // Hover: Slightly darker gray
                    },
                    borderRadius: '6px', // Rounded corners
                    mx: 1, // Horizontal margin
                    color: pathname.startsWith(path) ? '#FFFFFF' : '#B0BEC5', // Text color: White for active, gray for default
                    padding: '8px 16px', // Ensure uniform padding
                }}
            >
                <ListItemIcon
                    sx={{
                        color: pathname.startsWith(path) ? '#FFFFFF' : '#B0BEC5', // Icon color matches text
                    }}
                >
                    {React.cloneElement(icon, { color: 'inherit' })}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    sx={{
                        fontWeight: pathname.startsWith(path) ? 'bold' : 'normal', // Bold text for active item
                    }}
                />
            </ListItemButton>
        ));

    return (
        <div
            style={{
                backgroundColor: '#212121', // Sidebar background: Dark gray
                height: '100vh',
                padding: '8px 0',
                overflowY: 'auto', // Scroll if content overflows
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
            }}
        >
            {renderMenuItems(menuItems)}
            <Divider
                sx={{
                    my: 2,
                    backgroundColor: '#424242', // Divider: Medium gray
                }}
            />
            <ListSubheader
                component="div"
                inset
                sx={{
                    color: '#B0BEC5', // Subheader text: Light gray
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                    letterSpacing: '1px',
                }}
            >
                User
            </ListSubheader>
            {renderMenuItems(userMenuItems)}
        </div>
    );
};

export default StudentSideBar;

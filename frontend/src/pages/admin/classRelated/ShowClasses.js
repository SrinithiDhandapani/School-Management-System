import { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled, { createGlobalStyle } from "styled-components";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1a1a40; /* Dark background for improved readability */
    color: #ffffff; /* White text for all content */
    font-family: 'Roboto', sans-serif;
  }

  table th {
    background-color: #24244d; /* Header background color */
    color: #ffffff; /* White text for headers */
    text-align: left;
    font-size: 1.1rem;
    padding: 12px 8px;
  }

  table td {
    color: #ffffff; /* White text for table rows */
    padding: 10px 8px;
    font-size: 1rem;
  }

  table tr:nth-child(even) {
    background-color: #2e2e5c; /* Alternate row color for better visibility */
  }

  table tr:hover {
    background-color: #3a3a72; /* Hover effect for table rows */
    transition: 0.3s ease-in-out;
  }

  .MuiMenuItem-root {
    color: #ffffff; /* White text for menu items */
    font-size: 0.9rem;
  }

  .MuiTooltip-tooltip {
    color: #ffffff; /* White text in tooltips */
    background-color: #333333; /* Darker tooltip background */
  }
`;

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const sclassColumns = [
    { id: "name", label: "Class Name", minWidth: 200 },
    { id: "actions", label: "Actions", minWidth: 200, align: "center" },
  ];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => ({
      name: sclass.sclassName,
      id: sclass._id,
    }));

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("/Admin/addsubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate("/Admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <ButtonContainer>
        <Tooltip title="Delete Class">
          <IconButton
            onClick={() => deleteHandler(row.id, "Sclass")}
            color="secondary"
          >
            <DeleteIcon style={{ color: "#ff5c5c" }} />
          </IconButton>
        </Tooltip>
        <BlueButton
          variant="contained"
          style={{
            backgroundColor: "#3f51b5",
            color: "#ffffff",
            padding: "6px 12px",
          }}
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
        >
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Tooltip title="Add Options">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <SpeedDialIcon style={{ color: "#ffffff" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: { ...styles.styledPaper },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon fontSize="small">{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <>
      <GlobalStyle />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <GreenButton
              variant="contained"
              style={{
                backgroundColor: "#4caf50",
                color: "#ffffff",
              }}
              onClick={() => navigate("/Admin/addclass")}
            >
              Add Class
            </GreenButton>
          </Box>
          {Array.isArray(sclassesList) && sclassesList.length > 0 && (
            <TableTemplate
              buttonHaver={SclassButtonHaver}
              columns={sclassColumns}
              rows={sclassRows}
            />
          )}
          <SpeedDialTemplate actions={actions} />
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    bgcolor: "#24244d",
    color: "#ffffff",
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "#24244d",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button:hover {
    transform: scale(1.05);
  }
`;

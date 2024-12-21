import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import {
  Paper,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

// Custom theme for dark mode
const customTheme = createTheme({
  palette: {
    background: {
      default: "#333333",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
    },
    action: {
      active: "#3a9dff",
    },
    error: {
      main: "#e57373",
    },
  },
});

const TeacherClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassStudents, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );

  const { currentUser } = useSelector((state) => state.user);
  const classID = currentUser.teachSclass?._id;
  const subjectID = currentUser.teachSubject?._id;

  useEffect(() => {
    if (classID) {
      dispatch(getClassStudents(classID));
    }
  }, [dispatch, classID]);

  if (error) {
    console.error(error);
  }

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    name: student.name,
    rollNum: student.rollNum,
    id: student._id,
  }));

  const StudentsButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = () => {
      const selectedOption = options[selectedIndex];
      if (selectedOption === "Take Attendance") {
        navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
      } else if (selectedOption === "Provide Marks") {
        navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
      }
    };

    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <BlueButton
          variant="contained"
          sx={{
            backgroundColor: customTheme.palette.action.active,
            fontSize: "0.875rem",
            marginRight: "8px",
          }}
          onClick={() => navigate(`/Teacher/class/student/${row.id}`)}
        >
          View
        </BlueButton>
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
          <Button
            onClick={handleClick}
            sx={{ backgroundColor: customTheme.palette.action.active }}
          >
            {options[selectedIndex]}
          </Button>
          <BlackButton
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            sx={{ backgroundColor: "#333" }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </BlackButton>
        </ButtonGroup>
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper sx={{ backgroundColor: customTheme.palette.background.paper }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        sx={{ color: customTheme.palette.text.primary }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div style={{ backgroundColor: customTheme.palette.background.default, minHeight: "100vh", padding: "20px" }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: customTheme.palette.text.primary }}>
              Class Details
            </Typography>
            {getresponse ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                  color: customTheme.palette.error.main,
                }}
              >
                <Typography variant="h6">No Students Found</Typography>
              </Box>
            ) : (
              <Paper
                sx={{
                  padding: "16px",
                  maxWidth: "900px",
                  margin: "auto",
                  backgroundColor: customTheme.palette.background.paper,
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ color: customTheme.palette.text.primary }}>
                  Students List:
                </Typography>
                {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                  <TableTemplate
                    buttonHaver={StudentsButtonHaver}
                    columns={studentColumns}
                    rows={studentRows}
                  />
                )}
              </Paper>
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TeacherClassDetails;

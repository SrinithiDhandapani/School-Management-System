import React, { useState } from "react";
import { Paper, Box, Typography, TextField, Button, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Custom theme
const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3a9dff",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#1e1e2f",
      paper: "#252532",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      color: "#b0b0b0",
    },
    button: {
      textTransform: "capitalize",
    },
  },
});

const TeacherComplain = () => {
  const [complain, setComplain] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleComplainChange = (event) => {
    setComplain(event.target.value);
  };

  const handleSubmit = () => {
    if (complain) {
      console.log("Complaint submitted:", complain);
      setSubmitted(true);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: customTheme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Paper
          sx={{
            padding: "24px",
            maxWidth: "600px",
            width: "100%",
            backgroundColor: customTheme.palette.background.paper,
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Teacher Complaint Form
          </Typography>

          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="body1" paragraph>
              Please enter your complaint below. Our team will review it as soon as possible.
            </Typography>
            <TextField
              label="Your Complaint"
              fullWidth
              multiline
              rows={4}
              value={complain}
              onChange={handleComplainChange}
              sx={{
                marginBottom: "16px",
                "& .MuiInputBase-root": {
                  color: customTheme.palette.text.primary, // Ensures input text is white
                },
                "& .MuiInputLabel-root": {
                  color: customTheme.palette.text.primary, // Ensures label is white
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: customTheme.palette.text.secondary, // Border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: customTheme.palette.primary.main, // Hover border color
                },
              }}
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!complain}
              sx={{ fontSize: "1rem", padding: "8px 16px" }}
            >
              Submit Complaint
            </Button>
          </Box>

          {submitted && (
            <Typography
              variant="h6"
              color="success.main"
              align="center"
              sx={{ marginTop: "16px" }}
            >
              Your complaint has been submitted successfully!
            </Typography>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default TeacherComplain;

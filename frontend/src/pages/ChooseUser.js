import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector((state) => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <ThemeContainer>
      <CardContainer>
        <Grid container spacing={4} justifyContent="center">
          <RoleCard
            title="Admin"
            description="Login as an administrator to access the dashboard to manage app data."
            Icon={AccountCircle}
            onClick={() => navigateHandler("Admin")}
          />
          <RoleCard
            title="Student"
            description="Login as a student to explore course materials and assignments."
            Icon={School}
            onClick={() => navigateHandler("Student")}
          />
          <RoleCard
            title="Teacher"
            description="Login as a teacher to create courses, assignments, and track student progress."
            Icon={Group}
            onClick={() => navigateHandler("Teacher")}
          />
        </Grid>
      </CardContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </ThemeContainer>
  );
};

const RoleCard = ({ title, description, Icon, onClick }) => (
  <Grid item xs={12} sm={6} md={4}>
    <StyledCard onClick={onClick}>
      <Box mb={2}>
        <Icon fontSize="large" style={{ color: "#FFD700" }} />
      </Box>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </StyledCard>
  </Grid>
);

export default ChooseUser;

// Theme Styling
const ThemeContainer = styled.div`
  background: linear-gradient(135deg, #2a004d, #0c144c);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const CardContainer = styled(Container)`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const StyledCard = styled(Paper)`
  padding: 20px;
  text-align: center;
  background: linear-gradient(to bottom, #4b0082, #6a1b9a);
  color: white;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
`;

import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  if (error) console.error(error);

  const sclassName = currentUser?.sclassName?.sclassName || 'Not Assigned';
  const studentSchool = currentUser?.school?.schoolName || 'Not Assigned';
  const defaultAvatar = String(currentUser?.name || 'S').charAt(0).toUpperCase();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <StyledPaper elevation={3}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar
              alt="Student Avatar"
              sx={{
                width: 150,
                height: 150,
                bgcolor: '#3f51b5',
                color: '#fff',
                fontSize: '3rem',
              }}
            >
              {defaultAvatar}
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" fontWeight="bold">
              {currentUser?.name || 'Unknown Name'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              <strong>Roll Number:</strong> {currentUser?.rollNum || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              <strong>Class:</strong> {sclassName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              <strong>School:</strong> {studentSchool}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <InfoItem label="Date of Birth" value="January 1, 2020" />
            <InfoItem label="Gender" value="Male" />
            <InfoItem label="Email" value={currentUser?.email || 'Not Provided'} />
            <InfoItem label="Phone" value={currentUser?.phone || 'Not Provided'} />
            <InfoItem label="Address" value="123 Main Street, City,chennai" />
            <InfoItem label="Emergency Contact" value="+91-7457350986" />
          </Grid>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

// Sub-component for information items
const InfoItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle1">
      <strong>{label}:</strong> {value}
    </Typography>
  </Grid>
);

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCard = styled(Card)`
  margin-top: 16px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export default StudentProfile;

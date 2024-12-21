import React from 'react';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Students from "../assets/students.svg"; // Your SVG image

const ImprovedThemeWithButtons = () => {
  return (
    <StyledContainer>
      <StyledBox>
        <Image src={Students} alt="students" />
        <TextWrapper>
          <StyledTitle>Welcome to the Future of Learning</StyledTitle>
          <StyledDescription>
            A platform where students, teachers, and administrators come together 
            for a seamless educational experience. Log in to begin your journey.
          </StyledDescription>
        </TextWrapper>
        <ButtonContainer>
          <StyledLink to="/choose">
            <StyledButton variant="contained">Login</StyledButton>
          </StyledLink>
          <StyledLink to="/chooseasguest">
            <OutlinedButton variant="outlined">Login as Guest</OutlinedButton>
          </StyledLink>
          <StyledFooterText>
            Don't have an account?{' '}
            <StyledLink to="/Adminregister" style={{ color: '#FFD700', fontWeight: 'bold' }}>
              Sign Up
            </StyledLink>
          </StyledFooterText>
        </ButtonContainer>
      </StyledBox>
    </StyledContainer>
  );
};

export default ImprovedThemeWithButtons;

const StyledContainer = styled.div`
  background: radial-gradient(circle at center, #1d1b78, #07012d);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  padding: 40px;
  border-radius: 15px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
  width: 300px;
  max-width: 100%;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.4));
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const StyledDescription = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #7f56da;
    color: white;
    padding: 12px 20px;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      background-color: #6a47b1;
    }
  }
`;

const OutlinedButton = styled(Button)`
  && {
    border-color: #7f56da;
    color: #7f56da;
    padding: 12px 20px;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      background-color: rgba(127, 86, 218, 0.1);
      border-color: #6a47b1;
    }
  }
`;

const StyledFooterText = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

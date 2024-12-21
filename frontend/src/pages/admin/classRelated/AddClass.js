import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%', filter: 'brightness(0.8)' }} // Adjusted for better dark theme integration
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <StyledTextField
                                label="Create a class"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => {
                                    setSclassName(event.target.value);
                                }}
                                required
                            />
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                            </BlueButton>
                            <StyledButton variant="outlined" onClick={() => navigate(-1)}>
                                Go Back
                            </StyledButton>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddClass;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #121212; // Dark background for the container
  color: #FFFFFF; // Light text color
  height: 100vh;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: #1E1E1E; // Dark background for the box
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  border: 1px solid #333333; // Slightly darker border
  border-radius: 8px; // Softer rounded corners
  color: #FFFFFF; // Light text color
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    background-color: #2C2C2C; // Dark input background
    color: #FFFFFF; // Light text color
  }
  & .MuiInputLabel-root {
    color: #B0BEC5; // Muted label color
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #555555; // Neutral border color
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: #4CAF50; // Green border on hover
  }
`;

const StyledButton = styled(Button)`
  color: #B0BEC5; // Light text color for the button
  border-color: #555555; // Neutral border for the button
  &:hover {
    background-color: #333333; // Slightly darker background on hover
    border-color: #4CAF50; // Green border on hover
  }
`;

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector((state) => state.user);

    // Ensure user and school information is available
    const user = currentUser?._id;
    const school = currentUser?.school?._id;
    const address = "Complain";

    // Fields to be dispatched
    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();

        // Validation before dispatch
        if (!date || !complaint || !user || !school) {
            setMessage("All fields are required.");
            setShowPopup(true);
            return;
        }

        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Complaint submitted successfully.");
            setComplaint("");
            setDate("");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("An error occurred. Please try again.");
        }
    }, [status, error]);

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom right, #344e66, #2b3b4c)',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 4,
                        py: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 3,
                        boxShadow: 3,
                        width: '100%',
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2b3b4c' }}>
                                Submit a Complaint
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#444' }}>
                                Fill in the details below to lodge your complaint.
                            </Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your complaint"
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => setComplaint(event.target.value)}
                                    required
                                    multiline
                                    rows={4}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    background: 'linear-gradient(to right, #2b3b4c, #344e66)',
                                    '&:hover': {
                                        background: 'linear-gradient(to right, #1e2834, #2b3b4c)',
                                    },
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;

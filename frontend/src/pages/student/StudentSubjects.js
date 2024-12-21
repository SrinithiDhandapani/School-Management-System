import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    BottomNavigation,
    BottomNavigationAction,
    Container,
    Paper,
    Table,
    TableBody,
    TableHead,
    Typography,
} from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    // Fetch user details
    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, 'Student'));
        }
    }, [dispatch, currentUser]);

    // Handle userDetails changes
    useEffect(() => {
        if (Array.isArray(userDetails?.examResult)) {
            setSubjectMarks(userDetails.examResult);
        } else {
            setSubjectMarks([]);
        }
    }, [userDetails]);

    // Fetch subject list if subjectMarks are empty
    useEffect(() => {
        if (subjectMarks.length === 0 && currentUser?.sclassName?._id) {
            dispatch(getSubjectList(currentUser.sclassName._id, 'ClassSubjects'));
        }
    }, [subjectMarks, dispatch, currentUser]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Subject Marks
            </Typography>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Subject</StyledTableCell>
                        <StyledTableCell>Marks</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {subjectMarks.map((result, index) =>
                        result.subName && result.marksObtained ? (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </>
    );

    const renderChartSection = () => {
        if (!subjectMarks.length) {
            return (
                <Typography variant="body1" align="center">
                    No data available for the chart.
                </Typography>
            );
        }
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Class Details
            </Typography>
            <Typography variant="h5" gutterBottom>
                You are currently in Class {sclassDetails?.sclassName || 'N/A'}
            </Typography>
            <Typography variant="h6" gutterBottom>
                These are the subjects:
            </Typography>
            {Array.isArray(subjectsList) &&
                subjectsList.map((subject, index) => (
                    <Typography key={index} variant="subtitle1">
                        {subject.subName} ({subject.subCode})
                    </Typography>
                ))}
        </Container>
    );

    return (
        <>
            {loading ? (
                <Typography variant="body1" align="center">
                    Loading...
                </Typography>
            ) : (
                <div>
                    {subjectMarks && subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation
                                    value={selectedSection}
                                    onChange={handleSectionChange}
                                    showLabels
                                >
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={
                                            selectedSection === 'table' ? (
                                                <TableChartIcon />
                                            ) : (
                                                <TableChartOutlinedIcon />
                                            )
                                        }
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={
                                            selectedSection === 'chart' ? (
                                                <InsertChartIcon />
                                            ) : (
                                                <InsertChartOutlinedIcon />
                                            )
                                        }
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </div>
            )}
        </>
    );
};

export default StudentSubjects;

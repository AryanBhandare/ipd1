import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import { TextField, Button } from '@mui/material';
import { MenuItem } from '@mui/material';
import CustomAlert from '../components/CustomAlert';
import EditorHeader from '../components/EditorHeader';
import EditorButtons from '../components/EditorButtons';
import Spacer from '../components/Spacer';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const InsuranceForm = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(
        theme.breakpoints.up('md'),
        { defaultMatches: true }
    );
    const [send, setSend] = React.useState(false);
    const canvasRef = React.createRef();
    const [formData, setFormData] = useState({
        Ball_control: "",
        d_r: "",
        total_power: "",
        shoo_hand: "",
        age: "",
        total_mentality: "",
        finishing: "",
        pass_kick: "",
        shot_pow: "",
        int_rep: "",
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    // Create a new object with modified values
    const modifiedFormData = {
        Ball_control: Number(formData.Ball_control),
        d_r: Number(formData.d_r),
        total_power: Number(formData.total_power),
        shoo_hand: Number(formData.shoo_hand),
        age: Number(formData.age),
        total_mentality: Number(formData.total_mentality),
        finishing: Number(formData.finishing),
        pass_kick: Number(formData.pass_kick),
        shot_pow: Number(formData.shot_pow),
        int_rep: Number(formData.int_rep),
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(modifiedFormData)
        try {
            const response = await fetch('http://0.0.0.0:8080/prediction', {
                method: 'POST',
                body: JSON.stringify(modifiedFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data.data)
            if (data.data.prediction) {
                setPrediction(data.data.prediction);
            }
            else {
                setPrediction(undefined)
            }
            setSend(true);
        } catch (error) {
            console.error(error);
        }
    };





    const handleDownload = () => {
        const documentDefinition = {
            content: [
                {
                    text: "Football Market Value  ",
                    style: "header"
                },
                {
                    text: "Ball Control: " + formData.Ball_control
                },
                {
                    text: "Dribbling/Reflexes: " + formData.d_r
                },
                {
                    text: "Total power " + formData.total_power
                },
                {
                    text: "Shooting/Handling: " + formData.shoo_hand
                },
                {
                    text: "Age: " + formData.age
                },
                {
                    text: "Total Mentality: " + formData.total_mentality
                },
                {
                    text: "Finishing: " + formData.finishing
                },
                {
                    text: "Passing/Kicking: " + formData.pass_kick
                },
                {
                    text: "Shot Power: " + formData.shot_pow
                },
                {
                    text: "International Reputation: " + formData.int_rep
                },
                {
                    text: "Prediction: " + `$${prediction}`
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                }
            }
        };
        pdfMake.createPdf(documentDefinition).download("InsuranceDetail.pdf");
    };




    return (
        <>
            <Helmet>
                <title>Form</title>
            </Helmet>
            <Box
                backgroundColor={theme.palette.background.default}
                minHeight='100%'
                paddingTop={15}
                paddingBottom={15}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            container
                            alignItems='center'
                            justifyContent='space-between'
                            marginTop='-30px'
                            spacing={3}
                            xs={12}
                        >
                            <Grid item>
                                <EditorHeader />
                            </Grid>
                            <Grid item xs={12}>
                                {send && (
                                    <CustomAlert
                                        variant='outlined'
                                        severity='success'
                                        title='Success'
                                    >
                                        Successfully sent the Detail to the machine learning model .
                                    </CustomAlert>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Ball Control"
                                                type="number"
                                                name="Ball_control"
                                                value={formData.Ball_control}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Dribbling/Reflexes"
                                                type="number"
                                                name="d_r"
                                                value={formData.d_r}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Total Power"
                                                type="number"
                                                name="total_power"
                                                value={formData.total_power}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Shooting/Handling"
                                                type="number"
                                                name="shoo_hand"
                                                value={formData.shoo_hand}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Age"
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Total Mentality"
                                                type="number"
                                                name="total_mentality"
                                                value={formData.total_mentality}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Finishing"
                                                type="number"
                                                name="finishing"
                                                value={formData.finishing}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Passing/Kicking"
                                                type="number"
                                                name="pass_kick"
                                                value={formData.pass_kick}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Shot Power"
                                                type="number"
                                                name="shot_pow"
                                                value={formData.shot_pow}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="International reputation"
                                                type="number"
                                                name="int_rep"
                                                value={formData.int_rep}
                                                onChange={handleChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Box height='320px'>
                                        <Box
                                            display='flex'
                                            justifyContent='center'
                                            marginBottom={2}
                                            marginTop={2}
                                        >
                                            <Typography
                                                variant='h2'
                                                align='center'
                                                gutterBottom
                                            >
                                                Result <br /><br />
                                            </Typography>
                                        </Box>
                                        <Box
                                            flexDirection='flex'
                                            justifyContent='center'
                                        >
                                            {prediction && (
                                                <>
                                                    <Typography
                                                        variant='h5'
                                                        align='center'
                                                        gutterBottom
                                                    >
                                                        The machine learning model has predicted the Cost of Insurance:<br /><br />
                                                    </Typography>
                                                    <Typography
                                                        variant='h1'
                                                        align='center'
                                                        gutterBottom
                                                    >
                                                        <span
                                                            style={{
                                                                color: green[600],
                                                                fontSize: '50px'
                                                            }}
                                                        >
                                                            {`$${prediction}`}
                                                        </span>
                                                    </Typography>
                                                </ >
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Box marginTop={4}>
                                <EditorButtons
                                    submitOnClick={handleSubmit}
                                    downloadOnClick={handleDownload}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Spacer sx={{ pt: 6 }} />
        </ >

    );
};
export default InsuranceForm;
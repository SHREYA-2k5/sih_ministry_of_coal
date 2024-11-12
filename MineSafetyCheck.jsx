import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    buttonGroup: {
        margin: '16px 0',
    },
    paper: {
        padding: '16px',
    },
    result: {
        marginTop: '16px',
    },
    formControl: {
        marginTop: '16px',
    },
    formField: {
        margin: '16px 0',
    },
    safetyButton: {
        marginRight: '8px',
    },
});

// Safety Page Component
const Safety = () => (
    <Container>
        <Typography variant="h4" gutterBottom>
            This Will Be The Safety Page
        </Typography>
        <Typography variant="body1" style={{ marginTop: '16px' }}>
            <span className="red-asterisk-span">*</span> Ensure all safety checks are completed accurately.
        </Typography>
    </Container>
);

// CheckForm Component
const CheckForm = ({ type, checks, onChange }) => (
    <Grid container spacing={3} style={{ marginTop: '16px' }}>
        <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Typography variant="h6">{type === 'preshift' ? 'Before Checks' : 'After Checks'}</Typography>
                {Object.keys(checks).map((key) => (
                    <TextField
                        key={key}
                        label={`${key.charAt(0).toUpperCase() + key.slice(1)} Levels`}
                        name={key}
                        value={checks[key]}
                        onChange={(e) => onChange(e, type)}
                        fullWidth
                        margin="normal"
                        required
                        className={useStyles().formField}
                    />
                ))}
            </Paper>
        </Grid>
    </Grid>
);

// Mine Safety Check Component
const MineSafetyCheck = () => {
    const classes = useStyles();
    const [shiftNumber, setShiftNumber] = useState('');
    const [checkType, setCheckType] = useState('');
    const [beforeChecks, setBeforeChecks] = useState({
        oxygen: '',
        methane: '',
        carbonMonoxide: '',
        ventilation: '',
        structuralIntegrity: '',
    });

    const [afterChecks, setAfterChecks] = useState({
        oxygen: '',
        methane: '',
        carbonMonoxide: '',
        ventilation: '',
        structuralIntegrity: '',
    });

    const [result, setResult] = useState('');

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'before') {
            setBeforeChecks((prev) => ({ ...prev, [name]: value }));
        } else {
            setAfterChecks((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        const issues = [];
        if (beforeChecks.oxygen !== afterChecks.oxygen) issues.push('Oxygen levels mismatch');
        if (beforeChecks.methane !== afterChecks.methane) issues.push('Methane levels mismatch');
        if (beforeChecks.carbonMonoxide !== afterChecks.carbonMonoxide) issues.push('Carbon Monoxide levels mismatch');
        if (beforeChecks.ventilation !== afterChecks.ventilation) issues.push('Ventilation issues');
        if (beforeChecks.structuralIntegrity !== afterChecks.structuralIntegrity) issues.push('Structural Integrity issues');

        setResult(issues.length > 0 ? `Not safe to enter the mine. Issues: ${issues.join(', ')}` : 'Safe to enter the mine.');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mine Safety Check
            </Typography>
            <FormControl fullWidth margin="normal" className={classes.formControl}>
                <InputLabel id="shift-number-label">Shift Number</InputLabel>
                <Select
                    labelId="shift-number-label"
                    value={shiftNumber}
                    onChange={(e) => setShiftNumber(e.target.value)}
                    required
                >
                    <MenuItem value={1}>Shift 1</MenuItem>
                    <MenuItem value={2}>Shift 2</MenuItem>
                    <MenuItem value={3}>Shift 3</MenuItem>
                </Select>
            </FormControl>
            {shiftNumber && (
                <div className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={() => setCheckType('preshift')} className={classes.safetyButton}>
                        Preshift
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setCheckType('postshift')}>
                        Postshift
                    </Button>
                </div>
            )}
            {checkType && <CheckForm type={checkType} checks={checkType === 'preshift' ? beforeChecks : afterChecks} onChange={handleChange} />}
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                Submit
            </Button>
            {result && (
                <Typography variant="h6" color="error" className={classes.result}>
                    {result}
                </Typography>
            )}
            <Typography variant="body1" style={{ marginTop: '16px' }}>
                <span className="red-asterisk-span">*</span> Ensure all safety checks are completed accurately.
            </Typography>
        </Container>
    );
};

// Main Component to Toggle Between Safety and MineSafetyCheck
const MainComponent = () => {
    const [showSafety, setShowSafety] = useState(true);

    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowSafety(!showSafety)}
                style={{ margin: '16px 0' }}
            >
                {showSafety ? 'Go to Mine Safety Check' : 'Go to Safety Page'}
            </Button>
            {showSafety ? <Safety /> : <MineSafetyCheck />}
        </Container>
    );
};

export default MainComponent;

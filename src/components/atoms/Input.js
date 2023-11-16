import { TextField } from '@mui/material';


export const InputField = ({
    type = "text",
    label,
    error,
    helperText,
    name,
    onChange,
    value,
    styles,
    variant,
    ...rest

}) => {
    return (
        <TextField
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            error={error}
            helperText={helperText}
            sx={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiInputBase-input': {
                padding: '12px',
                },
                marginTop: "35px",
                ...styles,
            }}
            variant="outlined"
            label={label}
            {...rest}
        />
    );
};

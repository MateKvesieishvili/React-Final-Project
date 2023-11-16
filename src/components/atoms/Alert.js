import { Snackbar, Alert as MUIAlert } from "@mui/material"

export const Alert = ({open, severity, message, handleClose})=>{
    return <Snackbar
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        open ={open}
        autoHideDuration={3000}
        onClose={handleClose}
    >
        <MUIAlert open={open} duration={3000} severity={severity} variant="filled">
            {message}
        </MUIAlert>
    </Snackbar>
}
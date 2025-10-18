import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Toast(props) {
    const { severity = "success", message = "This is a toast", toggle = () => { }, isOpen = false } = props

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={toggle}>
            <Alert
                onClose={toggle}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
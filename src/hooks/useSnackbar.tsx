import React from 'react';

export function useSnackbar() {
    const [isActive, setIsActive] = React.useState(false);
    const [message, setMessage] = React.useState("");
    
    React.useEffect(() => {
        if (isActive === true) {
            setTimeout(() => {
                setIsActive(false);
            }, 3000);
        }
    }, [isActive]);

    const openSnackBar = (msg = 'Something went wrong...') => {
        setMessage(msg)
        setIsActive(true);
    }

    return { isActive, message, openSnackBar }
}
import React, { useEffect, useState } from "react";

interface Http200Props {
    message: string;
}

const Http200: React.FC<Http200Props> = ({ message }) => {
    const [showAlert, setShowAlert] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 6000);

        return () => clearTimeout(timer);  
    }, []);

    if (!showAlert) {
        return null;  
    }

    return (
        <div id="" className="alert alert-success mx-auto text-center HttpReponse" role="alert">
            <p id="textHttp" >{message}</p>
        </div>
    );
};

export default Http200;
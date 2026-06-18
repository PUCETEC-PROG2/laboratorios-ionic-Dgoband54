import { IonSpinner } from "@ionic/react";
import React from "react";

const LoadingSpinner: React.FC = () => {
    return(
        <div className="loading-over lay">
            <IonSpinner name="circular" color="primary" className="loading-spinner"/>

        </div>
    );
}

export default LoadingSpinner;
import React from "react";
import DefaultPage from "./defaultes";
import { NavigationBar } from "../components/NavigationBar";
import { useLocation } from "react-router-dom";

function MainPage() {
    const location = useLocation();

    return (
        <div>
            {location.state ? (
                <div className="background">
                    <NavigationBar user={location.state} />
                </div>
            ) : (
                    <DefaultPage />
                )}
        </div>
    );
}

export default MainPage;

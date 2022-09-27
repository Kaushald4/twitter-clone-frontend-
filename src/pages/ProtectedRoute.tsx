import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalstorage";

function ProtectedRoute({ children }: any) {
    let user: any = localStorage.getItem("user");

    if (!user) {
        return <Navigate to={"/"} />;
    }

    user = JSON.parse(user);

    if (!user.jwtToken) {
        return <Navigate to={"/"} />;
    }

    return children;
}

export default ProtectedRoute;

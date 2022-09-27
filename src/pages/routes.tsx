import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from ".";
import HomePage from "./homePage";
import ProfilePage from "./profilePage";
import ProtectedRoute from "./ProtectedRoute";
import ViewFollowerPage from "./viewFollowerPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/:username"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/:username/:follow"
                    element={
                        <ProtectedRoute>
                            <ViewFollowerPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
}

export default AppRoutes;

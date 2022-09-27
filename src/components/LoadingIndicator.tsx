import React from "react";

interface Props {
    isLoading: boolean;
    children?: any;
}

function LoadingIndicator({ isLoading, children }: Props) {
    if (isLoading) {
        return (
            <div className="h-[40vh] flex justify-center items-center">
                <div className="loader"></div>
            </div>
        );
    } else {
        return children;
    }
}

export default LoadingIndicator;

import React from "react";

interface Props {
    isShow: boolean;
    message: string;
}

function ErrorMessage({ isShow, message }: Props) {
    if (isShow) {
        return (
            <div className="bg-primary text-white px-[20px] py-[2px] rounded-[4px] text-center">
                {message}
            </div>
        );
    }
    return <div />;
}

export default ErrorMessage;

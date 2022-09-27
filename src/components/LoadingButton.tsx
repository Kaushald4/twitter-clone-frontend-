import React from "react";

interface Props {
    onClick: () => void;
    isDisabled?: boolean;
    title: string;
    isLoading?: boolean;
    primary?: boolean;
}

function LoadingButton({ isDisabled, onClick, title, isLoading, primary }: Props) {
    let className;
    if (primary) {
        className =
            "bg-[#1d9bf0] disabled:bg-[#cccccc] text-white font-[500] w-full py-[14px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500";
    } else {
        className =
            "bg-[#000000] disabled:bg-[#cccccc] text-white font-[500] w-full py-[14px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500";
    }

    return (
        <button onClick={onClick} disabled={isDisabled || isLoading} className={className}>
            {isLoading ? <span className="loader block mx-auto" /> : <>{title}</>}
        </button>
    );
}

export default LoadingButton;

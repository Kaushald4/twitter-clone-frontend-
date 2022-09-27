import React from "react";

interface Props {
    vertical: "center" | "start" | "end";
    horizontal: "center" | "start" | "end" | "between" | "around";
    children?: any;
    onClick?: () => void;
    hover?: boolean;
}

function Container({ horizontal, vertical, children, onClick, hover }: Props) {
    let className = `flex relative `;

    switch (horizontal) {
        case "center":
            className += "justify-center ";
            break;
        case "between":
            className += "justify-between ";
            break;
        case "around":
            className += "justify-around ";
            break;
        case "end":
            className += "justify-end ";
            break;
        case "start":
            className += "justify-start ";
            break;
    }

    switch (vertical) {
        case "center":
            className += "items-center ";
            break;
        case "end":
            className += "items-end ";
            break;
        case "start":
            className += "items-start ";
            break;
    }

    if (hover) {
        className += " hover:bg-gray-200 px-[8px] py-[8px] rounded-full w-[120%] cursor-pointer";
    }

    return (
        <div onClick={onClick as any} className={className}>
            {children}
        </div>
    );
}

export default Container;

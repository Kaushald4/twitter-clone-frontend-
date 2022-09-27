import React from "react";

interface Props {
    icon?: any;
    title: string;
}

function IconButton({ title, icon }: Props) {
    return (
        <button className="border border-gray-200 rounded-full flex items-center h-[40px] w-[300px] justify-center">
            <span className="">{icon ? icon : <span />}</span>
            <span className="inline-block pl-2 font-[600] text-[14px]">{title}</span>
        </button>
    );
}

export default IconButton;

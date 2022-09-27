import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/hook";

interface Props {
    to: string;
    Icon: any;
    title: string;
    state?: string;
}

function NavBarIconLink({ Icon, state, title, to }: Props) {
    return (
        <NavLink
            to={to}
            state={state}
            className="hover:bg-gray-200 rounded-full w-min py-3 pl-[10px] pr-8 my-[5px]"
            style={({ isActive }) => {
                return {
                    fontWeight: isActive ? 500 : "normal",
                };
            }}
        >
            <div className="flex items-center gap-4">
                <div className="w-[26px]">{<Icon />}</div>
                <div>
                    <p className="text-[20px] font-[Open Sans]">{title}</p>
                </div>
            </div>
        </NavLink>
    );
}

export default NavBarIconLink;

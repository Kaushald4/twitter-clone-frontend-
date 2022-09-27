import React from "react";
import { TwitterSearchIcon } from "./SvgIcons";

function NewsSideBar() {
    return (
        <div className="min-w-[20%] ml-[20px]">
            <div className="fixed mt-[10px]">
                <div className="flex items-center">
                    <div className="w-[20px] absolute left-4">
                        <TwitterSearchIcon />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Twitter"
                            className="focus:outline-none pl-[50px] w-full bg-slate-100 rounded-full py-[11px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsSideBar;

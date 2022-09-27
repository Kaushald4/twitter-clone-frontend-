import React from "react";

interface Props {
    tab: string;
    tabIndex: number;
    activeTab: number;
    handleTabChange: (tabIndex: number) => void;
}

function Tabs({ tab, tabIndex, activeTab, handleTabChange }: Props) {
    return (
        <div
            onClick={() => handleTabChange(tabIndex)}
            style={{
                fontWeight: tabIndex === activeTab ? 700 : 400,
                color: tabIndex !== activeTab ? "gray" : "#000000",
            }}
            className="hover:bg-gray-200 px-[40px] pt-[15px] pb-0 cursor-pointer text-[15px]"
        >
            {tab}
            {activeTab === tabIndex && (
                <span className="inline-block w-full mt-[10px] h-[4px] bg-primary rounded-full"></span>
            )}
        </div>
    );
}

export default Tabs;

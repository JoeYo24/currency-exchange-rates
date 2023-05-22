import React, { useState } from "react";
import FirstTab from "../AllTabs/FirstTab";
import SecondTab from "../AllTabs/SecondTab";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const handleTab1 = () => {
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        setActiveTab("tab2");
    };
    return (
        <div className="Tabs">
            {/* Tab nav */}
            <ul className="nav">
                <li 
                    className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}
                >
                    Convert
                </li>
                <li 
                    className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}
                >
                    Exchange Rates
                </li>
            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
            </div>
        </div>
    );
};
export default Tabs;

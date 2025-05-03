import React from "react";
import { useState } from "react";
import CasteWiseReport from "./CasteWiseReport/CasteWiseReport";
import ReligionWiseReport from "./ReligionWiseReport/ReligionWiseReport";
import GenderWiseReport from "./GenderWiseReport/GenderWiseReport";

const SummaryReportChart = () => {
    //card enable/disable start
    const [cardActive, setCardActive] = useState(true);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div
                    className={`educare-common-card-title ${
                        cardActive ? "" : "pb-0"
                    }`}
                >
                    <h5 onClick={handleToggle} className="cursor-pointer">
                        <i className="icon-user"></i>
                        Student Report
                    </h5>
                    <span onClick={handleToggle} className="cursor-pointer">
                        <i
                            className={`${
                                cardActive ? "icon-minus" : "icon-plus"
                            }`}
                        ></i>
                    </span>
                </div>
                <div
                    className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${
                        cardActive ? "" : "hidden"
                    }`}
                >
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                            <CasteWiseReport />
                        </div>
                        <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                            <ReligionWiseReport />
                        </div>
                        <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                            <GenderWiseReport />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryReportChart;

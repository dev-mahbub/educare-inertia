import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import appLogo1 from "../../../../../images/help-desk/play-store.png"
import appLogo2 from "../../../../../images/help-desk/apple-store.png"

const StaffSupportTitle = () => {
    return (
        <div className="text-center mb-[60px] pt-[25px]">
            <h2 className="text-[36px] mb-2.5 maxSm:text-[28px] text-heading font-semibold">
                Helpdesk for staff
            </h2>
            <p className="text-[16px] mb-7 font-medium max-w-[1000px] mx-auto text-headingLight">
                Your school key is{" "}
                <span className="text-[16px] font-semibold text-danger">
                    demo
                </span>
                . Please use the following menus to help yourself. If you need more assistance, contact the school.
            </p>
            <div className="inline-flex gap-2.5 help-desk-app-btn">
                <div>
                    <Tooltip
                        title="Download Android APP & Rate us"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-primary-btn-lg-fill justify-center items-center"
                        >
                            <img src={appLogo1} alt="logo not found" />
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title="Download IOS App" placement="top" arrow>
                        <Link
                            href="#"
                            className="educare-primary-btn-lg-fill justify-center items-center"
                        >
                            <img src={appLogo2} alt="logo not found" />
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default StaffSupportTitle;

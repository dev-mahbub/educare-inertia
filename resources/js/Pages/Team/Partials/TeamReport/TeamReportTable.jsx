import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";

const TeamReportTable = () => {
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false]);
    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };
    //table inner toggle collapse end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Team Name</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            1
                                            <button
                                                type="button"
                                                className="educare-enq-arrow"
                                                onClick={() =>
                                                    handleEnqToggle(0)
                                                }
                                            >
                                                <i
                                                    className={`${
                                                        enqInnerActive[0]
                                                            ? "icon-arrow-up"
                                                            : "icon-down-arrow"
                                                    }`}
                                                ></i>
                                            </button>
                                        </td>
                                        <td>Annual Function</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr
                                        className={`${
                                            enqInnerActive[0] ? "" : "hidden"
                                        }`}
                                    >
                                        <td
                                            colSpan="12"
                                            className="educare-admission-list-enq-inner-wrap"
                                        >
                                            <table className="educare-admission-list-enq-inner">
                                                <thead>
                                                    <tr>
                                                        <th>Admission No</th>
                                                        <th>Name</th>
                                                        <th>Class</th>
                                                        <th>Mobile</th>
                                                     
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Hartik Pandey</td>
                                                        <td>XI A</td>
                                                        <td>0124151425</td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Hartik Pandey</td>
                                                        <td>XI A</td>
                                                        <td>0124151425</td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Hartik Pandey</td>
                                                        <td>XI A</td>
                                                        <td>0124151425</td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Hartik Pandey</td>
                                                        <td>XI A</td>
                                                        <td>0124151425</td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <td>01</td>
                                                        <td>Hartik Pandey</td>
                                                        <td>XI A</td>
                                                        <td>0124151425</td>
                                                       
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamReportTable;

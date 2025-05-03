import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

const Menus = [
    { id: 1, menu: "All" },
    { id: 2, menu: "A" },
    { id: 3, menu: "B" },
    { id: 4, menu: "C" },
    { id: 5, menu: "D" },
    { id: 6, menu: "E" },
    { id: 7, menu: "F" },
    { id: 8, menu: "G" },
    { id: 9, menu: "H" },
    { id: 10, menu: "I" },
    { id: 11, menu: "J" },
    { id: 12, menu: "K" },
    { id: 13, menu: "L" },
    { id: 14, menu: "M" },
    { id: 15, menu: "N" },
    { id: 16, menu: "O" },
    { id: 17, menu: "P" },
    { id: 18, menu: "Q" },
    { id: 19, menu: "R" },
    { id: 20, menu: "S" },
    { id: 21, menu: "T" },
    { id: 22, menu: "U" },
    { id: 23, menu: "V" },
    { id: 24, menu: "W" },
    { id: 25, menu: "X" },
    { id: 26, menu: "Y" },
    { id: 27, menu: "Z" },
];

const InActiveList = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="educare-letter-filter-area pt-2">
            <div className="educare-letter-filter">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className="mb-5"
                >
                    {Menus.map((menu, index) => (
                        <Tab key={index} label={menu.menu} />
                    ))}
                </Tabs>

                {Menus.map((menu, index) => (
                    <div key={index} hidden={value !== index}>
                        <div className="educare-admission-list-area">
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Emp. ID {menu.menu}</th>
                                                    <th>Teacher Name</th>
                                                    <th>Teacher Type</th>
                                                    <th>Department</th>
                                                    <th>Designation</th>
                                                    <th>Role</th>
                                                    <th>Phone</th>
                                                    <th>Inactive Date</th>
                                                    <th>Reason</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Anil</td>
                                                    <td>Teaching</td>
                                                    <td>Dummy</td>
                                                    <td>Dummy</td>
                                                    <td>Teacher</td>
                                                    <td>2323883932</td>
                                                    <td>18 Nov 2022</td>
                                                    <td>Duplicate</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Active Teacher"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="badge primary"
                                                                    >
                                                                        Make
                                                                        Active
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Akhil</td>
                                                    <td>Teaching</td>
                                                    <td>Dummy</td>
                                                    <td>Dummy</td>
                                                    <td>Teacher</td>
                                                    <td>2323883922</td>
                                                    <td>19 Nov 2022</td>
                                                    <td>Duplicate</td>
                                                    <td>
                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                            <div>
                                                                <Tooltip
                                                                    title="Active Teacher"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="badge primary"
                                                                    >
                                                                        Make
                                                                        Active
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InActiveList;

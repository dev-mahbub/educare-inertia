import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const DailyOnlineFeePaymentTable = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No</th>
                                        <th>Student</th>
                                        <th>Class</th>
                                        <th>Amount</th>
                                        <th>OrderId</th>
                                        <th>Resp.Code</th>
                                        <th>Txndate</th>
                                        <th>Bank</th>
                                        <th>Mode</th>
                                        <th>Paytm Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SPS2025</td>
                                        <td>Akhil</td>
                                        <td>I A</td>
                                        <td>3050</td>
                                        <td>5478357</td>
                                        <td>1045</td>
                                        <td>27 Dec,2023</td>
                                        <td>Bank Usa</td>
                                        <td>Pending</td>
                                        <td>Pending</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href="#"
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="View"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-tertiary-btn-sm-fill"
                                                        >
                                                            <i className="icon-eye"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div className="relative">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <div className="educare-dropdown-menu">
                                                                <button
                                                                    type="button"
                                                                    className="educare-dark-btn-sm-fill"
                                                                >
                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                </button>
                                                            </div>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SPS2015</td>
                                        <td>Nikhil</td>
                                        <td>I B</td>
                                        <td>3090</td>
                                        <td>588357</td>
                                        <td>1045</td>
                                        <td>28 Dec,2023</td>
                                        <td>Test Band</td>
                                        <td>Pending</td>
                                        <td>Approved</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href="#"
                                                            className="educare-warning-btn-sm-fill"
                                                        >
                                                            <i className="icon-editing"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="View"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-tertiary-btn-sm-fill"
                                                        >
                                                            <i className="icon-eye"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div className="relative">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <div className="educare-dropdown-menu">
                                                                <button
                                                                    type="button"
                                                                    className="educare-dark-btn-sm-fill"
                                                                >
                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                </button>
                                                            </div>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
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
        </>
    );
};

export default DailyOnlineFeePaymentTable;

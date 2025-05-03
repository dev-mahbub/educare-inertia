import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Dropdown from "@/Components/Dropdown";

export default function ImportHistoryList() {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        dummy_1: "",
        dummy_2: "",
    });

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Import Fee History
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Upload Date</th>
                                            <th>Total Entries</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>7 December 2023</td>
                                            <td>127</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
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
                                                            <Link
                                                                href="#"
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Delete"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>9 December 2023</td>
                                            <td>126</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
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
                                                            <Link
                                                                href="#"
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Delete"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </Link>
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
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Import Transport Voucher History
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Upload Date</th>
                                            <th>Total Entries</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>7 December 2023</td>
                                            <td>453</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
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
                                                            <Link
                                                                href="#"
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Delete"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8 December 2023</td>
                                            <td>657</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
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
                                                            <Link
                                                                href="#"
                                                                className="educare-tertiary-btn-sm-fill"
                                                            >
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Delete"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </Link>
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
        </>
    );
}

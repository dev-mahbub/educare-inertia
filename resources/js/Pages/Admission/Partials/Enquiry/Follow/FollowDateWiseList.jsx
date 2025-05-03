import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const FollowDateWiseList = ({ dateWiseReport }) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Visitor Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {dateWiseReport?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.contact_name}</td>
                                        <td>{item.contact_number}</td>
                                        <td>{item.contact_email}</td>
                                        <td>{item.first_name} {item.middle_name} {item.last_name}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip title="Edit" placement="top" arrow>
                                                        <Link href="#" className="educare-warning-btn-sm-fill">
                                                            <i className="icon-editing"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip title="View" placement="top" arrow>
                                                        <Link href="#" className="educare-tertiary-btn-sm-fill">
                                                            <i className="icon-eye"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip title="Delete" placement="top" arrow>
                                                        <Link href="#" className="educare-danger-btn-sm-fill">
                                                            <i className="icon-TrashSimple"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                                <div className='relative'>
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <div className="educare-dropdown-menu">
                                                                <button type="button" className="educare-dark-btn-sm-fill">
                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                </button>
                                                            </div>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy One
                                                            </Dropdown.Link>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy Two
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>                         
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                    <tr>
                                        <td>2</td>
                                        <td>Akash</td>
                                        <td>84284884478</td>
                                        <td>admin@gmail.com</td>
                                        <td>Ashik</td>
                                        <td>IV</td>
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
                                                <div className='relative'>
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <div className="educare-dropdown-menu">
                                                                <button type="button" className="educare-dark-btn-sm-fill">
                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                </button>
                                                            </div>
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy One
                                                            </Dropdown.Link>
                                                            <Dropdown.Link href="#">
                                                                <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                Dummy Two
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

export default FollowDateWiseList;

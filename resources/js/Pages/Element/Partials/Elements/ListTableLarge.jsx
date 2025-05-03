import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";

const ListTableLarge = () => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Large Table With Active Row
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Id
                                        </th>
                                        <th>Student Name</th>
                                        <th>Adm No.</th>
                                        <th>Roll No.</th>
                                        <th>Class</th>
                                        <th>DOB</th>
                                        <th>Father</th>
                                        <th>Father Mobile</th>
                                        <th>SMS No</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Akhil</td>
                                        <td>1111</td>
                                        <td>250</td>
                                        <td>IX</td>
                                        <td>26 Feb 2001</td>
                                        <td>Asshis</td>
                                        <td>01857494741</td>
                                        <td>659</td>
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
                                                        <button type="button"
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
                                                        <button type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
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
                                                                Dummy
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>                         
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Akhil</td>
                                        <td>1111</td>
                                        <td>250</td>
                                        <td>IX</td>
                                        <td>26 Feb 2001</td>
                                        <td>Asshis</td>
                                        <td>01857494741</td>
                                        <td>659</td>
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
                                                        <button type="button"
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
                                                        <button type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
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
                                                                Dummy
                                                            </Dropdown.Link>
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </div>                         
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Akhil</td>
                                        <td>1111</td>
                                        <td>250</td>
                                        <td>IX</td>
                                        <td>26 Feb 2001</td>
                                        <td>Asshis</td>
                                        <td>01857494741</td>
                                        <td>659</td>
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
                                                        <button type="button"
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
                                                        <button type="button"
                                                            className="educare-danger-btn-sm-fill"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
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

export default ListTableLarge;

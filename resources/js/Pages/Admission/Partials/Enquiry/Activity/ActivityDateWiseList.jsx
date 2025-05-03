import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const ActivityDateWiseList = ( {enqueryReportList} ) => {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admission_enquery_reg.delete', id));
            }
        });
    }

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
                                {enqueryReportList?.length > 0 ? (
                                    enqueryReportList.map((item, index) => (
                                        <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.contact_name}</td>
                                        <td>{item.father_mobile}</td>
                                        <td>{item.father_email}</td>
                                        <td>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</td>
                                        <td>{item.class_title}</td>
                                        <td>
                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link href={route('admission_enquery_reg.edit', item.id)}
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
                                                        onClick={ () => handleDelete(item.id)}
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
                                       ))
                                       ) : (
                                           <tr>
                                               <td colSpan="7">No data available</td>
                                           </tr>
                                       )}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityDateWiseList;

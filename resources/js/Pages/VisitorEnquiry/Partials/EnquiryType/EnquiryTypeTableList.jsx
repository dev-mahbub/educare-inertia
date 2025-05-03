import React from 'react';
import { Link, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

const EnquiryTypeTableList = ({visitorsTypes, activeVisitorType, setActiveVisitorType}) => {
    const handleEditButton = (e, id, title, description) => {
        e.preventDefault();
        setActiveVisitorType({
            id: id,
            title: title,
            description: description
        });
    }

    const handleDeleteButton = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('visitor_enquiry.type_destroy', id), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    }
                });
            }
        });
     
    }
    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-info"></i>
                    Enquiry Type
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { visitorsTypes.length > 0 &&
                            visitorsTypes.map((visitorType) => (
                            <tr key={visitorType.id}>
                                <td>{visitorType.title}</td>
                                <td>{visitorType.description}</td>
                                <td>
                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                        <div>
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                                arrow
                                            >
                                                <Link
                                                    type='button'
                                                    onClick={(e) => handleEditButton(e, visitorType.id, visitorType.title, visitorType.description)}
                                                    className="educare-warning-btn-sm-fill"
                                                >
                                                    <i className="icon-editing"></i>
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
                                                    as="button"
                                                    onClick={(e) => {handleDeleteButton(e, visitorType.id)}}
                                                    className="educare-danger-btn-sm-fill"
                                                >
                                                    <i className="icon-TrashSimple"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnquiryTypeTableList;
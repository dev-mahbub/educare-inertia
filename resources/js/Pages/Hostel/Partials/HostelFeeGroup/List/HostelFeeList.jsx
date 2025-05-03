import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const HostelFeeList = ({ hostelFees = [] }) => {

    const handleEdit = (e, id) => {
        e.preventDefault();
        router.post(route('hostel.fee_group_edit'), { id: id })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        // setDeletedItem(id);
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
                router.delete(route('hostel.fee_group_destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hostelFees?.length > 0 ?
                            hostelFees?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={(e) => handleEdit(e, item?.id)}
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-editing"></i>
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
                                                        as="button"
                                                        onClick={(e) => handleDelete(e, item?.id)}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="12">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default HostelFeeList;

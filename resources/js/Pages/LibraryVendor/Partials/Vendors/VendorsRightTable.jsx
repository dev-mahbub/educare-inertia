import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

const VendorsRightTable = ({ setVendor, libraryVendor = [] }) => {

    // delete
    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('library_vendor.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Library Vendors
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Company</th>
                                <th>Contact No.</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                libraryVendor?.length > 0 ? (
                                    libraryVendor?.map((item, index) => (
                                        <tr key={index}>
                                            <td> {item?.vendor_name} </td>
                                            <td> {item?.company_name} </td>
                                            <td> {item?.contact_no} </td>
                                            <td> {item?.email} </td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={() => setVendor(item)}
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
                                                                onClick={(e) => handleDelete(e, item?.id)}
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="7"
                                        >
                                            Holiday not found
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default VendorsRightTable;

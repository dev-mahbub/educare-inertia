import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from "sweetalert2";

const LeaveTypeTable = ({
    leaveTypes,
    setEditableData,
    setFormMode
}) => {

    // handle delete leave type start
    const handleDeleteLeaveType = (id) => {
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
                router.delete(route("leave.delete_type", id));
            }
        });
    };
    // handle delete leave type end

    // handle edit leave type start
    const handleEditLeaveType = (id) => {
        setEditableData(leaveTypes?.find(item => item?.id == id) ?? {});
        setFormMode('edit');
    }
    // handle edit leave type end

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5> Leave Type Listing</h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>Acronym</th>
                            <th>Display Order</th>
                            <th>Auto Leave Deduction Order</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveTypes?.length > 0 ?
                            leaveTypes?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>{item?.acronym}</td>
                                    <td>{item?.display_order}</td>
                                    <td>{item?.auto_leave_deduction_order}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                        onClick={() => {
                                                            handleEditLeaveType(item?.id)
                                                        }}
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
                                                        onClick={() => {
                                                            handleDeleteLeaveType(item?.id)
                                                        }}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td
                                    className="text-center text-red-500"
                                    colSpan="7"
                                >
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveTypeTable;

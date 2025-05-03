import { router } from "@inertiajs/react";
import { Tooltip } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const LeaveApproversTable = ({
    leaveApprovers
}) => {

    // handle delete leave approver start
    const handleDeleteLeaveApprover = (id) => {
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
                router.delete(route('leave.approvers.delete', id));
            }
        });
    }
    // handle delete leave approver end

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    Leave Approver
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveApprovers?.length > 0 ?
                            leaveApprovers.map((item, index) => (
                                <tr key={index}>
                                    <td>{`${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}`}</td>
                                    <td>{item?.staff?.designation?.name}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Delete"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={() => {
                                                            handleDeleteLeaveApprover(item?.id)
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

export default LeaveApproversTable;

import Dropdown from '@/Components/Dropdown';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LeaveRequestDetailPopup from './Popup/LeaveRequestDetailPopup';

const ManageLeaveRequestTable = ({
    leaves,
    isLeaveApprover,
    handleFilterLeaves
}) => {

    const [showLeaveRequestDetailPopup, setShowLeaveRequestDetailPopup] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState({});

    // handle cancel leave request start
    const handleCancelLeaveRequest = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('leave.cancel_request', id), {} , {
                    onSuccess:  () => {
                        handleFilterLeaves();
                    },
                    onError:  () => {
                        handleFilterLeaves();
                    }
                });
            }
        });
    }
    // handle cancel leave request end

    // handle approve leave request start
    const handleApproveLeaveRequest = (id) => {
        router.put(route('leave.approve_request', id), {}, {
            onSuccess: () => {
                handleFilterLeaves();
            },
            onError: () => {
                handleFilterLeaves();
            }
        });
    }
    // handle approve leave request end

    // handle view leave request details start
    const handleViewLeaveRequestDetails = (id) => {
        setShowLeaveRequestDetailPopup(true);
        setSelectedLeave(leaves?.find(item => item?.id == id) ?? {});
    }
    // handle view leave request details end


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Staff Name</th>
                                        <th>Type</th>
                                        <th>Days</th>
                                        <th>Format No.</th>
                                        <th>Leave Date</th>
                                        <th>Applied On</th>
                                        <th>Leave Reason</th>
                                        <th>Approver Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves?.length > 0 ?
                                        leaves.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <span
                                                        className={`mr-1 badge ${item?.is_approved == true ? 'success' : (item?.is_cancelled == true ? 'danger' : 'warning')}`}
                                                    >
                                                        {item?.is_approved == true ? 'A' : (item?.is_cancelled == true ? 'C' : 'P')}
                                                    </span>

                                                    {`${item?.staff?.first_name ?? ''} ${item?.staff?.middle_name ?? ''} ${item?.staff?.last_name ?? ''}`}
                                                </td>
                                                <td>{item?.leave_type?.acronym}</td>
                                                <td>{item?.no_of_days}</td>
                                                <td>{item?.format_no}</td>
                                                <td>{item?.start_date} to {item?.end_date}</td>
                                                <td>{item?.applied_on}</td>
                                                <td>{item?.description}</td>
                                                <td>{item?.approver_note}</td>
                                                <td>
                                                    {(item?.is_cancelled == false && isLeaveApprover == false) &&
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
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
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                handleApproveLeaveRequest(item?.id)
                                                                            }}
                                                                            disabled={item?.is_approved == true}
                                                                            className={item?.is_approved == true ? 'cursor-not-allowed' : ''}
                                                                        >
                                                                            Approve
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                handleViewLeaveRequestDetails(item?.id)
                                                                            }}
                                                                        >
                                                                            Leave Detail
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                handleCancelLeaveRequest(item?.id)
                                                                            }}
                                                                        >
                                                                            Leave Cancel
                                                                        </button>
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="9"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <LeaveRequestDetailPopup
                showLeaveRequestDetailPopup={showLeaveRequestDetailPopup}
                setShowLeaveRequestDetailPopup={setShowLeaveRequestDetailPopup}
                selectedLeave={selectedLeave}
            />
        </>
    );
};

export default ManageLeaveRequestTable;

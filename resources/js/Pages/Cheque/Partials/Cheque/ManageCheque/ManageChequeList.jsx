import Dropdown from '@/Components/Dropdown';
import Loader from "@/Components/Loader";
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from "sweetalert2";
import EditChequeNoPopup from './Popup/EditChequeNoPopup';
import SetClearanceDate from './Popup/SetClearanceDate';

const ManageChequeList = ({
    chequeReports = [],
    loading,
    filterChequeReports,
    setLoading
}) => {
    const [modalEditChequeNoOpen, setModalEditChequeNoOpen] = useState(false);
    const [modalSetClearanceDateOpen, setModalSetClearanceDateOpen] = useState(false);
    const [selectedCheque, setSelectedCheque] = useState({});

    // handle cheque report data update start
    const handleSetBounceClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0b52bd',
            cancelButtonColor: '#38b3fe',
            confirmButtonText: 'Ok!',
        }).then((result) => {
            if (result.isConfirmed) {
                const form_data = {
                    type: 'cheque_bounce'
                }

                router.patch(route('cheque_data.update', id), form_data);
            }
        });

    };

    const handleEditChequeNoClick = (id) => {
        setModalEditChequeNoOpen(!modalEditChequeNoOpen);
        setSelectedCheque(chequeReports?.find(cheque => cheque.id === id));
    };

    const handleSetClearanceDateClick = (id) => {
        setModalSetClearanceDateOpen(!modalSetClearanceDateOpen);
        setSelectedCheque(chequeReports?.find(cheque => cheque.id === id));
    };
    // handle cheque report data update end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ChequeNo</th>
                                        <th>Bank Name</th>
                                        <th>Cheque Date</th>
                                        <th>Amount</th>
                                        <th>Student Name</th>
                                        <th>Adm. No</th>
                                        <th>Class</th>
                                        <th>Pay Date</th>
                                        <th>Receipt No</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {chequeReports?.length > 0 ? (
                                            chequeReports?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.cheque_no}</td>
                                                    <td>{item?.bank?.name}</td>
                                                    <td>{item?.cheque_date}</td>
                                                    <td>{parseFloat(item?.cheque_amount ?? 0)}</td>
                                                    <td>{`${item?.student?.first_name} ${item?.student?.middle_name} ${item?.student?.last_name}`}</td>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>{item?.student?.classroom?.title}</td>
                                                    <td>{item?.payment_date}</td>
                                                    <td>{item?.receipt_no}</td>
                                                    <td>
                                                        <span className={`badge ${item?.is_bounced_cheque == false ? 'success' : 'danger'}`}>{item?.is_bounced_cheque == false ? 'Cleared' : 'Bounced'}</span>
                                                        {item?.is_cancelled == true &&
                                                            <span className="badge warning">Fee Cancelled</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            {/* <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route(
                                                                            "cheque.pdc.edit",
                                                                            item?.id
                                                                        )}
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
                                                            </div> */}
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
                                                                            onClick={(e) => {
                                                                                handleSetBounceClick(item?.id)
                                                                            }}
                                                                        >
                                                                            Set Bounce
                                                                        </button>

                                                                        {item?.is_cancelled == false &&
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    handleEditChequeNoClick(item?.id)
                                                                                }}
                                                                            >
                                                                                Edit Cheque No
                                                                            </button>
                                                                        }

                                                                        {item?.is_cancelled == false &&
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    handleSetClearanceDateClick(item?.id)
                                                                                }}
                                                                            >
                                                                                Set Clearance Date
                                                                            </button>
                                                                        }

                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="11">Data not found</td>
                                                </tr>
                                        )}
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <EditChequeNoPopup
                modalEditChequeNoOpen={modalEditChequeNoOpen}
                setModalEditChequeNoOpen={setModalEditChequeNoOpen}
                cheque={selectedCheque}
                filterChequeReports={filterChequeReports}
                setLoading={setLoading}
            />
            <SetClearanceDate
                modalSetClearanceDateOpen={modalSetClearanceDateOpen}
                setModalSetClearanceDateOpen={setModalSetClearanceDateOpen}
                cheque={selectedCheque}
                filterChequeReports={filterChequeReports}
                setLoading={setLoading}
            />
        </>
    );
};

export default ManageChequeList;

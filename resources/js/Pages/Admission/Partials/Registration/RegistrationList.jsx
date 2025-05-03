import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Swal from 'sweetalert2';
import PushToRegPopup from './RegPopup/PushToRegPopup';
import UpdateFormNumber from './RegPopup/UpdateFormNumber';
import UpdateRegNumber from './RegPopup/UpdateRegNumber';
import UpdateRegStatus from './RegPopup/UpdateRegStatus';


const RegistrationList = ({
    registrations,
    registrationStatusArray = []
}) => {
    const [formNumberPopup, setFormNumberPopup] = useState(false);
    const [regNumberPopup, setRegNumberPopup] = useState(false);
    const [regStatusPopup, setRegStatusPopup] = useState(false);

    const [pushToRegPopup, setPushToRegPopup] = useState(false);
    const [entryStudentData, setEntryStudentData] = useState({});
    const [selectedRegistrationData, setSelectedRegistrationData] = useState({});


    const handleFormNumberModalClick = () => {
        setFormNumberPopup(!formNumberPopup);
    };
    const handleRegNumberModalClick = () => {
        setRegNumberPopup(!regNumberPopup);
    };
    const handleRegStatusModalClick = () => {
        setRegStatusPopup(!regStatusPopup);
    };

    //push to registration popup
    const handlePushToRegPopupClick = (data) => {
        setEntryStudentData(data)
        setPushToRegPopup(!pushToRegPopup);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({});

    const RegistrationListData = (e) => {
        e.preventDefault();
    };
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
                router.delete(route('admission.registration_list.delete', id));
            }
        });
    }

    //form validation end

    // handle print registration receipt start
    const handlePrintRegistrationReceipt = (id) => {
        Cookies.set('enquiryFeeId', id);

        const url = route('admission_pdf_generator.admission_fee');

        if (url != "") {
            window.open(url, '_blank')
        }
    }
    // handle print registration receipt end


    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={RegistrationListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Reg. No.</th>
                                            <th>Form No.</th>
                                            <th>Class</th>
                                            <th>Name</th>
                                            <th>DOB</th>
                                            <th>Father Name</th>
                                            <th>Mobile</th>
                                            <th>Fee</th>
                                            <th>Adm No.</th>
                                            <th>Reg. Date</th>
                                            <th>Taken By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations?.length > 0 ?
                                            registrations?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {(item?.registration_status == 'Registration Rejected' || item?.registration_status == 'Cancelled') &&
                                                            <span className="badge danger"> {item?.registration_status}</span>
                                                        }

                                                        {item?.registration_status == 'New' &&
                                                            <span className="badge warning"> {item?.registration_status}</span>
                                                        }

                                                        {item?.registration_status == 'Admission Taken' &&
                                                            <span className="badge info"> {item?.registration_status}</span>
                                                        }

                                                        {item?.registration_status == 'On Hold' &&
                                                            <span className="badge primary"> {item?.registration_status}</span>
                                                        }
                                                        {/* <span className={`badge ${item?.registration_status == 'Registration Rejected' || item?.registration_status == 'Cancelled' ? 'danger' : 'success'}`}> {item?.registration_status}</span> */}
                                                        <span className='block'>{item?.registration_no}</span>
                                                    </td>
                                                    <td>{item?.form_no}</td>
                                                    <td>{item?.class_title}</td>
                                                    <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                                    <td>{item?.birth_date}</td>
                                                    <td>{`${item?.father_first_name ?? ""} ${item?.father_middle_name ?? ""} ${item?.father_last_name ?? ""}`}</td>
                                                    <td>{item?.contact_number}</td>
                                                    <td>{formatNumber(item?.academic_fee ?? 0)}</td>
                                                    <td>{item?.student?.admission_no ?? ""}</td>
                                                    <td>{item?.registration_date}</td>
                                                    <td>{`${item?.user_first_name ?? ""} ${item?.user_middle_name ?? ""} ${item?.user_last_name ?? ""}`}</td>
                                                    <td>
                                                        <div className="educare-admission-list-action-btn">
                                                            {item?.enquiry_type == 'Registration' ?
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Edit" placement="top" arrow>
                                                                        <Link href={route('admission_enquery_reg.edit_registration', item.id)} className="bg-supportingB/80 inline-block">
                                                                            <i className="icon-editing"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                            :
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Edit" placement="top" arrow>
                                                                        <button
                                                                            className="bg-supportingB/80 inline-block cursor-not-allowed"
                                                                            disabled={true}
                                                                            type='button'
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                             }

                                                            {/* <div className="educare-list-button-field-styles">
                                                                <Tooltip title="View" placement="top" arrow>
                                                                    <Link href="#" className="bg-supportingC/80 inline-block">
                                                                        <i className="icon-eye"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div> */}

                                                            {item?.enquiry_type == 'Registration' ?
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Delete" placement="top" arrow>
                                                                        <button
                                                                            className="bg-danger inline-block"
                                                                            onClick={() => handleDelete(item.id)}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            :
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Delete" placement="top" arrow>
                                                                        <button
                                                                            disabled={true}
                                                                            type='button'
                                                                            className="bg-danger/50 inline-block cursor-not-allowed"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            }

                                                            <div className="educare-list-button-field-styles">
                                                                <Dropdown>
                                                                    <Dropdown.Trigger>
                                                                        <div
                                                                            type="button"
                                                                            className="educare-dropdown-menu"
                                                                        >
                                                                            <PrimaryButton type="button" className="bg-dark/80 inline-block">
                                                                                <i className="icon-DotsThreeOutlineVertical"></i>
                                                                            </PrimaryButton>
                                                                        </div>
                                                                    </Dropdown.Trigger>

                                                                    <Dropdown.Content>

                                                                        {item?.enquiry_type == 'Registration' &&
                                                                            <button type='button' onClick={() => {
                                                                                handlePushToRegPopupClick(item);
                                                                            }}>
                                                                                Start Admission Process
                                                                            </button>
                                                                        }

                                                                        {item?.enquiry_type == 'Admission' &&
                                                                            <button type='button' onClick={() => {
                                                                                handlePushToRegPopupClick(item);
                                                                            }}>
                                                                                View Admission Process
                                                                            </button>
                                                                        }

                                                                        {/* <Dropdown.Link href="#">
                                                                            Registration Form
                                                                        </Dropdown.Link> */}
                                                                        <a target="_blank" href={route('admission_pdf_generator.registration_form', item?.id)}>
                                                                            Registration Form
                                                                        </a>

                                                                        {/* {item?.enquiry_type == 'Registration' &&
                                                                            <Dropdown.Link href="/admission/process">
                                                                                Start Admission Process
                                                                            </Dropdown.Link>
                                                                        }

                                                                        {item?.enquiry_type == 'Admission' &&
                                                                            <Dropdown.Link href="/admission/process">
                                                                                View Admission Process
                                                                            </Dropdown.Link>
                                                                        } */}

                                                                            {/* <Dropdown.Link href="/admission/process">
                                                                                Admission Process
                                                                            </Dropdown.Link> */}

                                                                        {item?.enquiry_type == 'Registration' &&
                                                                            // <a target="_blank" href={route('admission_pdf_generator.admission_fee', item.id)}>
                                                                            //     Receipt
                                                                            // </a>
                                                                            <button
                                                                                type='button'
                                                                                onClick={() => {
                                                                                    handlePrintRegistrationReceipt(item?.id)
                                                                                }}
                                                                            >
                                                                                Receipt
                                                                            </button>
                                                                        }

                                                                        {item?.enquiry_type == 'Registration' &&
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                        setSelectedRegistrationData(item);
                                                                                        handleRegStatusModalClick();
                                                                                    }
                                                                                }
                                                                            >
                                                                                Update Registration Status
                                                                            </button>
                                                                        }

                                                                        <button
                                                                            type="button"
                                                                            onClick={ () => {
                                                                                setSelectedRegistrationData(item);
                                                                                handleFormNumberModalClick()
                                                                            }}

                                                                        >
                                                                            Update Form Number
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                    setSelectedRegistrationData(item);
                                                                                    handleRegNumberModalClick()
                                                                                }
                                                                            }
                                                                        >
                                                                            Update Registration No.
                                                                        </button>

                                                                    </Dropdown.Content>
                                                                </Dropdown>
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
                        </form>
                    </div>
                </div>
            </div>
            <PushToRegPopup
                pushToRegPopup = {pushToRegPopup}
                setPushToRegPopup = {setPushToRegPopup}
                entryStudentData = {entryStudentData}
                setEntryStudentData = {setEntryStudentData}

            />
            <UpdateFormNumber
                formNumberPopup = {formNumberPopup}
                setFormNumberPopup = {setFormNumberPopup}
                selectedRegistrationData = {selectedRegistrationData}
            />
            <UpdateRegNumber
                regNumberPopup = {regNumberPopup}
                setRegNumberPopup = {setRegNumberPopup}
                selectedRegistrationData = {selectedRegistrationData}
            />
            <UpdateRegStatus
                regStatusPopup = {regStatusPopup}
                setRegStatusPopup = {setRegStatusPopup}
                selectedRegistrationData = {selectedRegistrationData}
                registrationStatusArray = {registrationStatusArray}
            />
        </>
    );
};

export default RegistrationList;

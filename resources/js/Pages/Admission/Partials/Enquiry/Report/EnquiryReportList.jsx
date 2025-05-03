import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FollowUpPopupForm from '../../FollowUpPopupForm';
import PushToRegPopup from './Popup/PushToRegPopup';
import UpdateEnquiryStatus from './Popup/UpdateEnquiryStatus';

const EnquiryReportList = ({
    enqueryReportList,
    enquiryStatusArray,
    formData
}) => {

    const [modalFollowUpOpen, setModalFollowUpOpen] = useState(false);
    const [enquiryStatusPopup, setEnquiryStatusPopup] = useState(false);
    const [pushToRegPopup, setPushToRegPopup] = useState(false);
    const [entryStudentData, setEntryStudentData] = useState({});
    const [selectedEnquiryReport, setSelectedEnquiryReport] = useState({});

    const handleModalFollowUpClick = () => {
        setModalFollowUpOpen(!modalFollowUpOpen);
    };
    const handleEnquiryStatusPopupClick = () => {
        setEnquiryStatusPopup(!enquiryStatusPopup);
    };
    const handlePushToRegPopupClick = (data) => {
        setEntryStudentData(data)
        setPushToRegPopup(!pushToRegPopup);
    };

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(enqueryReportList?.length).fill(false))
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        admission_check_id_parent: false,
        admission_check_id_2: false,
        admission_check_id_3: false,
        enquiry_id: null,
    });

    useEffect(() => {
        setEnqInnerActive(Array(enqueryReportList?.length).fill(false));
    }, [enqueryReportList]);

    const EnquiryReportListData = (e) => {
        e.preventDefault();
        // post(route('admission.registration_enquery_report.save'), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.city) {
        //         //     reset('city', 'zip');
        //         //     cityInput.current.focus();
        //         // }
        //     },
        // });
    };

    //form validation end

    //handle checkbox start
    const handleCheckboxChange = (name, value) => {
        let newFormData;

        if (name === 'admission_check_id_parent') {
            newFormData = {
                ...data,
                [name]: value,
                admission_check_id_2: value,
                admission_check_id_3: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            if (value === false) {
                newFormData.admission_check_id_parent = false;
            } else if (
                Object.values(newFormData).slice(1).every(Boolean) &&
                !newFormData.admission_check_id_parent
            ) {
                newFormData.admission_check_id_parent = true;
            }
        }

        setData(newFormData);
    };
    //handle checkbox end

    // delete--------
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
                        <form onSubmit={EnquiryReportListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="admission_check_id_parent"
                                                            checked={
                                                                data.admission_check_id_parent
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <th>Enq No.</th>
                                            <th>Visitor Name</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Father Name</th>
                                            <th>Phone</th>
                                            <th>Refer By</th>
                                            <th>Refer Mobile</th>
                                            <th>Enq Date</th>
                                            <th>Counseller</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enqueryReportList?.length > 0 ?
                                            enqueryReportList?.map((item, parentIndex) => (
                                                <>
                                                    <tr key={parentIndex}>
                                                        <td>
                                                            <div className="educare-checkbox-styles">
                                                                <label className="inline-block">
                                                                    <Checkbox
                                                                        name="admission_check_id_2"
                                                                        checked={
                                                                            data.admission_check_id_2
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxChange(
                                                                                e.target
                                                                                    .name,
                                                                                e.target
                                                                                    .checked
                                                                            )
                                                                        }
                                                                    />
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>{item?.id}
                                                            {" "}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() =>
                                                                    handleEnqToggle(parentIndex)
                                                                }
                                                            >
                                                                <i
                                                                    className={`${enqInnerActive[parentIndex]
                                                                        ? "icon-arrow-up"
                                                                        : "icon-down-arrow"
                                                                        }`}
                                                                ></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <span className={`badge ${item?.enquiry_status == 'Rejected' || item?.enquiry_status == 'Cancelled' ? 'danger' : 'success'}`}>
                                                                {item?.enquiry_status}
                                                            </span>{" "}
                                                            {item?.contact_name}
                                                        </td>
                                                        <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                                        <td>{item?.class_title}</td>
                                                        <td>{`${item?.father_first_name ?? ""} ${item?.father_middle_name ?? ""} ${item?.father_last_name ?? ""}`}</td>
                                                        <td>{item?.father_mobile}</td>
                                                        <td>{item?.referred_by}</td>
                                                        <td>{item?.refer_mobile}</td>
                                                        <td>{item?.enquiry_date_at}</td>
                                                        <td>{item?.user_name}</td>
                                                        <td>
                                                            <div className="educare-admission-list-action-btn">
                                                                <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Edit" placement="top" arrow>
                                                                        {item?.enquiry_type == 'Enquiry' ?
                                                                            <Link href={route('admission_enquery_reg.edit', item.id)} className="bg-supportingB/80 inline-block">
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        :
                                                                            <button
                                                                                type='button'
                                                                                disabled={true}
                                                                                className="cursor-not-allowed bg-supportingB/80 inline-block"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        }
                                                                    </Tooltip>
                                                                </div>

                                                                {/* <div className="educare-list-button-field-styles">
                                                                <Tooltip title="View" placement="top" arrow>
                                                                    <Link href="#" className="bg-supportingC/80 inline-block">
                                                                        <i className="icon-eye"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>

                                                            <div className="educare-list-button-field-styles">
                                                                <Tooltip title="Delete" placement="top" arrow>
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div> */}

                                                                <div className="educare-list-button-field-styles">
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <div
                                                                                className="educare-dropdown-menu"
                                                                            >
                                                                                    <PrimaryButton type="button" className="bg-dark/80 inline-block">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </PrimaryButton>
                                                                            </div>
                                                                        </Dropdown.Trigger>

                                                                        <Dropdown.Content>
                                                                            {item?.enquiry_type == 'Enquiry' ?
                                                                                <button type='button' onClick={() => {
                                                                                    handlePushToRegPopupClick(item);
                                                                                    // setData('enquiry_id', item.id);
                                                                                }}>
                                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                                    Push To Registration
                                                                                </button>
                                                                                :
                                                                                <button disabled={true} className="cursor-not-allowed" type='button' onClick={() => {
                                                                                }}>
                                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                                    Push To Registration
                                                                                </button>
                                                                            }
                                                                            {item?.enquiry_type == 'Enquiry' ?
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleModalFollowUpClick();
                                                                                        setSelectedEnquiryReport(item);
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                                    Follow Up
                                                                                </button>
                                                                            :
                                                                                <button
                                                                                    disabled={true}
                                                                                    className="cursor-not-allowed"
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                                    Follow Up
                                                                                </button>
                                                                            }
                                                                            {item?.enquiry_type == 'Enquiry' ?
                                                                                <button type='button' onClick={() => {
                                                                                    handleEnquiryStatusPopupClick()
                                                                                    setSelectedEnquiryReport(item)
                                                                                }}>
                                                                                    <i className="icon-editing text-[20px] text-supportingA"></i>{" "}
                                                                                    Update Enquiry Status
                                                                                </button>
                                                                            :
                                                                                <button
                                                                                    disabled={true}
                                                                                    className="cursor-not-allowed"
                                                                                    type='button'
                                                                                    onClick={() => {
                                                                                    }}
                                                                                >
                                                                                    <i className="icon-editing text-[20px] text-supportingA"></i>{" "}
                                                                                    Update Enquiry Status
                                                                                </button>
                                                                            }
                                                                            {item?.enquiry_type == 'Enquiry' ?
                                                                                <button type='button' onClick={() => handleDelete(item.id)}>
                                                                                    <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Delete Enquiry
                                                                                </button>
                                                                            :
                                                                                <button
                                                                                    disabled={true}
                                                                                    className="cursor-not-allowed"
                                                                                    type='button'
                                                                                    onClick={() => {}}
                                                                                >
                                                                                    <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Delete Enquiry
                                                                                </button>
                                                                            }

                                                                            {/* <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button> */}
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    <tr
                                                        className={`${enqInnerActive[parentIndex]
                                                            ? ""
                                                            : "hidden"
                                                            }`}
                                                    >
                                                        <td
                                                            colSpan="12"
                                                            className="educare-admission-list-enq-inner-wrap"
                                                        >
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>
                                                                            Activity Title
                                                                        </th>
                                                                        <th>
                                                                            Activity Date
                                                                        </th>
                                                                        <th>
                                                                            Follow Up Date
                                                                        </th>
                                                                        <th>Caller Name</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.enquiry_follows?.length > 0 &&
                                                                        item?.enquiry_follows?.map((enquiryFollow, index) => (
                                                                            <tr key={index}>
                                                                                <td>{enquiryFollow?.activity}</td>
                                                                                <td>{enquiryFollow?.activity_date_at}</td>
                                                                                <td>{enquiryFollow?.follow_date_at}</td>
                                                                                <td>
                                                                                    School Admin
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </>
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
            <FollowUpPopupForm
                modalFollowUpOpen={modalFollowUpOpen}
                setModalFollowUpOpen={setModalFollowUpOpen}
                enquiryReportData = {selectedEnquiryReport}
                setEnquiryReportData={setSelectedEnquiryReport}
                formData={formData}
            />
            <UpdateEnquiryStatus
                enquiryStatusPopup={enquiryStatusPopup}
                setEnquiryStatusPopup={setEnquiryStatusPopup}
                enquiryStatusArray={enquiryStatusArray}
                enquiryReportData={selectedEnquiryReport}
                setEnquiryReportData={setSelectedEnquiryReport}
                formData={formData}
            />
            <PushToRegPopup
                pushToRegPopup={pushToRegPopup}
                setPushToRegPopup={setPushToRegPopup}
                enqueryReportList={enqueryReportList}
                entryStudentData={entryStudentData}
                setEntryStudentData={setEntryStudentData}
            />
        </>
    );
};

export default EnquiryReportList;

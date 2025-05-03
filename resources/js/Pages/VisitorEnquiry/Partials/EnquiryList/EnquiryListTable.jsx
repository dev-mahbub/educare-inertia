import React, { useState } from "react";
import studentImg from "../../../../../images/user/user-1.png";
import { Tooltip } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import EnquiryListDetailsPopUp from "./EnquiryListDetailsPopUp";
import EnquiryListActivityPopUp from "./EnquiryListActivityPopUp";
import moment from "moment";
import Swal from "sweetalert2";

const EnquiryListTable = ({visitorsEnquiry, visitorEnquiryDetailType}) => {
    console.log(visitorEnquiryDetailType);
    const [listPopup, setListPopup] = useState(false);
    const [activityPopUp, setaAtivityPopUp] = useState(false);
    const [enquiryDetails, setEnquiryDetails] = useState({});
    const [activeId , setActiveId] = useState(null);
    const handleListPopupClick = ( name, address, enquiry_message) => {
        setEnquiryDetails({
            name: name,
            address: address,
            enquiry_message: enquiry_message,
        });
        setListPopup(!listPopup);
    };
    const handleActivityPopUp = (id) => {
        setActiveId(id);
        setaAtivityPopUp(!activityPopUp);
    };

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState({});
    const handleEnqToggle = (id) => {
        setEnqInnerActive((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };
    //table inner toggle collapse end
    
    const handleDelete = (id) => {
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
                router.delete(route('visitor_enquiry.destroy', id), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    }
                });
            }
        });
    };

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Visitor</th>
                                <th>Name</th>
                                <th>Enquiry Date</th>
                                <th>Appt. Date/Time </th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Enq. Type</th>
                                <th>Msg Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className={`${
                                    enqInnerActive[0] ? "" : "hidden"
                                }`}
                            >
                                <td
                                    colSpan="12"
                                    className="educare-admission-list-enq-inner-wrap"
                                >
                                    <table className="educare-admission-list-enq-inner">
                                        <thead>
                                            <tr>
                                                <th>Activity Title</th>
                                                <th>Activity Date</th>
                                                <th>Follow Up Date</th>
                                                <th>Caller Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    New activity for Job by
                                                    pallavi
                                                </td>
                                                <td>03-01-2024</td>
                                                <td></td>
                                                <td>Hemant</td>
                                            </tr>
                                        </tbody>

                                        {/* use collapseable table here  */}
                                    </table>
                                </td>
                            </tr>

                            {visitorsEnquiry.length > 0 && visitorsEnquiry.map((visitor, index) => (
                                <>
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                        <button
                                            type="button"
                                            className="educare-enq-arrow"
                                            onClick={() => handleEnqToggle(visitor?.id)}
                                        >
                                            <i
                                                className={`${
                                                    enqInnerActive[visitor.id]
                                                        ? "icon-arrow-up"
                                                        : "icon-down-arrow"
                                                }`}
                                            ></i>
                                        </button>
                                    </td> 
                                    <td>
                                        <div className="educare-student-list-table-user-img">
                                            {visitor?.visitor_photo ? (
                                                <img
                                                    src={visitor?.visitor_photo}
                                                    width={60}
                                                    height={60}
                                                    alt="user not found"
                                                />
                                                ) : (
                                                    <img
                                                        src={studentImg}
                                                        width={60}
                                                        height={60}
                                                        alt="user not found"
                                                    />
                                                )    
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={(e) => handleListPopupClick(visitor?.name, visitor?.address, visitor?.enquiry_message)}
                                            type="button"
                                            className="font-semibold text-primary"
                                        >
                                            {visitor?.name}
                                        </button>
                                    </td> 
                                    <td>{moment(visitor?.enquiry_date).format( "DD MMM YYYY")}</td>
                                    <td>{moment(visitor?.appointment_date).format( "DD MMM YYYY h:mm A")}</td>
                                    <td>{visitor?.phone}</td>
                                    <td>{visitor?.email}</td>
                                    <td>{visitor?.enquiry_type?.title}</td>
                                    <td>
                                        <span className={`badge ${visitor?.status === 'Active' ? 'success' : 'danger'}`}>
                                            {visitor?.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <Link
                                                        href={route('visitor_enquiry.edit', visitor.id)}
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-editing"></i>
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title="print"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={(e) => handleActivityPopUp(visitor.id)}
                                                        type="button"
                                                        className="educare-success-btn-sm-fill"
                                                    >
                                                        <i className="icon-plus"></i>
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
                                                        onClick={(e) => { handleDelete(visitor.id) }}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className={`${ enqInnerActive[visitor.id] ? "" : "hidden" }`}> 
                                    <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                        <table className="educare-admission-list-enq-inner">
                                            <thead>
                                                <tr>
                                                    <th>Activity Title</th>
                                                    <th>Activity Date</th>
                                                    <th>Follow Up Date</th>
                                                    <th>Caller Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { visitor?.visitor_enquiry_details.length > 0 && visitor?.visitor_enquiry_details.map((activity, key) => (
                                                    <tr key={key}>
                                                        <td>{activity?.title}</td>
                                                        <td>{moment(activity?.activity_date).format( "DD MMM YYYY")}</td>
                                                        <td>{moment(activity?.follow_date).format( "DD MMM YYYY")}</td>
                                                        <td>{activity?.caller_name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <EnquiryListDetailsPopUp
                listPopup={listPopup}
                setListPopup={setListPopup}
                enquiryDetails={enquiryDetails}
            />
            <EnquiryListActivityPopUp
                activityPopUp={activityPopUp}
                setaAtivityPopUp={setaAtivityPopUp}
                activeId={activeId}
                visitorEnquiryDetailType={visitorEnquiryDetailType}
            />
        </>
    );
};

export default EnquiryListTable;

import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import TicketListPopUp from "./TicketListPopUp";
import { Link, router } from "@inertiajs/react";

const TicketListTable = ({supportTickets}) => {
   
    const [singlePopup, setSinglePopup] = useState(false);
    const [singlePopupData, setSinglePopupData] = useState({});
    const [parent_phone_number, setParentPhoneNumber] = useState('');
    const handleSinglePopupClick = (student_name, parent_phone, request_type, id) => {
        router.post(route("support_ticket.list"), {student_name: student_name, parent_phone: parent_phone, current_request_type: request_type}, {
            preserveScroll: true,
            preserveState: true
        });

        const ticket = supportTickets.find(ticket => ticket.id == id);
        setSinglePopupData(ticket?.messageData);
        setParentPhoneNumber(ticket?.parent_phone);

        setSinglePopup(true);
    };
    

    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Req. Type</th>
                                <th>Req. Date</th>
                                <th>Student Detail</th>
                                <th>Father</th>
                                <th>Phone</th>
                                <th>Description</th>
                                <th>Assign to</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supportTickets?.length > 0 && supportTickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td>{ticket?.request_type}</td>
                                    <td>{ticket?.request_date}</td>
                                    <td>
                                        <div>
                                            <p>
                                                <span className="font-semibold mr-1">
                                                    Name:
                                                </span>
                                                {ticket.student_name ? 
                                                    ticket.student_name : 
                                                    (ticket.student?.first_name || ticket.student?.last_name ? 
                                                        `${ticket.student?.first_name ?? ''} ${ticket.student?.last_name ?? ''}` : 
                                                        ''
                                                    )
                                                }
                                            </p>
                                            <p>
                                                <span className="font-semibold mr-1">
                                                    Class:
                                                </span>
                                                {ticket?.classroom?.title}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                    {ticket.parent_name ? 
                                        ticket.parent_name : 
                                        (ticket.student?.father?.first_name || ticket.student?.father?.middle_name || ticket.student?.father?.last_name ? 
                                            `${ticket.student?.father?.first_name ?? ''} ${ticket.student?.father?.middle_name ?? ''} ${ticket.student?.father?.last_name ?? ''}` : 
                                            ''
                                        )
                                    }
                                    </td>
                                    <td>
                                        {ticket.parent_phone ? 
                                            ticket.parent_phone : 
                                            (ticket.student?.father?.phone ? 
                                                ticket.student?.father?.phone : 
                                                ''
                                            )
                                        }
                                    </td>
                                    <td>{ticket?.details}</td>
                                    <td>
                                        {`${ticket?.assigned_to?.first_name ?? ''}
                                         ${ticket?.assigned_to?.middle_name ?? ''} 
                                          ${ticket?.assigned_to?.last_name ?? ''}`}
                                    </td>
                                    <td>
                                        <span className={`badge ${ticket?.solution_status === 'Pending' ? 'warning' : 'success'}`}>
                                            {ticket?.solution_status}
                                        </span>
                                        {/* {ticket?.request_type == 'Login Request' && (
                                            <span className={`badge ${ticket?.login_status === 'Pending' ? 'warning' : 'success'}`}>
                                                {ticket?.login_status}
                                            </span>
                                        )} */}
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
                                                        href={route('support_ticket.edit', {id: ticket.id})}
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-editing"></i>
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                            {ticket?.request_type == 'Login Request' && (
                                             <div>
                                                <Tooltip
                                                    title="Send Credentials"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={() => handleSinglePopupClick(ticket?.student_name, ticket?.parent_phone, ticket?.request_type, ticket?.id)}
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-PaperPlaneTilt"></i>
                                                    </button>
                                                </Tooltip>
                                            </div> 
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <TicketListPopUp
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
                singlePopupData={singlePopupData}
                parentPhoneNumber={parent_phone_number}
            />
        </>
    );
};

export default TicketListTable;

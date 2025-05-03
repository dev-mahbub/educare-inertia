import HelpDeskHeaderMenus from '@/Components/Partials/Menus/HelpDesk/HelpDeskHeaderMenus';
import React from 'react';
import EditTicketForm from './EditTicketForm';

const EditTicketInnerLayout = ({supportTicket, teachers, status, requestTypeTickets}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HelpDeskHeaderMenus title="Customer Support For Parents (Share Student and Parents Support Page With Parents)" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                         <EditTicketForm supportTicket={supportTicket} teachers={teachers} status={status} requestTypeTickets={requestTypeTickets} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTicketInnerLayout;
import React from "react";
import TicketListTable from "./TicketListTable";
import HelpDeskHeaderMenus from "@/Components/Partials/Menus/HelpDesk/HelpDeskHeaderMenus";
import TicketListFilter from "./TicketListFilter";
const TicketListInnerLayout = ({supportTickets, contactReasons, teachers, status}) => {
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
                        <TicketListFilter supportTickets={supportTickets} teachers={teachers} contactReasons={contactReasons} status={status}/>
                        <TicketListTable supportTickets={supportTickets}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketListInnerLayout;

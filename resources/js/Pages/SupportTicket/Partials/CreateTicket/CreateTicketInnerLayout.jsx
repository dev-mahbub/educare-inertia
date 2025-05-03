import HelpDeskHeaderMenus from '@/Components/Partials/Menus/HelpDesk/HelpDeskHeaderMenus';
import React from 'react';
import CreateTicketForm from './CreateTicketForm';

const CreateTicketInnerLayout = ({contactReasons, classrooms, students, teachers}) => {
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
                         <CreateTicketForm contactReasons={contactReasons} classrooms={classrooms} students={students} teachers={teachers}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTicketInnerLayout;
import React from 'react';
import WebMessageHeaderMenus from '@/Components/Partials/Menus/MainWebMessage/WebMessageHeaderMenus';
import InboxListFilter from '../Inbox/InboxListFilter';
import InboxList from '../Inbox/IndoxList';

const InboxInnerLayout = ({webmessages}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <WebMessageHeaderMenus />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <InboxListFilter webmessages={webmessages} />
                    <InboxList webmessages={webmessages} />
                </div>
            </div>
        </div>
    );
};

export default InboxInnerLayout;
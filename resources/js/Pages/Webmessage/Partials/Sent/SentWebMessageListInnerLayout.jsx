import React from 'react';
import WebMessageHeaderMenus from '@/Components/Partials/Menus/MainWebMessage/WebMessageHeaderMenus';
import SentWebMessageList from '../Sent/SentWebMessageList';

const SentWebMessageListInnerLayout = ({webmessages}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <WebMessageHeaderMenus webmessages={webmessages} />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SentWebMessageList webmessages={webmessages} />
                </div>
            </div>
        </div>
    );
};

export default SentWebMessageListInnerLayout;
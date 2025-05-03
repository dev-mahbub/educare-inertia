import NoMenusHeaderMenus from '@/Components/Partials/Menus/NoMenus/NoMenusHeaderMenus';
import ChatForm from './ChatForm';

const ChatFromInnerLayout = ({
    auth,
    siteData,
    messages,
    receiver_id,
    singleMessage
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NoMenusHeaderMenus title="Live Chat" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ChatForm
                        auth={auth}
                        siteData={siteData}
                        messages={messages}
                        receiver_id={receiver_id}
                        singleMessage={singleMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatFromInnerLayout;

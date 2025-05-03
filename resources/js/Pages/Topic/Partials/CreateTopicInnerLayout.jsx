import React from "react";
import TopicHeaderMenus from "@/Components/Partials/Menus/Topic/TopicHeaderMenus";
import TopicForm from "./TopicForm";

const CreateTopicInnerLayout = ({topics}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <TopicHeaderMenus title="Topics" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TopicForm
                        topics={topics}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateTopicInnerLayout;
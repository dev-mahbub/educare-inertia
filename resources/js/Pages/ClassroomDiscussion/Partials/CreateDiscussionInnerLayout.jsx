import React from 'react';
import ClassroomHeaderMenus from '@/Components/Partials/Menus/Classroom/ClassroomHeaderMenus';
import DiscussionForm from './DiscussionForm';

const CreateDiscussionInnerLayout = ({ 
    class_discussion, 
    subject_titles, 
    subject_grades, 
    topics, 
    choices,
    classrooms,
    subjects,
    onlineTopics
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassroomHeaderMenus title="Discussion" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <DiscussionForm
                        class_discussion={class_discussion}
                        subject_titles={subject_titles}
                        subject_grades={subject_grades}
                        topics={topics}
                        choices={choices}
                        classrooms={classrooms}
                        subjects={subjects}
                        onlineTopics={onlineTopics}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateDiscussionInnerLayout;
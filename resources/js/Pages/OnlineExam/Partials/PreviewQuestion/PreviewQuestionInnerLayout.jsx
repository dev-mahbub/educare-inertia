import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import PreviewQuestionForm from './PreviewQuestionForm';

const PreviewQuestionInnerLayout = ({
    virtualQuestion
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Question Preview" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <PreviewQuestionForm
                        virtualQuestion={virtualQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewQuestionInnerLayout;

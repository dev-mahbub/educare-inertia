
import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import AssignBankQuestionList from './AssignBankQuestionList';



const AssignQuestionBankInnerLayout = ({virtualQuestions, virtualAssignedQusetionsIds}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Manage Question Bank questions" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignBankQuestionList virtualQuestions={virtualQuestions} virtualAssignedQusetionsIds={virtualAssignedQusetionsIds} />
                </div>
            </div>
        </div>
    );
};

export default AssignQuestionBankInnerLayout;
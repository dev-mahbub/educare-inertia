import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import QuestionBankForm from './QuestionBankForm';
import QuestionBankList from './QuestionBankList';


const QuestionBankInnerLayout = ({virtualQuestionBanks}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Manage Question Bank questions" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <QuestionBankForm />
                    <QuestionBankList virtualQuestionBanks={virtualQuestionBanks} />
                </div>
            </div>
        </div>
    );
};

export default QuestionBankInnerLayout;
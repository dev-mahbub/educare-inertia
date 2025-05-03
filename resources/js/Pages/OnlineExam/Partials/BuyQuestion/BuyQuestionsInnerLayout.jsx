import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import BuyQuestionHeaderFilter from './BuyQuestionHeaderFilter';
import BuyQuestionsList from './BuyQuestionsList';


const BuyQuestionsInnerLayout = ({
    classNames,
    subjects,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Buy Questions" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <BuyQuestionHeaderFilter
                        classNames={classNames}
                        subjects={subjects}
                    />
                    <BuyQuestionsList />
                </div>
            </div>
        </div>
    );
};

export default BuyQuestionsInnerLayout;

import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ImportQuestionForm from './ImportQuestionForm';


const ImportQuestionInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    languages
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Import Question" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ImportQuestionForm
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        languages={languages}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImportQuestionInnerLayout;

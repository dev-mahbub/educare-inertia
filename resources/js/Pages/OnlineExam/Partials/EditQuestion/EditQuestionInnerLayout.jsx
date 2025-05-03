import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import EditQuestionForm from './EditQuestionForm';


const EditQuestionInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    shareAudienceTypes,
    virtualQuestion
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Edit Question" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditQuestionForm
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        questionTypes={questionTypes}
                        difficultyLevels={difficultyLevels}
                        languages={languages}
                        virtualAssets={virtualAssets}
                        shareAudienceTypes={shareAudienceTypes}
                        virtualQuestion={virtualQuestion}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditQuestionInnerLayout;

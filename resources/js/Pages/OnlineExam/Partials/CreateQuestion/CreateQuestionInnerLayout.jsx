import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import CreateQuestionForm from './CreateQuestionForm';


const CreateQuestionInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    shareAudienceTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Add Question" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateQuestionForm
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        questionTypes={questionTypes}
                        difficultyLevels={difficultyLevels}
                        languages={languages}
                        virtualAssets={virtualAssets}
                        shareAudienceTypes={shareAudienceTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateQuestionInnerLayout;

import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import QuestionHeaderFilter from './QuestionHeaderFilter';
import QuestionsList from './QuestionsList';

const QuestionListInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    questionTypes,
    difficultyLevels,
    languages,
    virtualAssets,
    virtualQuestions,
    statusTypes,
    publishStatusTypes
}) => {

    const [searchText, setSearchText] = useState("");

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search: "",
        language: "",
        class_name_id: "",
        subject_id: "",
        difficulty_level: "",
        question_type: "",
        publish_status: "",
        status: "",
        online_topic_id: "",
        virtual_asset_id: "",
        status_type: "",
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Questions" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <QuestionHeaderFilter
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        questionTypes={questionTypes}
                        difficultyLevels={difficultyLevels}
                        languages={languages}
                        virtualAssets={virtualAssets}
                        statusTypes={statusTypes}
                        publishStatusTypes={publishStatusTypes}
                        setSearchText={setSearchText}
                        data={data}
                        setData={setData}
                        errors={errors}
                    />
                    <QuestionsList
                        virtualQuestions={virtualQuestions}
                        searchText={searchText}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionListInnerLayout;

import { useState } from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import AssignHeaderFilter from './AssignHeaderFilter';
import AssignQuestionList from './AssignQuestionList';
import AssignSelectedQuestionList from './AssignSelectedQuestionList';


const AssignExamInnerLayout = ({
    virtualExam,
    onlineTopics,
    virtualAssets,
    questionTypes,
    difficultyLevels,
    languages,
    virtualQuestions,
    assignedQuestions
}) => {
    //parent state
    const [hideQuestion, setHideQuestion] = useState(true);
    const [selectedQuestions, setSelectedQuestions] = useState(assignedQuestions?.map(item => ({
        id: item.id,
        question: item.question,
        question_type: item.question_type,
        mark: parseInt(item.mark ?? 0),
        class_subject: item?.class_name?.title + '/' + item?.subject?.title,
        difficulty_level: item.difficulty_level,
        is_assigned: item.is_assigned,
        display_order: 0
    })));
    const [searchText, setSearchText] = useState("");

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Exam / Assign Question" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AssignHeaderFilter
                        hideQuestion={hideQuestion}
                        setHideQuestion={setHideQuestion}
                        onlineTopics={onlineTopics}
                        virtualAssets={virtualAssets}
                        questionTypes={questionTypes}
                        difficultyLevels={difficultyLevels}
                        languages={languages}
                        setSearchText={setSearchText}
                        virtualExam={virtualExam}
                        selectedQuestions={selectedQuestions}
                    />
                    <div className={hideQuestion ? '' : 'hidden'}>
                        <AssignQuestionList
                            selectedQuestions={selectedQuestions}
                            setSelectedQuestions={setSelectedQuestions}
                            virtualQuestions={virtualQuestions}
                            searchText={searchText}
                        />
                    </div>
                    <AssignSelectedQuestionList
                        selectedQuestions={selectedQuestions}
                        setSelectedQuestions={setSelectedQuestions}
                        virtualExam={virtualExam}
                    />
                </div>
            </div>
        </div>
    );
};

export default AssignExamInnerLayout;

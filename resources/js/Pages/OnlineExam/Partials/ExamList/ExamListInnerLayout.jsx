import { useForm } from '@inertiajs/react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import ExamFilter from './ExamFilter';
import ExamList from './ExamList';

const ExamListInnerLayout = ({
    virtualExams,
    virtualExamModes,
    classNames,
    subjects
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        subject_id: "",
        exam_mode: "",
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
                    <ExamFilter
                        virtualExamModes={virtualExamModes}
                        classNames={classNames}
                        subjects={subjects}
                        data={data}
                        setData={setData}
                    />

                    <ExamList
                        virtualExams={virtualExams}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExamListInnerLayout;

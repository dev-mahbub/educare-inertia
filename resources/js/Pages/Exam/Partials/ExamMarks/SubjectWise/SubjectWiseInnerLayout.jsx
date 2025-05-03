// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import SubjectWiseFilter from "./SubjectWiseFilter";
import SubjectWiseList from "./SubjectWiseList";

const SubjectWiseInnerLayout = ({
    classrooms,
    subjects,
    exams,
    classWiseData,
    apsenceReson,
    fullMinMark,
    grade,
    is_co_scholastic,
    isMarkFreezed
}) => {
    const [formFields, setFormFields] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        subject_id: "",
        exam_id: "",
        student_mark_array: formFields,
    });

    const handleSaveMarks = (e) => {
        e.preventDefault();

        if (isMarkFreezed == false) {
            post(route("exam.enter_marks.save"), {
                onSuccess: reset(),
            });
        }
    };

    return (
        <form onSubmit={handleSaveMarks}>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                            <AcademicsExamHeaderMenu title="Academics Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SubjectWiseFilter
                            classrooms={classrooms}
                            subjects={subjects}
                            exams={exams}
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            fullMinMark={fullMinMark}
                            grade={grade}
                            classWiseData={classWiseData}
                        />
                        <SubjectWiseList
                            classWiseData={classWiseData}
                            apsenceReson={apsenceReson}
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            formFields={formFields}
                            setFormFields={setFormFields}
                            fullMinMark={fullMinMark}
                            grade={grade}
                            is_co_scholastic={is_co_scholastic}
                            isMarkFreezed={isMarkFreezed}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SubjectWiseInnerLayout;

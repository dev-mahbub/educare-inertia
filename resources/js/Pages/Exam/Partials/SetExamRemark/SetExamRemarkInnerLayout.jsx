// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import SetExamRemarkFilter from './SetExamRemarkFilter';
import SetExamRemarkList from './SetExamRemarkList';

const SetExamRemarkInnerLayout = ({ exams, classrooms, remarkForStudent }) => {
    const [examId, setExamId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [getFormField, setFormField] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        exam_id: "",
        classroom_id: "",
        class_name_id: "",
        remark_id: "",
        remarks_array_data: getFormField,
    });

    const handlesetFormFields = (e) => {
        e.preventDefault();
        post(route("exam.remarks.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <form onSubmit={handlesetFormFields}>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                            <AcademicsExamHeaderMenu title="Academics Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SetExamRemarkFilter
                            exams={exams}
                            classrooms={classrooms}
                            examId={examId}
                            setExamId={setExamId}
                            setLoading={setLoading}
                            remarkForStudent={remarkForStudent}
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            getFormField={getFormField}
                        />
                        <SetExamRemarkList
                            remarkForStudent={remarkForStudent}
                            examId={examId}
                            setLoading={setLoading}
                            loading={loading}
                            data={data}
                            setData={setData}
                            errors={errors}
                            post={post}
                            reset={reset}
                            processing={processing}
                            getFormField={getFormField}
                            setFormField={setFormField}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SetExamRemarkInnerLayout;

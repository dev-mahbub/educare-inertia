import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import UpdateDetailsList from './UpdateDetailsList';
import UpdateFilter from './UpdateFilter';

const UpdateDetailsInnerLayout = ({
    students,
    genders,
    houses,
    categories,
    classNames,
    classrooms
}) => {
    const [formData, setFormData] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        exam_status: "",
        ews_id: "",
        search_query: "",
        special_child: "",
        year_id: "",
        class_id: "",
        reg_status: "",
        class_name_id: "",
        classroom_id: "",
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>

                <div className="educare-dashboard-main-content-body-wrap">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Update Student Details
                        </h5>
                    </div>
                    <UpdateFilter
                        students={students}
                        classNames={classNames}
                        classrooms={classrooms}
                        formData={formData}
                        setSelectedStudentIds={setSelectedStudentIds}
                        selectedStudentIds={selectedStudentIds}
                        setFormData={setFormData}
                        data={data}
                        setData={setData}
                        reset={reset}
                        errors={errors}
                    />
                    <UpdateDetailsList
                        students={students}
                        genders={genders}
                        houses={houses}
                        categories={categories}
                        selectedStudentIds={selectedStudentIds}
                        setSelectedStudentIds={setSelectedStudentIds}
                        setFormData={setFormData}
                        reset={reset}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateDetailsInnerLayout;

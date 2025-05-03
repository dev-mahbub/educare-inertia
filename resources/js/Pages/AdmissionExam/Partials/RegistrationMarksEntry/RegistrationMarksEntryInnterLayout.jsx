import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import { useForm } from "@inertiajs/react";
import RegistrationMarksEntryFilter from "./RegistrationMarksEntryFilter";
import RegistrationMarksEntryTable from "./RegistrationMarksEntryTable";


const RegistrationMarksEntryInnterLayout = ({
    academicYears,
    classNames,
    enquiries,
    exams,
    academicYearId,
    studentRegistrationMarks
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
        academic_year_id: academicYearId ?? "",
        class_name_id: "",
        enquiry_id: "",
        exam_id: "",
        marks: [],
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <RegistrationMarksEntryFilter
                        academicYears={academicYears}
                        classNames={classNames}
                        enquiries={enquiries}
                        exams={exams}
                        data={data}
                        setData={setData}
                        errors={errors}
                     />
                     <RegistrationMarksEntryTable
                        studentRegistrationMarks={studentRegistrationMarks}
                        data={data}
                        setData={setData}
                        errors={errors}
                     />
                </div>
            </div>
        </div>
    );
};

export default RegistrationMarksEntryInnterLayout;

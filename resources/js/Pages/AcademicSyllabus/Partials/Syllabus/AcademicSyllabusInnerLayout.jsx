import AcademicSyllabus from "./AcademicSyllabus";
// import AcademicsHeaderMenu from "@/Components/Partials/Menus/Academics/AcademicsHeaderMenu";
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';

const AcademicSyllabusInnerLayout = ({
    classNames,
    subjects,
    academicSyllabuses,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        {/* <AcademicsHeaderMenu title="Academics Management" /> */}
                        <AcademicsExamHeaderMenu title="Academics Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AcademicSyllabus
                        classNames={classNames}
                        subjects={subjects}
                        academicSyllabuses={academicSyllabuses}
                    />
                </div>
            </div>
        </div>
    );
};

export default AcademicSyllabusInnerLayout;

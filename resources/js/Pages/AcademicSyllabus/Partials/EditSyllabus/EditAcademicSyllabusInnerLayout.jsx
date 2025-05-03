import EditAcademicSyllabus from './EditAcademicSyllabus';
// import AcademicsHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsHeaderMenu';
import AcademicsExamHeaderMenu from '@/Components/Partials/Menus/Academics/AcademicsExamHeaderMenu';

const EditAcademicSyllabusInnerLayout = ({ classNames, subjects, academicSyllabuses, academicSyllabus}) => {
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
                    <EditAcademicSyllabus classNames={classNames} subjects={subjects} academicSyllabuses={academicSyllabuses} academicSyllabus={academicSyllabus} />
                </div>
            </div>
        </div>
    );
};

export default EditAcademicSyllabusInnerLayout;

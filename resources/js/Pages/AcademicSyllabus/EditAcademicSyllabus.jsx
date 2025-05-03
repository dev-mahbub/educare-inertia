import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditAcademicSyllabusInnerLayout from './Partials/EditSyllabus/EditAcademicSyllabusInnerLayout';


export default function EditAcademicSyllabus({ auth, siteData, academicYears, classNames, subjects, academicSyllabuses, academicSyllabus }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Academic Syllabus</h2>}
        >
            <Head title="Academic Syllabus" />
            
            <EditAcademicSyllabusInnerLayout classNames={classNames} subjects={subjects} academicSyllabuses={academicSyllabuses} academicSyllabus={academicSyllabus}  />
            {/* <SendExamMarksInnerLayout /> */}
            {/* <SubjectWiseInnerLayout /> */}
  
        </DashboardLayout>
    );
}

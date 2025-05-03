import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import RegistrationListInnerLayout from './Partials/Registration/RegistrationListInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Edit({
    auth,
    siteData,
    registrations,
    registrationStatusArray,
    statusArray,
    regModeArray,
    academicYears,
    classNames,
    ewsStatusArray,
    admissionExamStatusArray,
    physicalConditionArray,
    academicYearId
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration List</h2>}
        >
            <Head title="Registration List" />

            <RegistrationListInnerLayout
                registrations = {registrations}
                registrationStatusArray = {registrationStatusArray}
                statusArray={statusArray}
                regModeArray={regModeArray}
                academicYears={academicYears}
                classNames={classNames}
                ewsStatusArray={ewsStatusArray}
                admissionExamStatusArray={admissionExamStatusArray}
                physicalConditionArray={physicalConditionArray}
                academicYearId={academicYearId}
            />
        </DashboardLayout>
    );
}

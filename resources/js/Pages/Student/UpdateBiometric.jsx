import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import BiometricInnerLayout from './Partials/BiometricUpdate/BiometricInnerLayout';

export default function Search({
    auth,
    siteData,
    studentsBio,
    classrooms,
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Biometric Update</h2>}
        >
            <Head title="Biometric Update" />

            <BiometricInnerLayout
                studentsBio={studentsBio}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}

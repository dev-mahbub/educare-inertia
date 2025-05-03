import SiteGuestLayout from '@/Layouts/SiteGuestLayout';
import { Head } from '@inertiajs/react';
import LoginRequestInnerLayout from './LoginRequest/LoginRequestInnerLayout';

export default function LoginRequest({classrooms, currentSchoolInfo}) {
    return (
        <SiteGuestLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Login Request</h2>}
        >
            <Head title="Login Request" />
            
            <LoginRequestInnerLayout classrooms={classrooms} currentSchoolInfo={currentSchoolInfo} />
        </SiteGuestLayout>
    );
}
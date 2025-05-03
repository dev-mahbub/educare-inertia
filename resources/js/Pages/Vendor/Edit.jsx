import DashboardLayout from '@/Layouts/DashboardLayout';
import SchoolForm from './Partials/SchoolForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, siteData, mustVerifyEmail, timezones, countries, states, status }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <SchoolForm 
                            timezones = {timezones} 
                            countries={countries} 
                            states={states} 
                            className="max-w-xl" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

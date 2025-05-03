import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ClassInnerLayout from './Partials/ClassInnerLayout';
import CreateClassNameInnerLayout from './Partials/ClassName/Create/CreateClassNameInnerLayout';

export default function CreateClassName({ auth, siteData, classNames }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class list</h2>}
        >
            <Head title="Class list" />

            <CreateClassNameInnerLayout classNames={classNames} />
        </DashboardLayout>
    );
}

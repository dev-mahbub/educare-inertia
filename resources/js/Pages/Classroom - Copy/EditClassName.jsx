import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditClassNameInnerLayout from './Partials/ClassName/Edit/EditClassNameInnerLayout';

export default function EditClassName({ auth, siteData, classNames, className,  dataSections}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Class list</h2>}
        >
            <Head title="Class list" />

            <EditClassNameInnerLayout
                classNames={classNames}
                className={className}
                dataSections={dataSections}
            />
        </DashboardLayout>
    );
}

import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateCustomFieldContactInnerLayout from './Partials/CreateCustomFieldContactInnerLayout';

export default function Show({
    auth,
    siteData,
    custom_fields,
    field_form_types,
    student_staff_types,
    data_types
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Custom field</h2>}
        >
            <Head title="Custom field" />

            <CreateCustomFieldContactInnerLayout
                custom_fields={custom_fields}
                field_form_types={field_form_types}
                student_staff_types={student_staff_types}
                data_types={data_types}
            />
        </DashboardLayout>
    );
}

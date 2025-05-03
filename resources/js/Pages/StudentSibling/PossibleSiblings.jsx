import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import PossibleSiblingInnerLayout from './Partials/PossibleSibling/PossibleSiblingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function PossibleSiblings({
    auth,
    siteData,
    possibleSibling,
    parentRowData,
    classrooms,
 }) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Possible Siblings</h2>}
        >
            <Head title="Possible Siblings" />

            <PossibleSiblingInnerLayout
                possibleSibling={possibleSibling}
                parentRowData={parentRowData}
                classrooms={classrooms}
            />
        </DashboardLayout>
    );
}

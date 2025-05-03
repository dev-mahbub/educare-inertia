import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import AddExamRemarkInnerLayout from './Partials/Masters/AddExamRemark/AddExamRemarkInnerLayout';

export default function AddExamRemarks({ auth, siteData, remarks}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Exam Remarks</h2>}
        >
            <Head title="Add Exam Remarks" />

            <AddExamRemarkInnerLayout
                remarks = {remarks}
            />
        </DashboardLayout>
    );
}

import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import EditExamRemarkInnerLayout from './Partials/Masters/AddExamRemark/EditExamRemarkInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function AddExamRemarks({ auth, siteData, remarks, remark}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Exam Remarks</h2>}
        >
            <Head title="Edit Exam Remarks" />

            <EditExamRemarkInnerLayout 
                remarks = {remarks}
                remark = {remark}
            />
        </DashboardLayout>
    );
}

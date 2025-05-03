import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ResultCardExamGroupingInnerLayout from './Partials/ResultCardExamGrouping/ResultCardExamGroupingInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ResultCardExamGrouping({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    exams,
    groupingTypes,
    conversionType,
    calculationType,
    calculationPerform,
    reportCardTypes,
    examGroups

}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Result Card Exam Grouping</h2>}
        >
            <Head title="Result Card Exam Grouping" />

            <ResultCardExamGroupingInnerLayout
                exams = {exams}
                groupingTypes = {groupingTypes}
                conversionType = {conversionType}
                calculationType = {calculationType}
                calculationPerform = {calculationPerform}
                reportCardTypes = {reportCardTypes}
                examGroups = {examGroups}
            />
        </DashboardLayout>
    );
}

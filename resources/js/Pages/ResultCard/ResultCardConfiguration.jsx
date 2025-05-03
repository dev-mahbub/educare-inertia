import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import ConfigurationContextApi from './Partials/Configuration/ConfigurationContextApi';
import ConfigurationInnerLayout from './Partials/Configuration/ConfigurationInnerLayout';
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function ResultCardConfiguration({
    auth,
    siteData,
    mustVerifyEmail,
    status,
    schools,
    dummyData,
    classNames,
    exams,
    subjects,
    resultCardConfigurationLists,
    boards,
    resultCardConfigurationClassNameIds,
    ruleTypes
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Result Card Configuration</h2>}
        >
            <Head title="Result Card Configuration" />

            <ConfigurationContextApi>
                <ConfigurationInnerLayout
                    dummyData={dummyData}
                    classNames={classNames}
                    exams={exams}
                    subjects = {subjects}
                    resultCardConfigurationLists = {resultCardConfigurationLists}
                    boards={boards}
                    resultCardConfigurationClassNameIds={resultCardConfigurationClassNameIds}
                    ruleTypes={ruleTypes}
                />
            </ConfigurationContextApi>
        </DashboardLayout>
    );
}

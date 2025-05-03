import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import CreateDiscussionInnerLayout from './Partials/CreateDiscussionInnerLayout';

export default function Create({ 
    auth, 
    siteData, 
    mustVerifyEmail, 
    class_discussion, 
    subject_titles, 
    subject_grades, 
    topics, 
    choices, 
    classrooms,
    subjects,
    onlineTopics
}) {
    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Discussion</h2>}
        >
            <Head title="Create Discussion" />
            
            <CreateDiscussionInnerLayout 
                class_discussion={class_discussion}
                subject_titles={subject_titles}
                subject_grades={subject_grades}
                topics={topics}
                choices={choices}
                classrooms={classrooms}
                subjects={subjects}
                onlineTopics={onlineTopics}
            />
        </DashboardLayout>
    );
}

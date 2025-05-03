import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import OnlineExamAttempteList from "./OnlineExamAttempteList";

export default function OnlineExamAttempte({students, virtualExam, studentId}) {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <OnlineExamAttempteList virtualExam={virtualExam} students={students} studentId={studentId} />
                </div>
            </div>
        </div>
    );
}

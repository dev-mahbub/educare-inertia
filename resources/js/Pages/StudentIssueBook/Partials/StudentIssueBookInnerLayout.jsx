import React from "react";
import StudentIssueBookTable from "./StudentIssueBookTable";
import StudentIssueBookFilter from "./StudentIssueBookFilter";

const StudentIssueBookInnerLayout = ({ebookList, students, assessments, issuedBookLists}) => {
    
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                <StudentIssueBookFilter students={students} assessments={assessments} issuedBookLists={issuedBookLists}/>
                    <StudentIssueBookTable
                        ebookList={ebookList}
                        issuedBookLists={issuedBookLists}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentIssueBookInnerLayout;

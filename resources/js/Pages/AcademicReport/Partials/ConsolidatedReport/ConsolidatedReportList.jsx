import React from "react";
import ConsolidatedReportFilter from "./ConsolidatedReportFilter";

const ConsolidatedReportList = ({ classrooms,examsData,examSubjects }) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <ConsolidatedReportFilter 
                    classrooms = {classrooms}
                    />
                    <div className="educare-input-field-notes mb-2.5">
                        <ul>
                            <li>
                                <span className="text-danger">Note: Co-Scholastic subjects marks not added in Total</span>
                            </li>
                        </ul>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Exam Name</th>
                                        {Object.values(examSubjects)?.map((item, index) => (
                                            <th key={index}>{item}</th>
                                        ))}
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Object.values(examsData).map((item, index) => (
                                    Object.values(item?.exams)?.map((exam, innerIndex) => (
                                        <tr key={innerIndex}>
                                            <td>{innerIndex == 0 && item?.student?.admission_no}</td>
                                            <td>{innerIndex == 0 && item?.student?.roll_no}</td>
                                            <td>{innerIndex == 0 && item?.student?.student_name}</td>
                                            <td>{exam?.exam_title}</td>
                                            {Object.values(examSubjects)?.map((subjectTitle, innerIndex) => (
                                                <td key={innerIndex}>
                                                    {exam?.subjects?.find(item => item?.subject_title == subjectTitle)?.subject_title == subjectTitle && 
                                                        exam?.subjects?.find(item => item?.subject_title == subjectTitle)?.mark
                                                    }
                                                </td>
                                            ))}
                                            <td>{exam?.total_mark}</td>
                                        </tr>
                                    ))
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedReportList;

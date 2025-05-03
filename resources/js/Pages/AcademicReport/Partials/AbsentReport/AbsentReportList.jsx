import React from "react";
import AbsentReportFilter from "./AbsentReportFilter";
import { concatName } from "@/Hooks/GlobalFunction";

const AbsentReportList = ({
    exams,
    classrooms,
    subjects,
    absentStudentData = [],
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Absent Report
                        </h5>
                    </div>
                    <AbsentReportFilter
                        exams={exams}
                        classrooms={classrooms}
                        subjects={subjects}
                        absentStudentDataLength={absentStudentData?.length}
                    />
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Role Number</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Scheduled Test</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {absentStudentData?.length > 0 ? (
                                        absentStudentData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.student?.classroom_roll?.roll_no}</td>
                                                <td>
                                                    {concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}
                                                </td>
                                                <td>{item?.classroom?.title}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>{item?.exam?.title}</td>
                                                <td>{item?.student?.notes}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="12"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AbsentReportList;

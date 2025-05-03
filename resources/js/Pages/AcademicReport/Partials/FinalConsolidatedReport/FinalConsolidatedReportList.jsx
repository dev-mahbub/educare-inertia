import ConsolidatedReportFilter from "./FinalConsolidatedReportFilter";

const FinalConsolidatedReportList = ({
    classrooms,
    examsData,
    examSubjects
 }) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <ConsolidatedReportFilter
                    classrooms = {classrooms}

                    />
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Roll No</th>
                                        <th>Student Name</th>
                                        <th>Exam Name</th>
                                        {Object.values(examSubjects)?.map((item, index) => (
                                            <th key={index}>{item}</th>
                                        ))}
                                        <th>Total</th>
                                        <th>Grade</th>
                                        <th>Percentage</th>
                                        {/* <th>Halfyearly Rank</th> */}
                                        <th>Rank</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Object.values(examsData).map((item, index) => (
                                    <>
                                        <tr>
                                            <td>{item?.student?.admission_no}</td>
                                            <td>{item?.student?.roll_no}</td>
                                            <td>{item?.student?.student_name}</td>
                                            <td></td>
                                            {Object.values(examSubjects)?.map((subjectTitle, innerIndex) => (
                                                <td key={innerIndex}></td>
                                            ))}
                                            <td>{item?.total_mark}</td>
                                            <td>{item?.grade}</td>
                                            <td>{item?.percentage > 0 && item?.percentage + '%'}</td>
                                            <td>{item?.rank}</td>
                                            <td>{item?.total_attendance}</td>
                                        </tr>
                                        {Object.values(item?.exams)?.map((exam, innerIndex) => (
                                            <tr key={innerIndex}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{exam?.exam_title}</td>
                                                {Object.values(examSubjects)?.map((subjectTitle, innerIndex) => (
                                                    <td key={innerIndex}>
                                                        {exam?.subjects?.find(item => item?.subject_title == subjectTitle)?.subject_title == subjectTitle &&
                                                            exam?.subjects?.find(item => item?.subject_title == subjectTitle)?.mark
                                                        }
                                                    </td>
                                                ))}
                                                <td>{exam?.total_mark}</td>
                                                <td>{ exam?.grade}</td>
                                                <td>{exam?.percentage > 0&& exam?.percentage+'%'}</td>
                                                <td>{ exam?.rank}</td>
                                                <td>{ exam?.total_attendance}</td>
                                            </tr>
                                        ))}
                                    </>
                                ))}
                                </tbody>
                                 {/* <tbody>
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
                                            <td>{innerIndex == 0 && item?.grade}</td>
                                            <td>{(innerIndex == 0 && item?.percentage > 0) && item?.percentage+'%'}</td>
                                            <td>Halfyearly Rank</td>
                                            <td>{innerIndex == 0 && item?.rank}</td>
                                            <td>{innerIndex == 0 && item?.total_attendance}</td>
                                        </tr>
                                    ))
                                ))}
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FinalConsolidatedReportList;

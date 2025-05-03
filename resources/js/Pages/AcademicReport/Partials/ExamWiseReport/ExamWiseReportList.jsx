
const ExamWiseReportList = ({ examSubjects, examData }) => {
    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (num != '' && !isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list educare-full-container-scrollable-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm. No.</th>
                                        <th>Roll No.</th>
                                        <th>Student Name</th>
                                        <th>Exam Name</th>
                                        <th>Father Name</th>
                                        {Object.values(examSubjects)?.map(
                                            (item, index) => (
                                                <th key={index}>{item}</th>
                                            )
                                        )}
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(examData)?.length > 0 ? (
                                        Object.values(examData)?.map(
                                            (item, index) =>
                                                Object.values(item?.exams)?.map(
                                                    (exam, innerIndex) => (
                                                        <tr key={innerIndex}>
                                                            <td>
                                                                {innerIndex ==
                                                                    0 &&
                                                                    item
                                                                        ?.student
                                                                        ?.admission_no}
                                                            </td>
                                                            <td>
                                                                {innerIndex ==
                                                                    0 &&
                                                                    item
                                                                        ?.student
                                                                    ?.roll_no}
                                                            </td>
                                                            <td>
                                                                {innerIndex ==
                                                                    0 &&
                                                                    item
                                                                        ?.student
                                                                        ?.student_name}
                                                            </td>
                                                            <td>
                                                                {
                                                                    exam?.exam_title
                                                                }
                                                            </td>
                                                            <td>
                                                                {innerIndex ==
                                                                    0 &&
                                                                    item
                                                                        ?.student
                                                                        ?.father_name}
                                                            </td>
                                                            {Object.values(
                                                                examSubjects
                                                            )?.map(
                                                                (
                                                                    subjectTitle,
                                                                    innerIndex
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            innerIndex
                                                                        }
                                                                    >
                                                                        {exam?.subjects?.find((item) => item?.subject_title == subjectTitle)?.subject_title == subjectTitle && formatNumber(exam?.subjects?.find((item) => item?.subject_title == subjectTitle)?.mark)}
                                                                    </td>
                                                                )
                                                            )}
                                                            <td>
                                                                {
                                                                    formatNumber(exam.total_mark)
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="7"
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

export default ExamWiseReportList;

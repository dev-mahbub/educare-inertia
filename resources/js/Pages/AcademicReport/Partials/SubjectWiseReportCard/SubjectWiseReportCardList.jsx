import { concatName } from "@/Hooks/GlobalFunction";

const SubjectWiseReportCardList = ({
    subjeteWiseData,
    examWiseData
 }) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll No.</th>
                                        <th>Adm. No.</th>
                                        <th>Student Name</th>
                                        {examWiseData?.length > 0 &&
                                            examWiseData?.map((examData, index) => (
                                                <th key={index}>{`${examData?.exam_title} (${examData.full_mark ?? 0})`}</th>
                                            ))
                                        }
                                        <th>Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjeteWiseData?.length > 0 ? (
                                        subjeteWiseData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.student?.roll_no}</td>
                                                <td>{item?.student?.admission_no}</td>
                                                <td>
                                                    {concatName(
                                                        item?.student?.first_name,
                                                        item?.student?.middle_name,
                                                        item?.student?.last_name
                                                    )}
                                                </td>
                                                {examWiseData?.length > 0 &&
                                                    examWiseData?.map((examData, innerIndex) => (
                                                        <td key={innerIndex}>
                                                            {Object.keys(item.exams ?? [])?.length > 0 &&
                                                                Object.values(item.exams ?? [])?.find(exam => exam?.exam_id == examData?.exam_id)?.mark
                                                            }
                                                        </td>
                                                    ))
                                                }
                                                <td>
                                                    {item.total_percentage}%
                                                </td>
                                            </tr>
                                        ))
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

export default SubjectWiseReportCardList;

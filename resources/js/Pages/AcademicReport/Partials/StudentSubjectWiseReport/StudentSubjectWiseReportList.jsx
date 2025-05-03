import StudentSubjectWiseReportGraph from "./StudentSubjectWiseReportGraph";

export default function StudentSubjectWiseReportList({ studentSubjectWiseRepo }) {
    return (
        <>
            <div className="educare-classroom-form-area">
                {studentSubjectWiseRepo?.length > 0 ?
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Exam Name</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentSubjectWiseRepo?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.exam_title}</td>
                                                    <td>{item.total_percentage ?? 0}%</td>
                                                </tr>
                                            ))}
                                            {/* {studentSubjectWiseRepo?.length > 0 ?
                                                studentSubjectWiseRepo?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.total_percentage}%</td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="7">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            } */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                            <StudentSubjectWiseReportGraph
                                studentSubjectWiseRepo = {studentSubjectWiseRepo}
                            />
                        </div>
                    </div>
                :
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="col-span-12">
                            <div
                                className="mt-2 py-2"
                            >
                                <p
                                    className="text-center text-red-500"
                                >
                                    Data not found
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

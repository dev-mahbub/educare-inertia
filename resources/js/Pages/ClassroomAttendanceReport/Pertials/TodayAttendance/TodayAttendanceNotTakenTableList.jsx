import { Tooltip } from "@mui/material";

const TodayAttendanceNotTakenTableList = ({
    classrooms = [],
    params
}) => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Attendance Not Taken
                    </h5>
                </div>
                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                    {/* Replace changable buttons */}
                    <div>
                        <Tooltip
                            title="Download Excel"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <a
                                target="_blank"
                                href={route('export_excel.today_attendance_not_taken_report', params)}
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </a>
                        </Tooltip>
                    </div>
                    {/* Replace changable buttons */}
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classrooms?.length > 0 ? (
                            classrooms?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>Not Taken</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-red-500" colSpan="12">
                                    Data not found
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodayAttendanceNotTakenTableList;

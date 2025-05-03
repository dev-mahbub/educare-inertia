import Loader from "@/Components/Loader";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import BackAttendanceNote from './BackAttendanceNote';

const TodayAttendanceTableList = ({
    getTodayAttendanceClassroom = [],
    loading,
    setLoading,
}) => {

    //modal  for add note
    const [attendanceNoteOpen, setAttendanceNoteOpen] = useState(false);
    const [attendanceNoteData, setAttendanceNoteData] = useState([]);

    const handelAttendanceNote = (e, data) => {
        e.preventDefault();
        setAttendanceNoteData(data);
        setAttendanceNoteOpen(!attendanceNoteOpen);
    };

    useEffect(() => {
        setLoading(false);
    }, [getTodayAttendanceClassroom])

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Status</th>
                                        <th>Taken By</th>
                                        <th>Taken On</th>
                                        <th>Updated By</th>
                                        <th>Updated On</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {getTodayAttendanceClassroom?.length > 0 ? (
                                            getTodayAttendanceClassroom?.map((item, index) => {
                                                let date_at = moment(item?.attendance_date_at).format("DD MMM, YYYY");
                                                let time_at = moment(item?.attendance_date_at).format("h:mm:ss A");
                                                return (
                                                    <tr key={index}>
                                                        <td>{item?.classroom_data?.title}</td>
                                                        <td>{item?.is_attendance_taken === 1 && 'Taken'}</td>
                                                        {/* <td>{item?.taken_user_data?.username}</td> */}
                                                        <td>{`${item?.taken_user_data?.first_name ?? ""} ${item?.taken_user_data?.middle_name ?? ""} ${item?.taken_user_data?.last_name ?? ""}`}</td>
                                                        <td>{moment(item?.created_at).format("DD MMM, YYYY, h:mm:ss A")}</td>
                                                        {/* <td>{item?.is_attendance_allowed_on_back_date ? item?.updated_by?.user?.username : ''}</td> */}
                                                        <td>
                                                            {item?.is_attendance_allowed_on_back_date ? `${item?.updated_by?.user?.first_name ?? ""} ${item?.updated_by?.user?.middle_name ?? ""} ${item?.updated_by?.user?.last_name ?? ""}` : ''}
                                                        </td>
                                                        <td>{item?.is_attendance_allowed_on_back_date ? date_at + ', ' + time_at : ''}</td>
                                                        <td>
                                                            {item?.is_attendance_allowed_on_back_date ?
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="View"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className="educare-tertiary-btn-sm-fill"
                                                                                type="button"
                                                                                onClick={(e) => handelAttendanceNote(e, item?.classroom_attendance_note)}
                                                                            >
                                                                                <i className="icon-eye"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                                : ''}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <BackAttendanceNote
                attendanceNoteOpen={attendanceNoteOpen}
                setAttendanceNoteOpen={setAttendanceNoteOpen}
                attendanceNoteData={attendanceNoteData}
                setAttendanceNoteData={setAttendanceNoteData}
            />
        </>
    );
};

export default TodayAttendanceTableList;

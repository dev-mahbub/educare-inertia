import React, { useEffect } from "react";
import Loader from "@/Components/Loader";

const DateWiseClassAttendanceTableList = ({ attendanceDetails = [], loading, setLoading }) => {

    useEffect(() => {
        setLoading(false);
    }, [attendanceDetails])

    console.log('attendanceDetails', attendanceDetails);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>RollNo.</th>
                                        <th>Class Name</th>
                                        <th>Name</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Percentage(%)</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {attendanceDetails?.length > 0 ? (
                                            attendanceDetails?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.classroom_roll}</td>
                                                    <td>{item?.classroom_name}</td>
                                                    <td>{item?.full_name}</td>
                                                    <td>{item?.presentCount}</td>
                                                    <td>{item?.absentCount}</td>
                                                    <td>{item?.percentagePresent}%</td>
                                                </tr>
                                            )
                                            )
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
        </>
    );
};

export default DateWiseClassAttendanceTableList;

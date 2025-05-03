import React, { useEffect } from "react";
import Loader from "@/Components/Loader";
const StudentWiseAttendanceTable = ({
    attendanceByMonth = [],
    loading = '',
    setLoading = '',
}) => {
    useEffect(() => {
        setLoading(false);
    }, [attendanceByMonth])

    console.log(attendanceByMonth);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Total Working Day</th>
                                        <th>Total Present</th>
                                        <th>Total Absent</th>
                                        <th>Total Attendance</th>
                                        <th>Attendance %</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {Object.keys(attendanceByMonth)?.length > 0 ? (
                                            Object.values(attendanceByMonth).map((item, index) => {
                                                let attendancePercentage = item?.working_days > 0 ? (item?.totalPresent / item?.working_days) * 100 : 0;
                                                return (<tr key={index}>
                                                    <td>{item?.monthName}</td>
                                                    <td>{item?.working_days}</td>
                                                    <td>{item?.totalPresent}</td>
                                                    <td>{item?.totalAbsent}</td>
                                                    <td>{item?.totalPresent}</td>
                                                    <td>{attendancePercentage?.toFixed(2)} %</td>
                                                </tr>);
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
                                {/* <tbody>
                                    <tr>
                                        <td>January</td>
                                        <td>20</td>
                                        <td>18</td>
                                        <td>2</td>
                                        <td>18</td>
                                        <td>30%</td>
                                    </tr>
                                    <tr>
                                        <td>February</td>
                                        <td>22</td>
                                        <td>20</td>
                                        <td>2</td>
                                        <td>20</td>
                                        <td>30%</td>
                                    </tr>
                                    <tr>
                                        <td>March</td>
                                        <td>19</td>
                                        <td>16</td>
                                        <td>3</td>
                                        <td>16</td>
                                        <td>40%</td>
                                    </tr>
                                    <tr>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            Total
                                        </h6></td>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            99
                                        </h6></td>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            80
                                        </h6></td>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            34
                                        </h6></td>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            47
                                        </h6></td>
                                        <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                            98%
                                        </h6></td>
                                    </tr>
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentWiseAttendanceTable;

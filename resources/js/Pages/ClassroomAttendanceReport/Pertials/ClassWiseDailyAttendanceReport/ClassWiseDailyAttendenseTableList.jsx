import Loader from "@/Components/Loader";
import { useEffect } from "react";

const ClassWiseDailyAttendenseTableList = ({
    classWiseAttendance = [],
    totalStudentsSum = '',
    presentCountSum = '',
    absentCountSum = '',
    leaveCountSum = '',
    loading,
    setLoading,
}) => {

    useEffect(() => {
        setLoading(false);
    }, [classWiseAttendance]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Total Student</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Leave</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <>
                                        <tbody>
                                            {
                                                Object?.values(classWiseAttendance).length > 0 ? (
                                                    Object?.values(classWiseAttendance)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.classroom_title}</td>
                                                            <td>{item?.totalStudents}</td>
                                                            <td>{item?.presentCount}</td>
                                                            <td>{item?.absentCount}</td>
                                                            <td>{item?.leaveCount}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="6">
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>Total</td>
                                                <td>{totalStudentsSum}</td>
                                                <td>{presentCountSum}</td>
                                                <td>{absentCountSum}</td>
                                                <td>{leaveCountSum}</td>
                                            </tr>
                                        </tfoot>
                                    </>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassWiseDailyAttendenseTableList;

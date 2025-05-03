import React, { useEffect } from 'react';
import { concatName } from "@/Hooks/GlobalFunction";
import Loader from "@/Components/Loader";

const MonthReportTableList = ({ students, loading, setLoading }) => {

    useEffect(() => {
        setLoading(false);
    }, [students])

    return (
        <div className="educare-default-table xs:overflow-x-auto">
            <table>
                <thead>
                    <tr>
                        <th>RollNo.</th>
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
                        {
                            Object?.values(students).length > 0 ? (
                                Object?.values(students)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.classroom_roll?.roll_no}</td>
                                        <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                        <td>{item?.attendance_status?.present}</td>
                                        <td>{item?.attendance_status?.absent}</td>
                                        <td>{item?.attendance_status?.percentage}%</td>
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
                )}
            </table>
        </div>
    );
};

export default MonthReportTableList;

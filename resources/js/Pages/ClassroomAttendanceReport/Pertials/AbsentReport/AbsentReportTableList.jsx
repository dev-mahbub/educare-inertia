import React, { useEffect } from "react";
import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";

export default function AbsentReportTableList({
    absentStudents = [],
    loading,
    setLoading,
}) {

    useEffect(() => {
        setLoading(false);
    }, [absentStudents]);

    console.log('absentStudents', absentStudents);

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-12 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Admission No.</th>
                                            <th>Roll No</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <Loader></Loader>
                                    ) : (
                                        <tbody>
                                            {absentStudents?.length > 0 ? (
                                                absentStudents?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                        <span className={`badge ${item?.boarding_type === 'Scholar' ? 'primary' : 'info'}`}>{item?.boarding_type}</span>
                                                        {' '}
                                                        {concatName(item?.first_name, item?.middle_name, item?.last_name)}
                                                        </td>
                                                        <td>{item?.classroom_data?.title}</td>
                                                        <td>{item?.admission_no}</td>
                                                        <td>{item?.classroom_roll?.roll_no}</td>
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
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

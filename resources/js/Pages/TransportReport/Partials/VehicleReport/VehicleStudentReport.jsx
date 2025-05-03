import React, { useEffect } from 'react';
import Loader from "@/Components/Loader";
const VehicleStudentReport = ({
    studentData = [],
    loading,
    setLoading,
}) => {

    useEffect(() => {
        setLoading(false);
    }, [studentData]);

    return (
        <div className="educare-admission-list-area mb-10">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Adm No.</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Parent Name</th>
                                    <th>Parent Phone</th>
                                    <th>Stoppage</th>
                                    <th>Pickup Time</th>
                                    <th>Drop Time</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {studentData?.length > 0 ?
                                        studentData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.admission_no}</td>
                                                <td>{item?.student_name}</td>
                                                <td>{item?.classroom_title}</td>
                                                <td>{item?.father_name}</td>
                                                <td>{item?.father_phone}</td>
                                                <td>{item?.stop_page_title}</td>
                                                <td>{item?.pickup_time}</td>
                                                <td>{item?.pickup_time}</td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleStudentReport;

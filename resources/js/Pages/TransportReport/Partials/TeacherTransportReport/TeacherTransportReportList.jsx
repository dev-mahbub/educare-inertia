import React, { useEffect } from 'react';
import Loader from "@/Components/Loader";

const TeacherTransportReportList = ({
    teacherData,
    loading,
    setLoading,
}) => {
    useEffect(() => {
        setLoading(false);
    }, [teacherData])
    return (
        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Route Name</th>
                                    <th>Stoppage</th>
                                    <th>Vehicle No</th>
                                    <th>Fee</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {teacherData?.length > 0 ? (
                                        teacherData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item?.teacher_name}</td>
                                                <td>{item?.teacher_phone}</td>
                                                <td>{item?.route_name}</td>
                                                <td>{item?.stop_page_title}</td>
                                                <td>{item?.vehicle_number}</td>
                                                <td>{item?.transport_fee}</td>
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
    );
};

export default TeacherTransportReportList;

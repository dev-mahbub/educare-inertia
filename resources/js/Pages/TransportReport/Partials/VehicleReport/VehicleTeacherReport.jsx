import React, { useEffect } from 'react';
import Loader from "@/Components/Loader";

const VehicleTeacherReport = ({
    teacherData = [],
    loading,
    setLoading,
}) => {


    useEffect(() => {
        setLoading(false);
    }, [teacherData]);

    return (
        <div className="educare-classroom-table-wrapper mt-3">
            <div className="educare-card-title">
                <h5 className='flex align-items-center'>
                    <i className="icon-ListBullets"></i>
                    Vehicle Wise Report ( Teacher )
                    <div className="educare-header-filtar-bar-count mr-auto">
                        <span>Total: {teacherData?.length}</span>
                    </div>
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Stoppage</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <Loader></Loader>
                    ) : (
                        <tbody>
                            {teacherData?.length > 0 ?
                                teacherData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{item?.teacher_name}</td>
                                        <td>{item?.teacher_phone}</td>
                                        <td>{item?.stop_page_title}</td>
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
    );
};

export default VehicleTeacherReport;

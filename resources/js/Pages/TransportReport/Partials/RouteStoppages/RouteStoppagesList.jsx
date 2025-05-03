import React from 'react';
import RouteStoppagesDetailsPopup from './Popup/RouteStoppagesDetailsPopup';
import { useState } from 'react';

const RouteStoppagesList = ({ routeStoppages = [] }) => {

    const [stoppageDetailsPopup, setStoppageDetailsPopup] = useState(false);
    const [studentTeacherData, setStudentTeacherData] = useState([]);

    const handleStoppageDetailsClick = (studentData, teacherData) => {
        setStudentTeacherData({ studentData, teacherData })
        setStoppageDetailsPopup(!stoppageDetailsPopup);
    };


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order no.</th>
                                        <th>Stoppage Name</th>
                                        <th>Area Name</th>
                                        <th>Distance</th>
                                        <th>Pickup Time</th>
                                        <th>Drop Time</th>
                                        <th>Total Students</th>
                                        <th>Total Teachers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routeStoppages?.length > 0 ? (
                                        routeStoppages?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.order}</td>
                                                <td>
                                                    <button className="font-semibold text-primary" type="button" onClick={(e) => handleStoppageDetailsClick(item?.students, item?.teachers)}>{item?.stoppage}</button>
                                                </td>
                                                <td>{item?.area_name}</td>
                                                <td>{item?.distance}</td>
                                                <td>{item?.pickup_time}</td>
                                                <td>{item?.drop_time}</td>
                                                <td>{item?.students?.length}</td>
                                                <td>{item?.teachers?.length}</td>
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
                </div>
            </div>
            <RouteStoppagesDetailsPopup
                stoppageDetailsPopup={stoppageDetailsPopup}
                setStoppageDetailsPopup={setStoppageDetailsPopup}
                studentTeacherData={studentTeacherData}
            />
        </>
    );
};

export default RouteStoppagesList;

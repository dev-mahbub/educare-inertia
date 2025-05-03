import React, { useEffect } from "react";
import Loader from "@/Components/Loader";
import moment from "moment";

const DriverLogBookReportTable = ({
    driverLogBooks,
    loading,
    setLoading,
}) => {

    useEffect(() => {
        setLoading(false);
    }, [driverLogBooks])

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Vehicle No.</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Starting Km.</th>
                                        <th>Last Km.</th>
                                        <th>Total Km.</th>
                                        <th>Fuel ltr.</th>
                                        <th>Fuel Rate</th>
                                        <th>Mileage</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {driverLogBooks?.length > 0 ? (
                                            driverLogBooks?.map((item2, index) => (
                                                <tr key={index}>
                                                    <td>{moment(item2?.date_at).format("MMM DD, YYYY")}</td>
                                                    <td>{item2?.vehicle?.vehicle_number}</td>
                                                    <td>{moment(item2?.in_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>{moment(item2?.out_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>{item2?.from_stoppage?.stoppage}</td>
                                                    <td>{item2?.to_stoppage?.stoppage}</td>
                                                    <td>{item2?.starting_km}</td>
                                                    <td>{item2?.last_km}</td>
                                                    <td>{item2?.total_km}</td>
                                                    <td>{item2?.fuel_ltr}</td>
                                                    <td>{item2?.fuel_rate}</td>
                                                    <td>{item2?.mileage}</td>
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
        </>
    );
};

export default DriverLogBookReportTable;

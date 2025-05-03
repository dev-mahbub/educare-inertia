import React from 'react';
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Dropdown from "@/Components/Dropdown";

const TrackYourVehicleTable = ({
    vehicleDetails = [],
}) => {
    return (
        <div className="educare-classroom-form-area">
            <div className="grid grid-cols-12 gap-[20px]">
                <div className="col-span-12">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-bus"></i>
                                Track your vehicle
                            </h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table className='pb-[300px]'>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Bus No</th>
                                        <th>Driver Name</th>
                                        <th>DeviceId</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicleDetails?.length > 0 ?
                                        vehicleDetails?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item?.vehicle_number}</td>
                                                <td>{item?.driver_name}</td>
                                                <td>{item?.device_id}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href="#"
                                                                    className="educare-secondary-btn-md-fill"
                                                                >
                                                                    <i className="icon-search-interface-symbol"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackYourVehicleTable;

import React from 'react';

const DeallocationDetails = ({
    currentAllocationData = [],
    prevAllocationData = [],
}) => {
    return (
        <div>
            {currentAllocationData?.is_current_data ? (
                <>
                    <div className='mb-5'>
                        {currentAllocationData?.room_type &&
                            <div className="educare-card-title pb-none mb-2.5">
                                <h5>
                                    <i className="icon-HouseLine"></i>
                                    Hostel Details
                                </h5>
                            </div>
                        }
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <tbody>
                                    <tr>
                                        {currentAllocationData?.room_type &&
                                            <td>
                                                <span className="text-[15px] font-semibold text-heading font-primary mr-2">
                                                    Room Type:
                                                </span>
                                                {currentAllocationData?.room_type}
                                                <span className='badge success ml-2'>Current</span>
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        {currentAllocationData?.location_path &&
                                            <td>
                                                <span className="text-[15px] font-semibold text-heading font-primary mr-2">
                                                    Location:
                                                </span>
                                                {currentAllocationData?.location_path}
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : ''
            }
            {
                prevAllocationData?.length ? (
                    <>
                        <div className="educare-card-title pb-none mb-2.5">
                            <h5>
                                <i className="icon-HouseLine"></i>
                                Previous Hostel History
                            </h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Room Type</th>
                                        <th>Applied On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prevAllocationData?.map((item, index) => (
                                        <tr key={index}>
                                            <td><span className="badge success">{item?.location_path}</span></td>
                                            <td>{item?.room_type}</td>
                                            <td>{item?.joining_date_at}</td>
                                        </tr>
                                    ))}
                                </tbody>

                                {/* <tbody>
                        <tr>
                            <td>
                                <span className="text-[15px] font-semibold text-heading font-primary mr-2">
                                    Room Type:
                                </span>
                                Single
                                <span className='badge success ml-2'>Current</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="text-[15px] font-semibold text-heading font-primary mr-2">
                                    Hostel Location:
                                </span>
                                School room 1st. B1
                            </td>
                        </tr>
                    </tbody> */}
                            </table>
                        </div>
                    </>
                ) : ''
            }
        </div >
    );
};

export default DeallocationDetails;

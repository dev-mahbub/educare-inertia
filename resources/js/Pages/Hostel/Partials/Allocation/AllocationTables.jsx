import React, { useState } from 'react';
import AllocationInfraLevels from './AllocationInfraLevels';
import AllocationTable from './AllocationTable';

const AllocationTables = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    studentBedDetails,
    data,
    setData,
    errors,
    post,
    reset,
    processing,
}) => {
    const [selectedItem, setSelectedItem] = useState([])
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xxl:col-span-4 ">

                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    Infra Levels
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <AllocationInfraLevels
                                    selectedItem={selectedItem}
                                    setSelectedItem={setSelectedItem}
                                    infraLevels={infraLevels}
                                    childLevels={childLevels}
                                    infraLavelIds={infraLavelIds}
                                    infraLavelIdString={infraLavelIdString}
                                    currentLavelId={currentLavelId}
                                    is_open={is_open}
                                    type={type}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xxl:col-span-8">
                    <AllocationTable
                        currentLavelId={currentLavelId}
                        studentBedDetails={studentBedDetails}
                        data={data}
                        setData={setData}
                        errors={errors}
                        post={post}
                        reset={reset}
                        processing={processing}
                    />
                </div>
            </div>
        </>
    );
};

export default AllocationTables;

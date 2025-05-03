import React, { useState } from 'react';
import SetupHostelTable from './SetupHostelTable';
import SetupHostelInfraLavels from './SetupHostelInfraLavels';

const SetupHostelTables = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    hostelStaffArr,
    teacherData,
    hostelStaffDetails,
    roomTypeData,
}) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    Infra Levels
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <SetupHostelInfraLavels
                                    infraLevels={infraLevels}
                                    childLevels={childLevels}
                                    infraLavelIds={infraLavelIds}
                                    infraLavelIdString={infraLavelIdString}
                                    currentLavelId={currentLavelId}
                                    is_open={is_open}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                    <SetupHostelTable
                        infraLevels={infraLevels}
                        childLevels={childLevels}
                        infraLavelIds={infraLavelIds}
                        infraLavelIdString={infraLavelIdString}
                        currentLavelId={currentLavelId}
                        is_open={is_open}
                        type={type}
                        hostelStaffArr={hostelStaffArr}
                        teacherData={teacherData}
                        hostelStaffDetails={hostelStaffDetails}
                        roomTypeData={roomTypeData}
                    />
                </div>
            </div>
        </>
    );
};

export default SetupHostelTables;

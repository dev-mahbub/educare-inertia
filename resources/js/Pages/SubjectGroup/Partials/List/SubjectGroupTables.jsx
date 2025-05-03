import React, { useState } from "react";
import GroupListTable from "./GroupListTable";
import GroupListTree from "./GroupListTree";
import SubjectList from "./SubjectList";

const SubjectGroupTables = ({
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
}) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-3 lg:col-span-3">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>Group List</h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <GroupListTree
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
                <div className="col-span-12 xl:col-span-3 lg:col-span-3">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>Subjects</h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <SubjectList
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
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <GroupListTable
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
        </>
    );
};

export default SubjectGroupTables;

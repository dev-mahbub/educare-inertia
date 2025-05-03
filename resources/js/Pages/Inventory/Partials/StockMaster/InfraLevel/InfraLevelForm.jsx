import Reac, { useState } from "react";
import InfraLevelDetails from "./InfraLevelDetails";
import InfraLevelList from "./InfraLevelList";

export default function InfraLevelForm({infraLevels, childLevels, infraLavelIds, infraLavelIdString, currentLavelId, is_open}) {

    return (
        <>
            <div className="educare-card-title mr-auto ">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Infra level creation
                </h5>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-4">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    Infra Levels
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <InfraLevelList
                                    infraLevels={infraLevels}
                                    childLevels={childLevels}
                                    infraLavelIds={infraLavelIds}
                                    infraLavelIdString={infraLavelIdString}
                                    currentLavelId={currentLavelId}
                                    is_open={is_open} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <InfraLevelDetails
                        infraLevels={infraLevels}
                        childLevels={childLevels}
                        infraLavelIds={infraLavelIds}
                        infraLavelIdString={infraLavelIdString}
                        currentLavelId={currentLavelId}
                        is_open={is_open}
                    />
                </div>
            </div>
        </>
    );
}

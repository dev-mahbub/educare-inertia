import React, { useState, useEffect } from "react";
import SelectInput2 from "@/Components/SelectInput2";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ModuleFilter({schools, schoolId, className = ""}) {
    const [data, setData] = useState({'school_id': schoolId});
    useEffect(() => {
        setData({'school_id': schoolId})
    }, [schoolId])

    const moduleFilterData = (e) => {
        e.preventDefault();
        router.get("/modules?school="+ data?.school_id);
    };

    return (
        <div className="educare-permission-filtar-bar-area z-[4] relative">
            <div className=" educare-permission-filtar-bar">
                <div className="educare-permission-filtar-bar-filter">
                    <form onSubmit={moduleFilterData}>
                        <div className="flex justify-between gap-4 maxMd:gap-2.5 maxSm:flex-wrap">
                            <div>
                                <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>Assign modules to school</h5></div>
                            </div>
                            <div className="educare-permission-filtar-bar-filter-fields-wrap flex items-end gap-2.5 maxMd:gap-2.5 maxXs:flex-wrap">
                                <div className="educare-permission-filtar-bar-filter-fields">
                                    <div className={`educare-select-field-styles ${data?.school_id}`}>
                                        <SelectInput2
                                            id="school_id"
                                            data_label="School"
                                            data={schools}
                                            selectedData={schoolId}
                                            onChange={(e) =>
                                                setData({...data, school_id:e.target.value})
                                            }
                                            type="text"
                                            className="block w-[200px]"
                                        />
                            
                                    </div>
                                </div>
                                <div className="educare-permission-filtar-bar-filter-btn">
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                    >
                                        Check Permissions
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

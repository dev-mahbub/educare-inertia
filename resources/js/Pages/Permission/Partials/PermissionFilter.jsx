import React, { useRef, useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput2 from "@/Components/SelectInput2";
import { useForm, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function PermissionFilter({roles, users, checkData, className = ""}) {

    const [data, setData] = useState(checkData);

    useEffect(() => {
        setData(checkData)
    }, [checkData])

    const permissionFilterData = (e) => {
        e.preventDefault();
        router.post(route('permission.list'), {'role': data.check_role, 'user': data.check_user});
    };

    // Handle user Changes
    const handleUserChange = (val) => {
        setData((prevData) => ({
            ...prevData,
            check_user: val
        }));
        router.post(route('permission.list'), {'role': '', 'user': val});
    };


    return (
        <div className="educare-permission-filtar-bar-area z-[4] relative">
            <div className=" educare-permission-filtar-bar">
                <div className="educare-permission-filtar-bar-filter">
                    <form onSubmit={permissionFilterData}>
                        <div className="flex justify-between items-center maxLg:flex-wrap gap-2.5 maxMd:gap-2.5 maxSm:flex-wrap">
                            <div>
                                <div className="educare-card-title leading-none"><h5><i className="icon-ListBullets"></i>Assign modules to user</h5></div>
                            </div>
                            <div className="educare-permission-filtar-bar-filter-fields-wrap flex items-end gap-2.5 maxMd:gap-2.5 maxXs:flex-wrap">
                                <div className="educare-permission-filtar-bar-filter-fields flex gap-2.5">
                                    <div className={`educare-select-field-styles ${data.check_user}`}>
                                        <SelectInput2
                                            id="check_user"
                                            data_label="User"
                                            data={users}
                                            selectedData={data.check_user}
                                            onChange={(e) => handleUserChange(e.target.value)}
                                            type="text"
                                            className="block w-[200px]"
                                        />
                            
                                    </div>

                                    <div className={`educare-select-field-styles ${data.check_role}`}>
                                        <SelectInput2
                                            id="check_role"
                                            data_label="Role"
                                            data={roles}
                                            selectedData={data.check_role}
                                            onChange={(e) =>
                                                setData({...data, check_role:e.target.value})
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

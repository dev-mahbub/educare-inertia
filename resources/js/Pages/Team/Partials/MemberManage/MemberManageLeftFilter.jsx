import React from "react";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";


const MemberManageLeftFilter = ({ data, setData, errors }) => {

    return (
        <>
            <div className="flex flex-wrap justify-between gap-2 mb-2.5">
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Total: 10</span>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                    <div className="educare-select-field-styles">
                        <SelectInput
                            data_label="Team participants to adding member"
                            data={[]}
                            value={data.select_team_participants}
                            onChange={(e) =>
                                setData("select_team_participants", e.target.value)
                            }
                            type="text"
                            className="block"
                        />
                        <InputError
                            message={errors.select_team_participants}
                            className="mt-2"
                        />
                    </div>
                    {
                        data.select_team_participants === "studentOnly" ? (
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    data_label="Class"
                                    data={[]}
                                    value={data.select_class}
                                    onChange={(e) =>
                                        setData("select_class", e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={errors.select_class}
                                    className="mt-2"
                                />
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        </>
    );
};

export default MemberManageLeftFilter;


import React, { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function PermissionFilter({className = ""}) {

    const assignModulesToUser = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        assign_modules_to_user: "",
    });

    const permissionFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.assign_modules_to_user) {
                    reset("assign_modules_to_user");
                    assignModulesToUser.current.focus();
                }
            },
        });
    };


    return (
        <div className="educare-permission-filtar-bar-area z-[4] relative">
            <div className=" educare-permission-filtar-bar">
                <div className="educare-permission-filtar-bar-filter">
                    <form onSubmit={permissionFilterData}>
                        <div className="flex justify-between gap-4">
                            <div>
                                <div className="educare-school-shift-title"><h5><i className="icon-ListBullets"></i>Assign modules to user</h5></div>
                            </div>
                            <div className="educare-permission-filtar-bar-filter-fields-wrap flex items-end gap-4">
                                <div className="educare-permission-filtar-bar-filter-fields">
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="assign_modules_to_user"
                                            data_label="School"
                                            data={[]}
                                            ref={assignModulesToUser}
                                            value={data.assign_modules_to_user}
                                            onChange={(e) =>
                                                setData(
                                                    "assign_modules_to_user",
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            className="block w-[200px]"
                                        />
                                        <InputError
                                            message={errors.assign_modules_to_user}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="educare-permission-filtar-bar-filter-btn">
                                        <PrimaryButton className="inline-flex h-10 items-center px-4 py-2 bg-primary font-primary font-semibold border border-transparent rounded-md text-[14px] text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150" disabled={processing}>
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

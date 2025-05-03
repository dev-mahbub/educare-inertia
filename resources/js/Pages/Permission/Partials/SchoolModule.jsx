import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function SchoolModule({className = ""}) {
    const [cardActive, setCardActive] = useState(false);
    const [cardActive1, setCardActive1] = useState(false);
    const [cardActive2, setCardActive2] = useState(false);
    const handleToggle = () => {
        setCardActive(!cardActive);
    };
    const handleToggle1 = () => {
        setCardActive1(!cardActive1);
    };
    const handleToggle2 = () => {
        setCardActive2(!cardActive2);
    };

    const titleInput = useRef();
    const cityInput = useRef();;

    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful,
    } = useForm({
        //input start
        shift_time: "",
        start_time: "",
        end_time: "",
        //input end
    });

    const schoolData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.city) {
                    reset("city", "zip");
                    cityInput.current.focus();
                }

                if (errors.shift_time) {
                    reset("shift_time");
                    titleInput.current.focus();
                }
            },
        });
    };

    return (
        <div className="educare-master-create-shift-area">
            <form onSubmit={schoolData}>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-5 col-span-12">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New
                                    </h5>
                                </div>
                                <div className="educare-create-school-form-wrapper-border bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <div className="educare-school-shift-input-field">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="shift_time"
                                                value="Shift Time *"
                                            />
                                            <SelectInput
                                                id="shift_time"
                                                data_label="shift time"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "shift_time",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="mt-1 block w-full"
                                            />

                                            <InputError
                                                message={errors.shift_time}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-school-shift-input-field">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="start_time"
                                                value="Shift Time*"
                                            />
                                            <SelectInput
                                                id="start_time"
                                                data_label="start time"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "start_time",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="mt-1 block w-full"
                                            />

                                            <InputError
                                                message={errors.start_time}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-school-shift-input-field">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="end_time"
                                                value="End Time*"
                                            />
                                            <SelectInput
                                                id="end_time"
                                                data_label="end time"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.country}
                                                onChange={(e) =>
                                                    setData(
                                                        "end_time",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="mt-1 block w-full"
                                            />

                                            <InputError
                                                message={errors.periods_shift_time}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-master-create-shift-button-wrapper">
                                        <div className="educare-master-create-shift-button flex justify-end gap-[15px]">
                                            <PrimaryButton
                                                className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Save</p>
                                            </Transition>
                                            <PrimaryButton
                                                className="h-[35px] px-[10px] border-[1px] border-border text-[14px] rounded-md font-medium font-primary inline-block"
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-7 col-span-12">
                        <div className="beducare-master-create-shift-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    School Shift
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Shift Name</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Morning
                                            </td>
                                            <td>
                                                9.00 AM
                                            </td>
                                            <td>
                                                6.00 PM
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Evening
                                            </td>
                                            <td>
                                                2.00 AM
                                            </td>
                                            <td>
                                                5.30 AM
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Morning Shift
                                            </td>
                                            <td>
                                                9.00 AM
                                            </td>
                                            <td>
                                                2.00 PM
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Night Shift
                                            </td>
                                            <td>
                                                9.00 AM
                                            </td>
                                            <td>
                                                2.00 PM
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Morning Shift
                                            </td>
                                            <td>
                                                9.00 AM
                                            </td>
                                            <td>
                                                2.00 PM
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

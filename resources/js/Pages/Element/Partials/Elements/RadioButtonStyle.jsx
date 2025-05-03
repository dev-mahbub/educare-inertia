import RadioInput from '@/Components/RadioInput';
import ToggleCheckboxInput from '@/Components/ToggleCheckboxInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const RadioButtonStyle = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_toggle_radio_1: "",
        dummy_toggle_radio_2: "",
        leaveStatus: "",
        staffType: "non_teaching",
    });

    const dummyData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };
   

    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Radio Style</h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-3">
                        <div className="educare-toggle-checkbox-button-styles">
                            <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Toggle Radio</h6>
                            <ToggleCheckboxInput
                                id="dummy_toggle_radio_1"
                                name="dummy_toggle_radio_1"
                                checked={
                                    data.dummy_toggle_radio_1
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_toggle_radio_1",
                                        e.target
                                            .checked
                                    )
                                }
                            />
                            <label htmlFor="dummy_toggle_radio_1">
                                <span className="on">Yes</span>
                                <span className="off">No</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="educare-toggle-checkbox-button-styles educare-toggle-checkbox-button-styles-two">
                            <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Toggle Radio</h6>
                            <ToggleCheckboxInput
                                id="dummy_toggle_radio_2"
                                name="dummy_toggle_radio_2"
                                checked={
                                    data.dummy_toggle_radio_2
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_toggle_radio_2",
                                        e.target
                                            .checked
                                    )
                                }
                            />
                            <label htmlFor="dummy_toggle_radio_2">
                                <span className="on">Absent</span>
                                <span className="off">Present</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="educare-toggle-checkbox-button-styles-three">
                            <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Toggle Radio</h6>
                            <div className="min-width-full">
                                <div className="educare-radio-field-styles flex gap-3">
                                    <RadioInput
                                        name="leaveStatus"
                                        value="Present"
                                        checked={data.leaveStatus === "present"}
                                        onChange={() => setData("leaveStatus", "present")}
                                        customClass={`input-hidden ${data.leaveStatus === "present" ? "educare-success-btn-md-fill" : "educare-success-btn-md-stroke"}`}
                                    />
                                    <RadioInput
                                        name="leaveStatus"
                                        value="Absent"
                                        checked={data.leaveStatus === "absent"}
                                        onChange={() => setData("leaveStatus", "absent")}
                                        customClass={`input-hidden ${data.leaveStatus === "absent" ? "educare-danger-btn-md-fill" : "educare-danger-btn-md-stroke"}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <h6 className='text-[15px] text-headingLight font-primary mb-2 font-medium'>Circle Radio</h6>
                        <div className="educare-create-school-settings-list-check min-width-full">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="staffType"
                                    value="Teaching"
                                    checked={data.staffType === "teaching"}
                                    onChange={() => setData("staffType", "teaching")}
                                />
                                <RadioInput
                                    name="staffType"
                                    value="Non Teaching"
                                    checked={data.staffType === "non_teaching"}
                                    onChange={() => setData("staffType", "non_teaching")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RadioButtonStyle;

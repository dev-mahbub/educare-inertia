import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React from 'react';

const CheckboxElements = () => {
    const {
        data, 
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_checkbox_1: "",
        dummy_checkbox_2: "",
        dummy_checkbox_3: "",
        select_all_days_id: "",
        monday_id: false,
        tuesday_id: false,
        wednesday_id: false,
        thursday_id: false,
        friday_id: false,
        saturday_id: false,
        sunday_id: false,
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_days_id") {
            newFormData = {
                ...data,
                [name]: value,
                monday_id: value,
                tuesday_id: value,
                wednesday_id: value,
                thursday_id: value,
                friday_id: value,
                saturday_id: value,
                sunday_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_days_id = false;
            }
            // after all child checked, then parent will check
              else if ( newFormData.monday_id === true && 
                        newFormData.tuesday_id === true &&
                        newFormData.wednesday_id === true &&
                        newFormData.thursday_id === true &&
                        newFormData.friday_id === true &&
                        newFormData.saturday_id === true &&
                        newFormData.sunday_id === true 
                ) {
                newFormData.select_all_days_id = true;
              }
        }

        setData(newFormData);
    };
    //handle Checkbox end

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
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Checkbox Style</h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className="educare-checkbox-field-styles">
                            <InputLabel
                                htmlFor="dummy_checkbox_1"
                                value="Assigned to class"
                            />
                            <Checkbox
                                name="dummy_checkbox_1"
                                checked={
                                    data.dummy_checkbox_1
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_checkbox_1",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                            <div className="educare-create-school-settings-list-check width-full">
                                <Checkbox
                                    id="dummy_checkbox_2"
                                    name="dummy_checkbox_2"
                                    checked={
                                        data.dummy_checkbox_2
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_checkbox_2",
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>
                            <div className="educare-create-school-settings-list-title width-full">
                                <InputLabel
                                    htmlFor="dummy_checkbox_2"
                                    value="Right Side Level"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                            <div className="educare-create-school-settings-list-title width-full">
                                <InputLabel
                                    htmlFor="dummy_checkbox_3"
                                    value="Left Side Level"
                                />
                            </div>
                            <div className="educare-create-school-settings-list-check width-full">
                                <Checkbox
                                    id="dummy_checkbox_3"
                                    name="dummy_checkbox_3"
                                    checked={
                                        data.dummy_checkbox_3
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_checkbox_3",
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>All Select Checkbox</h5>
                        <div className="flex flex-wrap gap-5">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="select_all_days_id"
                                        name="select_all_days_id"
                                        checked={
                                            data.select_all_days_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="select_all_days_id"
                                        value="Select All"
                                    />
                                </div>
                            </div>

                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="monday_id"
                                        name="monday_id"
                                        checked={
                                            data.monday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="monday_id"
                                        value="Monday"
                                    />
                                </div>
                            </div>

                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="tuesday_id"
                                        name="tuesday_id"
                                        checked={
                                            data.tuesday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="tuesday_id"
                                        value="Tuesday"
                                    />
                                </div>
                            </div>
                            
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="wednesday_id"
                                        name="wednesday_id"
                                        checked={
                                            data.wednesday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="wednesday_id"
                                        value="Wednesday"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="thursday_id"
                                        name="thursday_id"
                                        checked={
                                            data.thursday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="thursday_id"
                                        value="Thursday"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="friday_id"
                                        name="friday_id"
                                        checked={
                                            data.friday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="friday_id"
                                        value="Friday"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="saturday_id"
                                        name="saturday_id"
                                        checked={
                                            data.saturday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="saturday_id"
                                        value="Saturday"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="sunday_id"
                                        name="sunday_id"
                                        checked={
                                            data.sunday_id
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="sunday_id"
                                        value="Sunday"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckboxElements;
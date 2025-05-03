import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React from 'react';

const AllSelectCheckbox = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_days_id_a: "",
        monday_id_a: false,
        tuesday_id_a: false,
        wednesday_id_a: false,
        thursday_id_a: false,
        friday_id_a: false,
        saturday_id_a: false,
        sunday_id_a: false,
    });

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        if (name === "select_all_days_id_a") {
            newFormData = {
                ...data,
                [name]: value,
                ...Object.fromEntries(daysOfWeek.map(day => [`${day.toLowerCase()}_id_a`, value])),
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
                select_all_days_id_a: false,
            };

            if (value === false) {
                newFormData.select_all_days_id_a = false;
            } else if (daysOfWeek.every(day => newFormData[`${day.toLowerCase()}_id_a`])) {
                newFormData.select_all_days_id_a = true;
            }
        }

        setData(newFormData);
    };

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
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12">
                        <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>All Select Checkbox With Map</h5>
                        <div className="flex flex-wrap gap-5">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="select_all_days_id_a"
                                        name="select_all_days_id_a"
                                        checked={data.select_all_days_id_a}
                                        onChange={(e) => handleCheckboxSelect(e.target.name, e.target.checked)}
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="select_all_days_id_a"
                                        value="Select All"
                                    />
                                </div>
                            </div>

                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id={`${day.toLowerCase()}_id_a`}
                                            name={`${day.toLowerCase()}_id_a`}
                                            checked={data[`${day.toLowerCase()}_id_a`]}
                                            onChange={(e) => handleCheckboxSelect(e.target.name, e.target.checked)}
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor={`${day.toLowerCase()}_id_a`}
                                            value={day}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AllSelectCheckbox;

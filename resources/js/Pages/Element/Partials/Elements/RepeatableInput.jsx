import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const RepeatableInput = () => {
    const [formFields, setFormFields] = useState([
        { dummy_repeatable_input_id: '', dummy_repeatable_select_id: '' },
    ])
    const dummyRepeatableInput = useRef();
    const dummyRepeatableSelect = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_repeatable_input_id: "",
        dummy_repeatable_select_id: "",
    });

    const dummyRepeatableField = (e) => {
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

    //repeatable form fields start
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;
        setFormFields(updatedFields);

        setData(prevData => ({
            ...prevData,
            [field]: event.target.value,
        }));
    }
    
    const addFields = () => {
        setFormFields([...formFields, {dummy_repeatable_input_id: '', dummy_repeatable_select_id: ''}]);
    }
    
    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 2);
        setFormFields(updatedFormFields);
    }
    //repeatable form fields end

    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            <form onSubmit={dummyRepeatableField}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="educare-repeatable-input-field-styles">
                            <h6 className="text-[15px] text-headingLight mb-1 font-medium">
                                Repeatable Field Style
                            </h6>
                            <div className="flex flex-col gap-4">
                                {formFields.map(
                                    (form, index) => (
                                        <div
                                            key={index}
                                            className="educare-repeatable-input-field-style-single"
                                        >
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="dummy_repeatable_input_id"
                                                    ref={
                                                        dummyRepeatableInput
                                                    }
                                                    onChange={(event) => handleFormChange(event, index, "dummy_repeatable_input_id")}
                                                    value={form.dummy_repeatable_input_id}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.dummy_repeatable_input_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="dummy_repeatable_select_id"
                                                    data_label="Subject"
                                                    data={[]}
                                                    ref={
                                                        dummyRepeatableSelect
                                                    }
                                                    onChange={(event) => handleFormChange(event, index, "dummy_repeatable_select_id")}
                                                    value={form.dummy_repeatable_select_id}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.dummy_repeatable_select_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-repeatable-input-field-style-single-btn">
                                                {index >
                                                0 ? (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFields(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <i className="icon-minus"></i>
                                                    </button>
                                                ) : null}
                                                <button
                                                    className={`${
                                                        index >
                                                        0
                                                            ? "hidden"
                                                            : "inline-block"
                                                    }`}
                                                    type="button"
                                                    onClick={
                                                        addFields
                                                    }
                                                >
                                                    <i className="icon-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RepeatableInput;
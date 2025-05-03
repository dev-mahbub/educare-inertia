import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';

import React from 'react';

const InputElements = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_1: "",
        dummy_2: "",
        dummy_3: "",
        dummy_4: "",
        dummy_5: null,
        dummy_6: "",
        dummy_7: "",
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
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Input Style</h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="dummy_1"
                                value="Non Required"
                            />
                            <TextInput
                                id="dummy_1"
                                value={
                                    data.dummy_1
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_1",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_1
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="dummy_2"
                                        value="Required"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                id="dummy_2"
                                value={
                                    data.dummy_2
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_2",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_2
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        htmlFor="dummy_3"
                                        value="Input with add button"
                                    />
                                </div>
                                <Link
                                    href="#"
                                    className="educare-secondary-btn-sm-stroke"
                                >
                                    <i className="icon-PlusCircle"></i>{" "}
                                    Add
                                </Link>
                            </div>
                            <TextInput
                                id="dummy_3"
                                value={
                                    data.dummy_3
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_3",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_3
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="dummy_4"
                                value="Placeholder"
                            />
                            <TextInput
                                id="dummy_4"
                                value={
                                    data.dummy_4
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_4",
                                        e.target.value
                                    )
                                }
                                placeHolder="Write User Name"
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_4
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="dummy_7"
                                value="Disable Input"
                            />
                            <TextInput
                                id="dummy_7"
                                value={
                                    data.dummy_7
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_7",
                                        e.target.value
                                    )
                                }
                                placeHolder="Disable Input"
                                disabled={true}
                                className={`block ${data.dummy_7 ? 'enabled' : 'disabled'}`}
                            />
                            <InputError
                                message={
                                    errors.dummy_7
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Input Type File" />
                            <div className="educare-input-type-file-styles">
                                <input
                                    id="dummy_5"
                                    type="file"
                                    name="dummy_5"
                                    onChange={(e) =>
                                        setData(
                                            "dummy_5",
                                            e.target
                                                .files[0]
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-create-school-settings-list">
                            <div className="educare-create-school-settings-list-title">
                                <h6>Side Level Input</h6>
                            </div>
                            <div className="educare-create-school-settings-list-check">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="dummy_6"
                                        value={
                                            data.dummy_6
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_6",
                                                e.target
                                                    .value
                                            )
                                        }
                                        type="text"
                                        className="block"
                                    />

                                    <InputError
                                        message={
                                            errors.dummy_6
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list-success">
                                <i className="icon-check-1 inline-block"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-create-school-settings-list">
                            <div className="educare-create-school-settings-list-title">
                                <h6>Without Checkmark</h6>
                            </div>
                            <div className="educare-create-school-settings-list-check">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="dummy_6"
                                        value={
                                            data.dummy_6
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_6",
                                                e.target
                                                    .value
                                            )
                                        }
                                        type="text"
                                        className="block"
                                    />

                                    <InputError
                                        message={
                                            errors.dummy_6
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="educare-create-school-settings-list-success">
                                <i className="icon-check-1 hidden"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InputElements;
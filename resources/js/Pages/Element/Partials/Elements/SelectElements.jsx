import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TextField } from '@mui/material';
import CheckboxA from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const optionsData = [
    { title: 'The Shawshank Redemption'},
    { title: 'The Godfather'},
    { title: 'The Godfather: Part II'},
    { title: 'The Dark Knight'},
    { title: '12 Angry Men'},
    { title: "Schindler's List"},
    { title: 'Pulp Fiction'},
  ];

const SelectElements = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dummy_select_1: "",
        dummy_select_2: "",
        dummy_select_3: "",
        dummy_select_4: "",
        dummy_select_5: "",
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
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Select Style</h5>
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="dummy_select_1"
                                value="Non Required"
                            />
                            <SelectInput
                                id="dummy_select_1"
                                data_label="Class"
                                data={[]}
                                value={
                                    data.dummy_select_1
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_select_1",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_select_1
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
                                        htmlFor="dummy_select_2"
                                        value="Required"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <SelectInput
                                id="dummy_select_2"
                                data_label="Class"
                                data={[]}
                                value={
                                    data.dummy_select_2
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_select_2",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_select_2
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
                                        htmlFor="dummy_select_3"
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
                            <SelectInput
                                id="dummy_select_3"
                                data_label="Class"
                                data={[]}
                                value={
                                    data.dummy_select_3
                                }
                                onChange={(e) =>
                                    setData(
                                        "dummy_select_3",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.dummy_select_3
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Select Class"
                            />
                            <div className="educare-input-type-file-styles">
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={optionsData}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                        <CheckboxA
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                            {option.title}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="Classes" />
                                    )}
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
                                    <SelectInput
                                        id="dummy_select_4"
                                        value={
                                            data.dummy_select_4
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_select_4",
                                                e.target
                                                    .value
                                            )
                                        }
                                        type="text"
                                        className="block"
                                    />

                                    <InputError
                                        message={
                                            errors.dummy_select_4
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
                                    <SelectInput
                                        id="dummy_select_5"
                                        value={
                                            data.dummy_select_5
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_select_5",
                                                e.target
                                                    .value
                                            )
                                        }
                                        type="text"
                                        className="block"
                                    />

                                    <InputError
                                        message={
                                            errors.dummy_select_5
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

export default SelectElements;
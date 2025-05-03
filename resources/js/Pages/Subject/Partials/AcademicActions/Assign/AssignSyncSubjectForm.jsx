import { useForm } from '@inertiajs/react';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const multipleSelectorData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
];

const AssignSyncSubjectForm = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({});

    const assignSyncSubjectData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Sync subjects to other class
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <form onSubmit={assignSyncSubjectData}>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="lg:col-span-6 maxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-type-file-styles">
                                        <InputLabel
                                            value="Select Subjects"
                                        />
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={multipleSelectorData}
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
                                                <TextField
                                                    {...params}
                                                    label=""
                                                    placeholder="Select Subjects"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-6 maxMd:col-span-12">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-type-file-styles">
                                        <InputLabel
                                            value="Select Classes"
                                        />
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo2"
                                            options={multipleSelectorData}
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
                                                <TextField
                                                    {...params}
                                                    label=""
                                                    placeholder="Select Classes"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap justify-end gap-2.5">
                                    <PrimaryButton className="educare-gray-btn-lg-stroke">Cancel</PrimaryButton>
                                    <PrimaryButton className="educare-primary-btn-lg-fill">Save</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignSyncSubjectForm;
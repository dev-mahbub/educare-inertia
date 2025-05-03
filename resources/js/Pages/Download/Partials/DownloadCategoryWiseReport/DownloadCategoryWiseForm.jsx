import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';

const DownloadCategoryWiseForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_academic_year: "",
        select_class: "",
        select_session: "",
        select_section: "",
        select_all_id: "",
        other_id: false,
        student_id: false,
        school_id: false,
        obc_id: false,
        general_id: false,
    });
    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_id") {
            newFormData = {
                ...data,
                [name]: value,
                other_id: value,
                student_id: value,
                school_id: value,
                obc_id: value,
                general_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.other_id === true &&
                newFormData.student_id === true &&
                newFormData.school_id === true &&
                newFormData.obc_id === true &&
                newFormData.general_id === true
            ) {
                newFormData.select_all_id = true;
            }
        }

        setData(newFormData);
    };

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-user"></i>
                    Student Gender Wise Category Report
                </h5>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="select_academic_year"
                                            data_label="Academic Year"
                                            data={[]}
                                            value={
                                                data.select_academic_year
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_academic_year",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_academic_year
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="select_class"
                                            data_label="All Class"
                                            data={[]}
                                            value={
                                                data.select_class
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_class",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_class
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">

                                        <SelectInput
                                            id="select_section"
                                            data_label="All Section"
                                            data={[]}
                                            value={
                                                data.select_section
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_section",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_section
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className='col-span-12'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_id"
                                                        name="select_all_id"
                                                        checked={
                                                            data.select_all_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="select_all_id"
                                                        value="Select All"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="other_id"
                                                        name="other_id"
                                                        checked={
                                                            data.other_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="other_id"
                                                        value="OTHER"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_id"
                                                        name="student_id"
                                                        checked={
                                                            data.student_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_id"
                                                        value="ST"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="school_id"
                                                        name="school_id"
                                                        checked={
                                                            data.school_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="school_id"
                                                        value="SC"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="obc_id"
                                                        name="obc_id"
                                                        checked={
                                                            data.obc_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="obc_id"
                                                        value="OBC"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 md:col-span-4'>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="general_id"
                                                        name="general_id"
                                                        checked={
                                                            data.general_id
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="general_id"
                                                        value="GENERAL"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton
                                            className="educare-primary-btn-lg-fill"
                                        >
                                            Download Report
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadCategoryWiseForm;
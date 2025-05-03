import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import React from 'react';


const TeamManageForm = () => {
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
        dummy_select_1: "",
        dummy_textarea_1: "",
        dummy_card_check_4: "",
    });

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5> Add a school team </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="dummy_2"
                                            value="School team"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
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
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="dummy_2"
                                            value="Team Participants"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="dummy_select_1"
                                    data_label="Team Participants"
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

                        <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Team Type</h5>
                            <div className='flex flex-wrap gap-1'>
                                <span className='badge primary'>Cultural</span>
                                <span className='badge primary'>Sports</span>
                                <span className='badge primary'>Academic</span>
                                <span className='badge primary'>Others</span>
                                <span className='badge primary'>School security and safety</span>
                                <span className='badge primary'>School ERP and Software</span>
                                <span className='badge primary'>Registration</span>
                                <span className='badge primary'>Teacher's Meeting</span>
                            </div>
                        </div>
                        <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextareaInput
                                    id="dummy_textarea_1"
                                    data_label="Team Details"
                                    value={
                                        data.dummy_textarea_1
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_textarea_1",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Team Details"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.dummy_textarea_1
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                >
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamManageForm;
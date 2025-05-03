import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const CardElements = () => {
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
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Common Card Style
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="dummy_textarea_1"
                                    value="Non Required"
                                />
                                <TextareaInput
                                    id="dummy_textarea_1"
                                    value={
                                        data.dummy_textarea_1
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_textarea_1",
                                            e.target.value
                                        )
                                    }
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
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="dummy_card_check_4"
                                        name="dummy_card_check_4"
                                        checked={
                                            data.dummy_card_check_4
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "dummy_card_check_4",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="dummy_card_check_4"
                                        value="Economics"
                                    />
                                </div>
                            </div>
                        </div>
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

export default CardElements;
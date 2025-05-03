import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const UpdateTransportFeeForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_area: "",
        select_all_days_id: "",
        april_fee: false,
        may_fee: false,
        june_fee: false,
        july_fee: false,
        jan_fee: false,
        feb_fee: false,
        march_fee: false,
        admission_fee: false,
        annual_fee: false,
        term_1: false,
        term_2: false,
        term_3: false,
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_days_id") {
            newFormData = {
                ...data,
                [name]: value,
                april_fee: value,
                may_fee: value,
                june_fee: value,
                july_fee: value,
                jan_fee: value,
                feb_fee: value,
                march_fee: value,
                admission_fee: value,
                annual_fee: value,
                term_1: value,
                term_2: value,
                term_3: value,
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
              else if ( newFormData.april_fee === true && 
                        newFormData.may_fee === true &&
                        newFormData.june_fee === true &&
                        newFormData.july_fee === true &&
                        newFormData.jan_fee === true &&
                        newFormData.feb_fee === true &&
                        newFormData.feb_fee === true &&
                        newFormData.march_fee === true &&
                        newFormData.annual_fee === true &&
                        newFormData.term_1 === true &&
                        newFormData.term_2 === true &&
                        newFormData.term_3 === true 
                ) {
                newFormData.select_all_days_id = true;
              }
        }

        setData(newFormData);
    };
    //handle Checkbox end

    const transprtFeeData = (e) => {
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
        <form onSubmit={transprtFeeData}>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
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
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="jan_fee"
                                            name="jan_fee"
                                            checked={
                                                data.jan_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="jan_fee"
                                            value="January Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="feb_fee"
                                            name="feb_fee"
                                            checked={
                                                data.feb_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="feb_fee"
                                            value="February Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="march_fee"
                                            name="march_fee"
                                            checked={
                                                data.march_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="march_fee"
                                            value="March Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="april_fee"
                                            name="april_fee"
                                            checked={
                                                data.april_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="april_fee"
                                            value="April Fee 23-24"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="may_fee"
                                            name="may_fee"
                                            checked={
                                                data.may_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="may_fee"
                                            value="May Fee 2023"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="june_fee"
                                            name="june_fee"
                                            checked={
                                                data.june_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="june_fee"
                                            value="June Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="july_fee"
                                            name="july_fee"
                                            checked={
                                                data.july_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="july_fee"
                                            value="July Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="admission_fee"
                                            name="admission_fee"
                                            checked={
                                                data.admission_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="admission_fee"
                                            value="Admission Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="term_1"
                                            name="term_1"
                                            checked={
                                                data.term_1
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="term_1"
                                            value="Term 1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="term_2"
                                            name="term_2"
                                            checked={
                                                data.term_2
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="term_2"
                                            value="Term 2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="term_3"
                                            name="term_3"
                                            checked={
                                                data.term_3
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="term_3"
                                            value="Term 3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="annual_fee"
                                            name="annual_fee"
                                            checked={
                                                data.annual_fee
                                            }
                                            onChange={(e) =>
                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="annual_fee"
                                            value="Annual Fee"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles max-w-[300px]">
                                    <InputLabel
                                        htmlFor="select_area"
                                        value="Non Required"
                                    />
                                    <SelectInput
                                        id="select_area"
                                        data_label="Area"
                                        data={[]}
                                        value={
                                            data.select_area
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "select_area",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.select_area
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill"
                                    >
                                        Update Transport Fee Every Where!
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UpdateTransportFeeForm;
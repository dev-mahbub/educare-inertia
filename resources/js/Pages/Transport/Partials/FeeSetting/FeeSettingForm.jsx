import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from "react";

const FeeSettingForm = ({ companies, transportSettingsData }) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        company: "",
        fee_structure: "",
        teacher_transport_payable: "",
    });

    // handle transport voucher setting start
    const handleTransportVoucherSettingData = (e) => {
        e.preventDefault();
        post(route("transport.voucher_fee_setting.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    }
    // handle transport voucher setting end

    // handle transport fee setting start
    const handleFeeSettingData = (e) => {
        e.preventDefault();
        post(route("transport.fee_setting.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };
    // handle transport fee setting end

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            company: transportSettingsData?.transport_company,
            fee_structure: transportSettingsData?.transport_fee_structure,
            teacher_transport_payable: transportSettingsData?.transport_teacher_payable,
        }))
    }, [transportSettingsData]);

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                <form onSubmit={handleFeeSettingData}>
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Transport Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="educare-radio-field-styles flex gap-3">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="teacher_transport_payable"
                                                name="teacher_transport_payable"
                                                checked={
                                                    data.teacher_transport_payable
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "teacher_transport_payable",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="teacher_transport_payable"
                                                value="Is Teacher Transport Payable"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card-title mt-6">
                        <h5>
                            <i className="icon-settting"></i>
                            Set Company name for Transport Voucher
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="educare-input-field-styles max-w-[300px] maxXs:max-w-full">
                                    <InputLabel
                                        htmlFor="company"
                                        value="Company"
                                    />
                                    <SelectInput
                                        id="company"
                                        data_label="Company"
                                        data={companies}
                                        value={
                                            data.company
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "company",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.company
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-create-school-settings-list flex mt-4 justify-end">
                                    <div className="col-span-12">
                                        <div className="">
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
                </form>

                <form onSubmit={handleTransportVoucherSettingData}>
                    <div className="educare-common-card-title mt-8">
                        <h5>
                            <i className="icon-settting"></i>
                            Transport Voucher Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                        <div className="grid grid-cols-12 gap-2.5">
                            <div className="md:col-span-6 col-span-12">
                                <div className="educare-radio-field-styles">
                                    <RadioInput
                                        name="fee_structure"
                                        value="Do you want to transport fee in Fee Structure ?"
                                        checked={data.fee_structure === "fee"}
                                        onChange={() => setData("fee_structure", "fee")}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-6 col-span-12">
                                <div className="educare-radio-field-styles">
                                    <RadioInput
                                        name="fee_structure"
                                        value="Do you want to create it as a voucher ?"
                                        checked={data.fee_structure === "voucher"}
                                        onChange={() => setData("fee_structure", "voucher")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-create-school-settings-list flex mt-4 justify-end">
                                    <div className="col-span-12">
                                        <div className="">
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
                </form>
            </div>
        </div>
    );
};

export default FeeSettingForm;

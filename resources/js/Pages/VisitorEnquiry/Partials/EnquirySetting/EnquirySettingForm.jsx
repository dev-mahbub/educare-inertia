import React from 'react';
import RadioInput from '@/Components/RadioInput';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const EnquirySettingForm = ({gatepass}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        getpass_receipt_page_size: gatepass?.getpass_receipt_page_size,
    });

    const handelChecked = (e) => {
        e.preventDefault();
        data["value"] = data.getpass_receipt_page_size;
        data["type"] = "gatepass";
        data["key"] = "getpass_receipt_page_size";
        router.post(route('visitor_enquiry_setting_create_update'), data, {
            preserveScroll: true,
        });
    }

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-SquaresFour"></i>
                    Gatepass Setting
                </h5>
            </div>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-4">
                            <p>Gatepass Receipt Page Size </p>
                        </div>
                        <div className="col-span-4">
                            <div className="educare-create-school-settings-list-check min-width-full">
                                <div className="educare-radio-field-styles flex gap-3">
                                    {/* <RadioInput
                                        name="staffType"
                                        value="Small"
                                        checked={data.staffType === "teaching"}
                                        onChange={() => setData("staffType", "teaching")}
                                    />
                                    <RadioInput
                                        name="staffType"
                                        value="Large"
                                        checked={data.staffType === "non_teaching"}
                                        onChange={() => setData("staffType", "non_teaching")}
                                    /> */}
                                    <RadioInput
                                        name="getpass_receipt_page_size"
                                        value="Small"
                                        checked={data.getpass_receipt_page_size === "Small"}
                                        onChange={() => setData("getpass_receipt_page_size", "Small")}
                                    />
                                    <RadioInput
                                        name="getpass_receipt_page_size"
                                        value="Large"
                                        checked={data.getpass_receipt_page_size === "Large"}
                                        onChange={() => setData("getpass_receipt_page_size", "Large")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    onClick={(e) => handelChecked(e)}
                                    className="educare-primary-btn-md-fill"
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnquirySettingForm;
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import TextInput from '@/Components/TextInput';
import { router, useForm } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';

export default function AccountSettingForm({ siteSettings = {}, siteSettingsReceipt={}, siteSettingsVoucher={} }) {

    const {
        data,
        setData
    } = useForm({
        account_is_fee_integrated: siteSettings.account_is_fee_integrated ?? '',
        account_is_salary_integrated: siteSettings.account_is_salary_integrated ?? '',
        account_is_registration_integrated: siteSettings.account_is_registration_integrated ?? '',
        account_is_ledger_amount_based: siteSettings.account_is_ledger_amount_based ?? '',
        receipt_is_copy: siteSettingsReceipt.receipt_is_copy ?? '',
        voucher_is_enable_payment: siteSettingsVoucher.voucher_is_enable_payment ?? '',
        voucher_is_enable_receipt: siteSettingsVoucher.voucher_is_enable_receipt ?? '',
        voucher_is_enable_purchase: siteSettingsVoucher.voucher_is_enable_purchase ?? '',
        voucher_is_enable_sale: siteSettingsVoucher.voucher_is_enable_sale ?? '',
        voucher_payment_voucher_receipt_seed_no: siteSettingsVoucher.voucher_payment_voucher_receipt_seed_no ?? '',
        voucher_receipt_voucher_receipt_seed_no: siteSettingsVoucher.voucher_receipt_voucher_receipt_seed_no ?? '',
        voucher_purchase_voucher_receipt_seed_no: siteSettingsVoucher.voucher_purchase_voucher_receipt_seed_no ?? '',
        voucher_sale_voucher_receipt_seed_no: siteSettingsVoucher.voucher_sale_voucher_receipt_seed_no ?? '',
    });

    // old code
    // const handelChecked = (type, key, value) => {
    //     const sendData = { type, key, value }
    //     router.post(route('account_setting_create_update'), sendData);
    // }

    // new code
    // handle form submit start
    const handelChecked = (type, key, value, seedKey) => {
        let form_data = { type, key, value }

        if (seedKey != null) {
            const key_value_array = [
                { type, key, value },
                { type, key: seedKey, value: data[seedKey] }
            ];

            form_data = { key_value_array }
        }

        router.post(route('account_setting_create_update'), form_data);
    }
    // handle form submit end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <form>
                            <div className="educare-common-card mb-5">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-settting"></i>
                                            Account Setting
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Fee Integrated with Account</h5>
                                            </div>
                                            <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="account_is_fee_integrated"
                                                            value="Yes"
                                                            onChange={() => setData("account_is_fee_integrated", "Yes")}
                                                            checked={data?.account_is_fee_integrated && data?.account_is_fee_integrated === "Yes"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="account_is_fee_integrated"
                                                            value="No"
                                                            checked={data?.account_is_fee_integrated && data?.account_is_fee_integrated === "No"}
                                                            onChange={() => setData("account_is_fee_integrated", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Account', 'account_is_fee_integrated', data?.account_is_fee_integrated)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Salary Integrated with Account</h5>
                                            </div>
                                            <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="account_is_salary_integrated"
                                                            value="Yes"
                                                            checked={data?.account_is_salary_integrated === "Yes"}
                                                            onChange={() => setData("account_is_salary_integrated", "Yes")}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="account_is_salary_integrated"
                                                            value="No"
                                                            checked={data?.account_is_salary_integrated === "No"}
                                                            onChange={() => setData("account_is_salary_integrated", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Account', 'account_is_salary_integrated', data?.account_is_salary_integrated)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Registration Integrated with Account</h5>
                                            </div>
                                            <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="account_is_registration_integrated"
                                                            value="Yes"
                                                            checked={data?.account_is_registration_integrated === "Yes"}
                                                            onChange={() => setData("account_is_registration_integrated", "Yes")}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="account_is_registration_integrated"
                                                            value="No"
                                                            checked={data?.account_is_registration_integrated === "No"}
                                                            onChange={() => setData("account_is_registration_integrated", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Account', 'account_is_registration_integrated', data.account_is_registration_integrated)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Ledger Amount Based On Session</h5>
                                            </div>
                                            <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="account_is_ledger_amount_based"
                                                            value="Yes"
                                                            checked={data.account_is_ledger_amount_based === "Yes"}
                                                            onChange={() => setData("account_is_ledger_amount_based", "Yes")}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="account_is_ledger_amount_based"
                                                            value="No"
                                                            checked={data.account_is_ledger_amount_based === "No"}
                                                            onChange={() => setData("account_is_ledger_amount_based", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Account', 'account_is_ledger_amount_based', data.account_is_ledger_amount_based)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}
                                    </div>
                                </div>
                            </div>

                            <div className="educare-common-card mb-5">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-settting"></i>
                                            Receipt Setting
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Receipt Copy</h5>
                                            </div>
                                            <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="receipt_is_copy"
                                                            value="Single"
                                                            onChange={() => setData("receipt_is_copy", "Single")}
                                                            checked={data?.receipt_is_copy && data?.receipt_is_copy === "Single"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="receipt_is_copy"
                                                            value="Double"
                                                            checked={data?.receipt_is_copy && data?.receipt_is_copy === "Double"}
                                                            onChange={() => setData("receipt_is_copy", "Double")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Receipt', 'receipt_is_copy', data?.receipt_is_copy)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                    </div>
                                </div>
                            </div>

                            <div className="educare-common-card">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-settting"></i>
                                            Voucher Seed Setting
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5 items-center">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Enable Payment Voucher Receipt number session wise</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="voucher_is_enable_payment"
                                                                    value="Yes"
                                                                    checked={data?.voucher_is_enable_payment && data?.voucher_is_enable_payment === "Yes"}
                                                                    onChange={() => setData("voucher_is_enable_payment", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="voucher_is_enable_payment"
                                                                    value="No"
                                                                    checked={data?.voucher_is_enable_payment && data?.voucher_is_enable_payment === "No"}
                                                                    onChange={() => setData("voucher_is_enable_payment", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.voucher_is_enable_payment === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="voucher_payment_voucher_receipt_seed_no"
                                                                    value={
                                                                        data?.voucher_payment_voucher_receipt_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "voucher_payment_voucher_receipt_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Current Seed"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {/* <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="voucher_is_enable_payment"
                                                            value="Yes"
                                                            onChange={() => setData("voucher_is_enable_payment", "Yes")}
                                                            checked={data?.voucher_is_enable_payment && data?.voucher_is_enable_payment === "Yes"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="voucher_is_enable_payment"
                                                            value="No"
                                                            checked={data?.voucher_is_enable_payment && data?.voucher_is_enable_payment === "No"}
                                                            onChange={() => setData("voucher_is_enable_payment", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-span-1">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        // onClick={() => handelChecked('Voucher', 'voucher_is_enable_payment', data?.voucher_is_enable_payment)}
                                                        onClick={() => handelChecked('Voucher', 'voucher_is_enable_payment', data?.voucher_is_enable_payment, 'voucher_payment_voucher_receipt_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5 items-center">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Enable Reciept Voucher Receipt number session wise</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="voucher_is_enable_receipt"
                                                                    value="Yes"
                                                                    checked={data?.voucher_is_enable_receipt && data?.voucher_is_enable_receipt === "Yes"}
                                                                    onChange={() => setData("voucher_is_enable_receipt", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="voucher_is_enable_receipt"
                                                                    value="No"
                                                                    checked={data?.voucher_is_enable_receipt && data?.voucher_is_enable_receipt === "No"}
                                                                    onChange={() => setData("voucher_is_enable_receipt", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.voucher_is_enable_receipt === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="voucher_receipt_voucher_receipt_seed_no"
                                                                    value={
                                                                        data?.voucher_receipt_voucher_receipt_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "voucher_receipt_voucher_receipt_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Current Seed"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {/* <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="voucher_is_enable_receipt"
                                                            value="Yes"
                                                            onChange={() => setData("voucher_is_enable_receipt", "Yes")}
                                                            checked={data?.voucher_is_enable_receipt && data?.voucher_is_enable_receipt === "Yes"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="voucher_is_enable_receipt"
                                                            value="No"
                                                            checked={data?.voucher_is_enable_receipt && data?.voucher_is_enable_receipt === "No"}
                                                            onChange={() => setData("voucher_is_enable_receipt", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-span-1">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        // onClick={() => handelChecked('Voucher', 'voucher_is_enable_receipt', data?.voucher_is_enable_receipt)}
                                                        onClick={() => handelChecked('Voucher', 'voucher_is_enable_receipt', data?.voucher_is_enable_receipt, 'voucher_receipt_voucher_receipt_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5 items-center">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Enable Purchase Voucher Receipt number session wise</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="voucher_is_enable_purchase"
                                                                    value="Yes"
                                                                    checked={data?.voucher_is_enable_purchase && data?.voucher_is_enable_purchase === "Yes"}
                                                                    onChange={() => setData("voucher_is_enable_purchase", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="voucher_is_enable_purchase"
                                                                    value="No"
                                                                    checked={data?.voucher_is_enable_purchase && data?.voucher_is_enable_purchase === "No"}
                                                                    onChange={() => setData("voucher_is_enable_purchase", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.voucher_is_enable_purchase === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="voucher_purchase_voucher_receipt_seed_no"
                                                                    value={
                                                                        data?.voucher_purchase_voucher_receipt_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "voucher_purchase_voucher_receipt_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Current Seed"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {/* <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="voucher_is_enable_purchase"
                                                            value="Yes"
                                                            onChange={() => setData("voucher_is_enable_purchase", "Yes")}
                                                            checked={data?.voucher_is_enable_purchase && data?.voucher_is_enable_purchase === "Yes"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="voucher_is_enable_purchase"
                                                            value="No"
                                                            checked={data?.voucher_is_enable_purchase && data?.voucher_is_enable_purchase === "No"}
                                                            onChange={() => setData("voucher_is_enable_purchase", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-span-1">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        // onClick={() => handelChecked('Voucher', 'voucher_is_enable_purchase', data?.voucher_is_enable_purchase)}
                                                        onClick={() => handelChecked('Voucher', 'voucher_is_enable_purchase', data?.voucher_is_enable_purchase, 'voucher_purchase_voucher_receipt_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                        {/* Item */}
                                        <div className="grid grid-cols-12 gap-5 maxSm:mb-5 items-center">
                                            <div className="col-span-12 md:col-span-6">
                                                <h5 className='my-5 maxSm:my-0'>Enable Sale Voucher Receipt number session wise</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="voucher_is_enable_sale"
                                                                    value="Yes"
                                                                    checked={data?.voucher_is_enable_sale && data?.voucher_is_enable_sale === "Yes"}
                                                                    onChange={() => setData("voucher_is_enable_sale", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="voucher_is_enable_sale"
                                                                    value="No"
                                                                    checked={data?.voucher_is_enable_sale && data?.voucher_is_enable_sale === "No"}
                                                                    onChange={() => setData("voucher_is_enable_sale", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.voucher_is_enable_sale === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="voucher_sale_voucher_receipt_seed_no"
                                                                    value={
                                                                        data?.voucher_sale_voucher_receipt_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "voucher_sale_voucher_receipt_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Current Seed"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {/* <div className="col-span-10 md:col-span-4">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 maxSm:my-0 gap-3">
                                                        <RadioInput
                                                            name="voucher_is_enable_sale"
                                                            value="Yes"
                                                            onChange={() => setData("voucher_is_enable_sale", "Yes")}
                                                            checked={data?.voucher_is_enable_sale && data?.voucher_is_enable_sale === "Yes"}
                                                            className='my-5 maxSm:my-0'
                                                        />
                                                        <RadioInput
                                                            name="voucher_is_enable_sale"
                                                            value="No"
                                                            checked={data?.voucher_is_enable_sale && data?.voucher_is_enable_sale === "No"}
                                                            onChange={() => setData("voucher_is_enable_sale", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-span-1">
                                                <div className="educare-list-action-btn my-5 maxSm:my-0">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        // onClick={() => handelChecked('Voucher', 'voucher_is_enable_sale', data?.voucher_is_enable_sale)}
                                                        onClick={() => handelChecked('Voucher', 'voucher_is_enable_sale', data?.voucher_is_enable_sale, 'voucher_sale_voucher_receipt_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Item */}

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12 hidden">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-settting"></i>
                                        Ledger Setting
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="flex justify-between flex-wrap gap-5">
                                        <h5>Update previous year closing balance of ledger as opening balance of this year</h5>
                                        <div>
                                            <PrimaryButton
                                                className="educare-primary-btn-md-fill"
                                            >
                                                Update
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

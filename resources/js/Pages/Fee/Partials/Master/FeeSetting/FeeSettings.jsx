import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm, usePage } from '@inertiajs/react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const FeeSettings = ({
    siteSettingsFee = {},
    siteSettingsAccount = {},
    templateTags = [],
    lateFineTypes = [],
    currentAcademicYear,
    backDateStaffIds,
    staffs,
    paymentGatewaySettings
}) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [fineStartDate, setFineStartDate] = useState(siteSettingsFee?.fee_late_fine_start_date ? new Date(siteSettingsFee?.fee_late_fine_start_date) : "");

    const { props } = usePage();

    const customErrors = props.errors;

    const [selectedStaffIds, setSelectedStaffIds] = useState(backDateStaffIds);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        fee_is_structure_with_template: siteSettingsFee.fee_is_structure_with_template ?? '',
        fee_is_hostel_available: siteSettingsFee.fee_is_hostel_available ?? '',
        fee_is_disallow_structure_to_ews_student: siteSettingsFee.fee_is_disallow_structure_to_ews_student ?? '',
        fee_is_online_fee_in_parent_mobile_app: siteSettingsFee.fee_is_online_fee_in_parent_mobile_app ?? '',
        fee_allow_fee_taking_for_back_date: siteSettingsFee.fee_allow_fee_taking_for_back_date ?? '',
        fee_receipt_page_size: siteSettingsFee.fee_receipt_page_size ?? '',
        fee_receipt_copy: siteSettingsFee.fee_receipt_copy ?? '',
        fee_is_installment_auto_selected: siteSettingsFee.fee_is_installment_auto_selected ?? '',
        fee_is_installment_sequentially_selected: siteSettingsFee.fee_is_installment_sequentially_selected ?? '',
        fee_is_online_payment_up_to_the_current_month_for_students_forced: siteSettingsFee.fee_is_online_payment_up_to_the_current_month_for_students_forced ?? '',
        fee_receipt_custom_instruction: siteSettingsFee.fee_receipt_custom_instruction ?? '',
        fee_reg_receipt_page_size: siteSettingsFee.fee_reg_receipt_page_size ?? '',
        fee_reg_receipt_copy: siteSettingsFee.fee_reg_receipt_copy ?? '',
        fee_is_receipt_number_session_wise_enabled: siteSettingsFee.fee_is_receipt_number_session_wise_enabled ?? "",
        fee_is_voucher_seed_no_enabled: siteSettingsFee.fee_is_voucher_seed_no_enabled ?? "",
        fee_is_registration_seed_no_enabled: siteSettingsFee.fee_is_registration_seed_no_enabled ?? "",
        fee_is_refund_seed_no_enabled: siteSettingsFee.fee_is_refund_seed_no_enabled ?? "",
        fee_is_transport_voucher_seed_no_enabled: siteSettingsFee.fee_is_transport_voucher_seed_no_enabled ?? "",
        fee_is_hostel_voucher_seed_no_enabled: siteSettingsFee.fee_is_hostel_voucher_seed_no_enabled ?? "",
        fee_receipt_number_session_wise_seed_no: siteSettingsFee.fee_receipt_number_session_wise_seed_no ?? "",
        fee_voucher_seed_no: siteSettingsFee.fee_voucher_seed_no ?? "",
        fee_registration_seed_no: siteSettingsFee.fee_registration_seed_no ?? "",
        fee_refund_seed_no: siteSettingsFee.fee_refund_seed_no ?? "",
        fee_transport_voucher_seed_no: siteSettingsFee.fee_transport_voucher_seed_no ?? "",
        fee_hostel_voucher_seed_no: siteSettingsFee.fee_hostel_voucher_seed_no ?? "",
        fee_is_payment_geteway_enabled: siteSettingsFee.fee_is_payment_geteway_enabled ?? '',
        account_is_fee_integrated: siteSettingsAccount.account_is_fee_integrated ?? '',
        fee_fully_paid_sms_template: siteSettingsFee.fee_fully_paid_sms_template ?? '',
        fee_partial_paid_sms_template: siteSettingsFee.fee_partial_paid_sms_template ?? '',
        fee_due_sms_template: siteSettingsFee.fee_due_sms_template ?? '',
        fee_late_fine_type: siteSettingsFee.fee_late_fine_type ?? '',
        fee_late_fine_start_date: siteSettingsFee.fee_late_fine_start_date ?? '',
        fee_late_fine_amount: siteSettingsFee.fee_late_fine_amount ?? '',
        fee_payment_cheque_bounce_fine: siteSettingsFee.fee_payment_cheque_bounce_fine ?? '',
        staff_ids: selectedStaffIds,

        // payment gateway
        payment_gateway_name: paymentGatewaySettings?.payment_gateway_name ?? '',
        razorpay_key_id: paymentGatewaySettings?.razorpay_key_id ?? '',
        razorpay_key_secret: paymentGatewaySettings?.razorpay_key_secret ?? '',
        paytm_merchant_id: paymentGatewaySettings?.paytm_merchant_id ?? '',
        paytm_merchant_key: paymentGatewaySettings?.paytm_merchant_key ?? '',
        paytm_website: paymentGatewaySettings?.paytm_website ?? '',
        paytm_industry_type: paymentGatewaySettings?.paytm_industry_type ?? ''
    });

    useEffect(() => {
        setSelectedOptions(staffs?.filter(item => backDateStaffIds?.includes(item?.id)));
    }, [backDateStaffIds]);

    useEffect(() => {
        setSelectedStaffIds(selectedOptions?.map(item => item?.id));
    }, [selectedOptions]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staff_ids: selectedStaffIds
        }));
    }, [selectedStaffIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_late_fine_start_date: fineStartDate
        }));
    }, [fineStartDate]);

    // handle form submit start
    const handelChecked = (type, key, value, seedKey) => {
        let key_value_array = [
            {type, key, value}
        ];

        if (seedKey != null) {
            key_value_array.push({ type, key: seedKey, value: data[seedKey] })
        }

        let sendData = {};

        if (key == 'fee_allow_fee_taking_for_back_date') {
            sendData = { key_value_array, staff_ids: data?.staff_ids};
        } else {
            sendData = { key_value_array};
        }

        router.post(route('fee.fee_setting.save'), sendData);
    }
    // handle form submit end

    // handle late fee payment fine apply start
    const handleLateFineApply = (e) => {
        e.preventDefault();

        if (data?.fee_late_fine_type == "") {
            toast.error("Please select late fine type", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.fee_late_fine_start_date == "") {
            toast.error("Please select late fine start date", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else if (data?.fee_late_fine_amount == "") {
            toast.error("Late fine amount is required", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
        else {
            const key_value_array = [
                {
                    type: "Fee",
                    key: "fee_late_fine_type",
                    value: data?.fee_late_fine_type,
                },
                {
                    type: "Fee",
                    key: "fee_late_fine_start_date",
                    value: data?.fee_late_fine_start_date,
                },
                {
                    type: "Fee",
                    key: "fee_late_fine_amount",
                    value: data?.fee_late_fine_amount,
                }
            ];

            const form_data = { key_value_array }

            router.post(route('fee.fee_setting.save'), form_data);
        }

    }
    // handle late fee payment fine apply end

    // handle save payment gateway setting start
    const handleSavePaymentGatewaySetting = (e) => {
        e.preventDefault();

        if(data?.payment_gateway_name == '') {
            toast.error("Please select payment gateway", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }

        const paymentGateways = {
            razorpay: [
                {
                    key: "razorpay_key_id",
                    value: data?.razorpay_key_id
                },
                {
                    key: "razorpay_key_secret",
                    value: data?.razorpay_key_secret
                }
            ],
            paytm: [
                {
                    key: "paytm_merchant_id",
                    value: data?.paytm_merchant_id
                },
                {
                    key: "paytm_merchant_key",
                    value: data?.paytm_merchant_key
                },
                {
                    key: "paytm_website",
                    value: data?.paytm_website
                },
                {
                    key: "paytm_industry_type",
                    value: data?.paytm_industry_type
                }
            ],
        };

        const selectedGateway = paymentGateways[data.payment_gateway_name];

        // validate required fields
        const hasEmpty = selectedGateway?.some(item => !item.value);

        if (!selectedGateway || hasEmpty) {
            toast.error("Required fields cannot be empty!", {
                position: 'top-right',
                autoClose: 1500,
            });

            return;
        }

        const type = "Payment Gateway";

        const key_value_array = [
            { type, key: "payment_gateway_name", value: data.payment_gateway_name },
            ...selectedGateway.map(item => ({ type, key: item.key, value: item.value })),
        ];

        const form_data = { key_value_array };

        router.post(route('fee.fee_setting.save'), form_data);
    }
    // handle save payment gateway setting end

    // Razorpay Test btn
    const handleRazorpayTest = (e) => {
        e.preventDefault();
        const form_data = { amount: 699, feeId: 287 };
        router.post(route('razorpay.test_form'), form_data);
    }

    // Razorpay Test btn
    const handlePaytmTest = (e) => {
        e.preventDefault();
        const form_data = { amount: 699, feeId: 287 };
        router.post(route('paytm.payment'), form_data);
    }


    // handle fee payment cheque bounce fine apply start
    const handleChequeBounceFineApply = (e) => {
        e.preventDefault();

        const key_value_array = [
            {
                type: "Fee",
                key: "fee_payment_cheque_bounce_fine",
                value: data?.fee_payment_cheque_bounce_fine,
            }
        ];

        const form_data = { key_value_array }

        router.post(route('fee.fee_setting.save'), form_data);
    }
    // handle fee payment cheque bounce fine apply end


    // handle template tag click start
    const handleTagClick = (targetInput, value) => {
        if (targetInput === 'fully-paid') {
            setData("fee_fully_paid_sms_template", data.fee_fully_paid_sms_template + ' #' + value);
        } else if (targetInput === 'partial-paid') {
            setData("fee_partial_paid_sms_template", data.fee_partial_paid_sms_template + ' #' + value);
        } else if (targetInput === 'due') {
            setData("fee_due_sms_template", data.fee_due_sms_template + ' #' + value);
        }
    };
    // handle template tag click end

    // handle assign student fee structure start
    const handleAssignStudentFeeStructure = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: `Before proceeding further, Please read 2nd point for this action.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0b52bd',
            cancelButtonColor: '#38b3fe',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('fee.assign_student_fee_structure.save'));
            }
        });
    }
    // handle assign student fee structure end

    // handle select staff start
    const handleSelectStaff = (event, value) => {
        setSelectedOptions(value);
    };
    // handle select staff end



    return (
        <form>
            <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5 mb-5">
                {/* <div className='col-span-12 md:col-span-6 lg:col-span-6'>
                    <div className='educare-input-field-notes min-h-full shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg'>
                        <ul>
                            <li className='mb-2'><strong>Note :</strong> If this option is enable, so you can create multiple fee structure for one class !! But make Sure this option will use only one time. Before create structure !!</li>
                            <li>Don't make any changes after create fee structure .</li>
                        </ul>
                    </div>
                </div>
                <div className='col-span-12 md:col-span-6 lg:col-span-6'>
                    <div className='educare-input-field-notes p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg'>
                        <ul>
                            <li className='mb-2 font-bold'> <strong>Important!!</strong></li>
                            <li className='mb-2'>1) <strong>Note :</strong>This is one time process, once done it cannot be revert back.</li>
                            <li>2) Make sure that fee structure has been created without a template. From this option you can Assign fee structure for old and new student.</li>
                        </ul>
                    </div>
                </div> */}
            </div>
            <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                <div className="col-span-12 xl:col-span-6">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Fee Structure Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='my-5 maxSm:mb-0 text-[15px] font-medium font-primary text-headingLight'>Create fee structure with template?</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 gap-3">
                                                        <RadioInput
                                                            name="fee_is_structure_with_template"
                                                            value="Yes"
                                                            onChange={() => setData("fee_is_structure_with_template", "Yes")}
                                                            checked={data?.fee_is_structure_with_template && data?.fee_is_structure_with_template === "Yes"}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_structure_with_template"
                                                            value="No"
                                                            onChange={() => setData("fee_is_structure_with_template", "No")}
                                                            checked={data?.fee_is_structure_with_template && data?.fee_is_structure_with_template === "No"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_structure_with_template', data?.fee_is_structure_with_template)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='mb-5 text-[15px] font-medium font-primary text-headingLight'>Is Hostel Available?</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex mb-5 gap-3">
                                                        <RadioInput
                                                            name="fee_is_hostel_available"
                                                            value="Yes"
                                                            onChange={() => setData("fee_is_hostel_available", "Yes")}
                                                            checked={data?.fee_is_hostel_available && data?.fee_is_hostel_available === "Yes"}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_hostel_available"
                                                            value="No"
                                                            onChange={() => setData("fee_is_hostel_available", "No")}
                                                            checked={data?.fee_is_hostel_available && data?.fee_is_hostel_available === "No"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_hostel_available', data?.fee_is_hostel_available)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight mb-5'>Disallow Create Fee Structure to EWS Student</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex  gap-3">
                                                        <RadioInput
                                                            name="fee_is_disallow_structure_to_ews_student"
                                                            value="Yes"
                                                            onChange={() => setData("fee_is_disallow_structure_to_ews_student", "Yes")}
                                                            checked={data?.fee_is_disallow_structure_to_ews_student && data?.fee_is_disallow_structure_to_ews_student === "Yes"}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_disallow_structure_to_ews_student"
                                                            value="No"
                                                            onChange={() => setData("fee_is_disallow_structure_to_ews_student", "No")}
                                                            checked={data?.fee_is_disallow_structure_to_ews_student && data?.fee_is_disallow_structure_to_ews_student === "No"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_disallow_structure_to_ews_student', data?.fee_is_disallow_structure_to_ews_student)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight mb-5'>Enable Online Fee in Parent Mobile App</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex  gap-3">
                                                        <RadioInput
                                                            name="fee_is_online_fee_in_parent_mobile_app"
                                                            value="Yes"
                                                            onChange={() => setData("fee_is_online_fee_in_parent_mobile_app", "Yes")}
                                                            checked={data?.fee_is_online_fee_in_parent_mobile_app && data?.fee_is_online_fee_in_parent_mobile_app === "Yes"}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_online_fee_in_parent_mobile_app"
                                                            value="No"
                                                            onChange={() => setData("fee_is_online_fee_in_parent_mobile_app", "No")}
                                                            checked={data?.fee_is_online_fee_in_parent_mobile_app && data?.fee_is_online_fee_in_parent_mobile_app === "No"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_online_fee_in_parent_mobile_app', data?.fee_is_online_fee_in_parent_mobile_app)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight mb-5'>Allow Fee Taking For Back Date</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="fee_allow_fee_taking_for_back_date"
                                                                    value="Yes"
                                                                    onChange={() => setData("fee_allow_fee_taking_for_back_date", "Yes")}
                                                                    checked={data?.fee_allow_fee_taking_for_back_date && data?.fee_allow_fee_taking_for_back_date === "Yes"}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_allow_fee_taking_for_back_date"
                                                                    value="No"
                                                                    onChange={() => setData("fee_allow_fee_taking_for_back_date", "No")}
                                                                    checked={data?.fee_allow_fee_taking_for_back_date && data?.fee_allow_fee_taking_for_back_date === "No"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_allow_fee_taking_for_back_date === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <Autocomplete
                                                                    multiple
                                                                    id="staff_ids"
                                                                    options={staffs}
                                                                    value={selectedOptions}
                                                                    onChange={handleSelectStaff}
                                                                    disableCloseOnSelect
                                                                    getOptionLabel={(option) => option.title}
                                                                    renderOption={(props, option, { selected }) => (
                                                                        <li {...props}>
                                                                            <CheckboxA
                                                                                icon={icon}
                                                                                checkedIcon={checkedIcon}
                                                                                style={{ marginRight: 8 }}
                                                                                checked={selectedStaffIds?.includes(option.id)}
                                                                            />
                                                                            {option.title}
                                                                        </li>
                                                                    )}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} placeholder="Classes" />
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.staff_ids
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_allow_fee_taking_for_back_date', data?.fee_allow_fee_taking_for_back_date)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* old code */}
                                        {/* <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight mb-5'>Allow Fee Taking For Back Date</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex  gap-3">
                                                        <RadioInput
                                                            name="fee_allow_fee_taking_for_back_date"
                                                            value="Yes"
                                                            onChange={() => setData("fee_allow_fee_taking_for_back_date", "Yes")}
                                                            checked={data?.fee_allow_fee_taking_for_back_date && data?.fee_allow_fee_taking_for_back_date === "Yes"}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_allow_fee_taking_for_back_date"
                                                            value="No"
                                                            onChange={() => setData("fee_allow_fee_taking_for_back_date", "No")}
                                                            checked={data?.fee_allow_fee_taking_for_back_date && data?.fee_allow_fee_taking_for_back_date === "No"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_allow_fee_taking_for_back_date', data?.fee_allow_fee_taking_for_back_date)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Fee Receipt/Installment Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className='col-span-12'>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='my-5 maxSm:mb-0 text-[15px] font-medium font-primary text-headingLight'>Fee Receipt Page Size</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 gap-3">
                                                        <RadioInput
                                                            name="fee_receipt_page_size"
                                                            value="Small"
                                                            checked={data.fee_receipt_page_size === "Small"}
                                                            onChange={() => setData("fee_receipt_page_size", "Small")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_receipt_page_size"
                                                            value="Large"
                                                            checked={data?.fee_receipt_page_size && data?.fee_receipt_page_size === "Large"}
                                                            onChange={() => setData("fee_receipt_page_size", "Large")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_receipt_page_size', data?.fee_receipt_page_size)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='mb-5 text-[15px] font-medium font-primary text-headingLight'>Fee Receipt Copy</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex mb-5 gap-3">
                                                        <RadioInput
                                                            name="fee_receipt_copy"
                                                            value="Single"
                                                            checked={data?.fee_receipt_copy && data?.fee_receipt_copy === "Single"}
                                                            onChange={() => setData("fee_receipt_copy", "Single")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_receipt_copy"
                                                            value="Double"
                                                            checked={data?.fee_receipt_copy && data?.fee_receipt_copy === "Double"}
                                                            onChange={() => setData("fee_receipt_copy", "Double")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_receipt_copy', data?.fee_receipt_copy)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='mb-5 text-[15px] font-medium font-primary text-headingLight'>Auto Selected Installment</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="fee_is_installment_auto_selected"
                                                            value="On"
                                                            checked={data?.fee_is_installment_auto_selected && data?.fee_is_installment_auto_selected === "Yes"}
                                                            onChange={() => setData("fee_is_installment_auto_selected", "Yes")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_installment_auto_selected"
                                                            value="Off"
                                                            checked={data?.fee_is_installment_auto_selected && data?.fee_is_installment_auto_selected === "No"}
                                                            onChange={() => setData("fee_is_installment_auto_selected", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_installment_auto_selected', data?.fee_is_installment_auto_selected)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='mb-5 text-[15px] font-medium font-primary text-headingLight'>Select Installment Sequentially</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="select_installment_sequentialy"
                                                            value="On"
                                                            checked={data?.fee_is_installment_sequentially_selected && data?.fee_is_installment_sequentially_selected === "Yes"}
                                                            onChange={() => setData("fee_is_installment_sequentially_selected", "Yes")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_installment_sequentially_selected"
                                                            value="Off"
                                                            checked={data?.fee_is_installment_sequentially_selected && data?.fee_is_installment_sequentially_selected === "No"}
                                                            onChange={() => setData("fee_is_installment_sequentially_selected", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_installment_sequentially_selected', data?.fee_is_installment_sequentially_selected)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='mb-5 text-[15px] font-medium font-primary text-headingLight'>Force online payment up to the current month for students in online payment</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="fee_is_online_payment_up_to_the_current_month_for_students_forced"
                                                            value="On"
                                                            checked={data?.fee_is_online_payment_up_to_the_current_month_for_students_forced && data?.fee_is_online_payment_up_to_the_current_month_for_students_forced === "Yes"}
                                                            onChange={() => setData("fee_is_online_payment_up_to_the_current_month_for_students_forced", "Yes")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_is_online_payment_up_to_the_current_month_for_students_forced"
                                                            value="Off"
                                                            checked={data?.fee_is_online_payment_up_to_the_current_month_for_students_forced && data?.fee_is_online_payment_up_to_the_current_month_for_students_forced === "No"}
                                                            onChange={() => setData("fee_is_online_payment_up_to_the_current_month_for_students_forced", "No")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_online_payment_up_to_the_current_month_for_students_forced', data?.fee_is_online_payment_up_to_the_current_month_for_students_forced)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Fee Receipt Custom Instructions</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-input-field-styles">
                                                    <TextareaInput
                                                        id="fee_receipt_custom_instruction"
                                                        value={
                                                            data?.fee_receipt_custom_instruction
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "fee_receipt_custom_instruction",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.fee_receipt_custom_instruction
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_receipt_custom_instruction', data?.fee_receipt_custom_instruction)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Reg. Fee Receipt
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='my-5 maxSm:mb-0 text-[15px] font-medium font-primary text-headingLight'>Reg. Fee Receipt Page Size</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex my-5 gap-3">
                                                        <RadioInput
                                                            name="fee_reg_receipt_page_size"
                                                            value="Small"
                                                            checked={data?.fee_reg_receipt_page_size && data?.fee_reg_receipt_page_size === "Small"}
                                                            onChange={() => setData("fee_reg_receipt_page_size", "Small")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_reg_receipt_page_size"
                                                            value="Large"
                                                            checked={data?.fee_reg_receipt_page_size && data?.fee_reg_receipt_page_size === "Large"}
                                                            onChange={() => setData("fee_reg_receipt_page_size", "Large")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_reg_receipt_page_size', data?.fee_reg_receipt_page_size)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Reg. Fee Receipt Copy</h5>
                                            </div>
                                            <div className="md:col-span-4 col-span-10">
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="fee_reg_receipt_copy"
                                                            value="Single"
                                                            checked={data?.fee_reg_receipt_copy && data?.fee_reg_receipt_copy === "Single"}
                                                            onChange={() => setData("fee_reg_receipt_copy", "Single")}
                                                            className='my-5'
                                                        />
                                                        <RadioInput
                                                            name="fee_reg_receipt_copy"
                                                            value="Double"
                                                            checked={data?.fee_reg_receipt_copy && data?.fee_reg_receipt_copy === "Double"}
                                                            onChange={() => setData("fee_reg_receipt_copy", "Double")}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_reg_receipt_copy', data?.fee_reg_receipt_copy)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Receipt Number Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Fee Receipt number session wise</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex gap-3">
                                                                <RadioInput
                                                                    name="fee_is_receipt_number_session_wise_enabled"
                                                                    value="Yes"
                                                                    checked={ data?.fee_is_receipt_number_session_wise_enabled && data?.fee_is_receipt_number_session_wise_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_receipt_number_session_wise_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_receipt_number_session_wise_enabled"
                                                                    value="No"
                                                                    checked={data?.fee_is_receipt_number_session_wise_enabled && data?.fee_is_receipt_number_session_wise_enabled === "No"}
                                                                    onChange={() => setData("fee_is_receipt_number_session_wise_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_receipt_number_session_wise_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_receipt_number_session_wise_seed_no"
                                                                    value={
                                                                        data?.fee_receipt_number_session_wise_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_receipt_number_session_wise_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_receipt_number_session_wise_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_receipt_number_session_wise_enabled', data?.fee_is_receipt_number_session_wise_enabled, 'fee_receipt_number_session_wise_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Voucher Seed No</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex  gap-3">
                                                                <RadioInput
                                                                    name="fee_is_voucher_seed_no_enabled"
                                                                    value="Yes"
                                                                    checked={data?.fee_is_voucher_seed_no_enabled && data?.fee_is_voucher_seed_no_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_voucher_seed_no_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_voucher_seed_no_enabled"
                                                                    value="No"
                                                                    checked={data?.fee_is_voucher_seed_no_enabled && data?.fee_is_voucher_seed_no_enabled === "No"}
                                                                    onChange={() => setData("fee_is_voucher_seed_no_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_voucher_seed_no_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_voucher_seed_no"
                                                                    value={
                                                                        data.fee_voucher_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_voucher_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className=""
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_voucher_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_voucher_seed_no_enabled', data?.fee_is_voucher_seed_no_enabled, 'fee_voucher_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Registration Seed No</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex  gap-3">
                                                                <RadioInput
                                                                    name="fee_is_registration_seed_no_enabled"
                                                                    value="Yes"
                                                                    checked={data?.fee_is_registration_seed_no_enabled && data?.fee_is_registration_seed_no_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_registration_seed_no_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_registration_seed_no_enabled"
                                                                    value="No"
                                                                    checked={data?.fee_is_registration_seed_no_enabled && data?.fee_is_registration_seed_no_enabled === "No"}
                                                                    onChange={() => setData("fee_is_registration_seed_no_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_registration_seed_no_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_registration_seed_no"
                                                                    value={
                                                                        data.fee_registration_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_registration_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className=""
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_registration_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_registration_seed_no_enabled', data?.fee_is_registration_seed_no_enabled, 'fee_registration_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Refund Seed No</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex  gap-3">
                                                                <RadioInput
                                                                    name="fee_is_refund_seed_no_enabled"
                                                                    value="Yes"
                                                                    checked={data?.fee_is_refund_seed_no_enabled && data?.fee_is_refund_seed_no_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_refund_seed_no_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_refund_seed_no_enabled"
                                                                    value="No"
                                                                    checked={data?.fee_is_refund_seed_no_enabled && data?.fee_is_refund_seed_no_enabled === "No"}
                                                                    onChange={() => setData("fee_is_refund_seed_no_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_refund_seed_no_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_refund_seed_no"
                                                                    value={
                                                                        data.fee_refund_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_refund_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className=""
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_refund_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_refund_seed_no_enabled', data?.fee_is_refund_seed_no_enabled, 'fee_refund_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Transport Voucher Seed No</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex  gap-3">
                                                                <RadioInput
                                                                    name="fee_is_transport_voucher_seed_no_enabled"
                                                                    value="Yes"
                                                                    checked={data?.fee_is_transport_voucher_seed_no_enabled && data?.fee_is_transport_voucher_seed_no_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_transport_voucher_seed_no_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_transport_voucher_seed_no_enabled"
                                                                    value="No"
                                                                    checked={data?.fee_is_transport_voucher_seed_no_enabled && data?.fee_is_transport_voucher_seed_no_enabled === "No"}
                                                                    onChange={() => setData("fee_is_transport_voucher_seed_no_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_transport_voucher_seed_no_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_transport_voucher_seed_no"
                                                                    value={
                                                                        data.fee_transport_voucher_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_transport_voucher_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className=""
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_transport_voucher_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_transport_voucher_seed_no_enabled', data?.fee_is_transport_voucher_seed_no_enabled, 'fee_transport_voucher_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 gap-5 items-center mt-2">
                                            <div className="md:col-span-6 col-span-12">
                                                <h5 className='text-[15px] font-medium font-primary text-headingLight'>Enable Hostel Voucher Seed No</h5>
                                            </div>
                                            <div className="md:col-span-5 col-span-11">
                                                <div className="grid grid-cols-12 gap-5 items-center">
                                                    <div className="md:col-span-6 col-span-12">
                                                        <div className="educare-create-school-settings-list-check">
                                                            <div className="educare-radio-field-styles flex  gap-3">
                                                                <RadioInput
                                                                    name="fee_is_hostel_voucher_seed_no_enabled"
                                                                    value="Yes"
                                                                    checked={data.fee_is_hostel_voucher_seed_no_enabled === "Yes"}
                                                                    onChange={() => setData("fee_is_hostel_voucher_seed_no_enabled", "Yes")}
                                                                    className='my-5'
                                                                />
                                                                <RadioInput
                                                                    name="fee_is_hostel_voucher_seed_no_enabled"
                                                                    value="No"
                                                                    checked={data.fee_is_hostel_voucher_seed_no_enabled === "No"}
                                                                    onChange={() => setData("fee_is_hostel_voucher_seed_no_enabled", "No")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data?.fee_is_hostel_voucher_seed_no_enabled === "Yes" &&
                                                        <div className="md:col-span-6 col-span-12">
                                                            <div className="educare-input-field-styles ">
                                                                <TextInput
                                                                    id="fee_hostel_voucher_seed_no"
                                                                    value={
                                                                        data.fee_hostel_voucher_seed_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "fee_hostel_voucher_seed_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className=""
                                                                    placeHolder="Current Seed"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        customErrors.fee_hostel_voucher_seed_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 col-span-1">
                                                <div className="educare-list-action-btn text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Fee', 'fee_is_hostel_voucher_seed_no_enabled', data?.fee_is_hostel_voucher_seed_no_enabled, 'fee_hostel_voucher_seed_no')}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Fee Payment Gateway Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="md:col-span-5 col-span-12">
                                        <div className="educare-radio-field-styles flex my-5 maxSm:mb-0 gap-3">
                                            <RadioInput
                                                name="fee_is_payment_geteway_enabled"
                                                value="Enable Fee Payment Gateway"
                                                checked={data?.fee_is_payment_geteway_enabled && data?.fee_is_payment_geteway_enabled === "Yes"}
                                                onChange={() => setData("fee_is_payment_geteway_enabled", "Yes")}
                                                className='my-5'
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-5 col-span-12">
                                        <div className="educare-radio-field-styles flex my-5 maxSm:mb-0 gap-3">
                                            <RadioInput
                                                name="fee_is_payment_geteway_enabled"
                                                value="Disable Fee Payment Gateway"
                                                checked={data?.fee_is_payment_geteway_enabled && data?.fee_is_payment_geteway_enabled === "No"}
                                                onChange={() => setData("fee_is_payment_geteway_enabled", "No")}
                                                className='my-5'
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 col-span-12">
                                        <div className="educare-list-action-btn my-5 maxSm:mb-0 text-end maxSm:text-start">
                                            <button
                                                className="educare-success-btn-sm-fill"
                                                onClick={() => handelChecked('Fee', 'fee_is_payment_geteway_enabled', data?.fee_is_payment_geteway_enabled)}
                                                type="button"
                                            >
                                                <i className="icon-check-1"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        <h5 className="font-semibold">
                                            Select Payment Gateway Company
                                        </h5>
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <div className="educare-radio-field-styles flex my-5 maxSm:mb-0 gap-3">
                                            <RadioInput
                                                name="payment_gateway_name"
                                                value="Razorpay"
                                                checked={data?.payment_gateway_name && data?.payment_gateway_name === "razorpay"}
                                                onChange={() => setData("payment_gateway_name", "razorpay")}
                                                className='my-5'
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-6 col-span-12">
                                        <div className="educare-radio-field-styles flex my-5 maxSm:mb-0 gap-3">
                                            <RadioInput
                                                name="payment_gateway_name"
                                                value="Paytm"
                                                checked={data?.payment_gateway_name && data?.payment_gateway_name === "paytm"}
                                                onChange={() => setData("payment_gateway_name", "paytm")}
                                                className='my-5'
                                            />
                                        </div>
                                    </div>

                                    {data?.payment_gateway_name == 'razorpay' &&
                                        <>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="razorpay_key_id"
                                                                value="Razorpay Key ID"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="razorpay_key_id"
                                                        value={
                                                            data.razorpay_key_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "razorpay_key_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.razorpay_key_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="razorpay_key_secret"
                                                                value="Razorpay Key Secret"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="razorpay_key_secret"
                                                        value={
                                                            data.razorpay_key_secret
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "razorpay_key_secret",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.razorpay_key_secret
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {data?.payment_gateway_name == 'paytm' &&
                                        <>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="paytm_merchant_id"
                                                                value="Merchant ID"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="paytm_merchant_id"
                                                        value={
                                                            data.paytm_merchant_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "paytm_merchant_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.paytm_merchant_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="paytm_merchant_key"
                                                                value="Merchant Key"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="paytm_merchant_key"
                                                        value={
                                                            data.paytm_merchant_key
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "paytm_merchant_key",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.paytm_merchant_key
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="paytm_website"
                                                                value="Website"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="paytm_website"
                                                        value={
                                                            data.paytm_website
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "paytm_website",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.paytm_website
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="paytm_industry_type"
                                                                value="Industry Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="paytm_industry_type"
                                                        value={
                                                            data.paytm_industry_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "paytm_industry_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className=""
                                                        placeHolder=""
                                                    />
                                                    <InputError
                                                        message={
                                                            customErrors.paytm_industry_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    }

                                    <div className="col-span-12">
                                        <div className="educare-list-action-btn my-5">
                                            <button
                                                className="educare-success-btn-md-fill"
                                                onClick={(e) => handleSavePaymentGatewaySetting(e)}
                                                type="button"
                                            >
                                                Save
                                            </button>

                                            {data?.payment_gateway_name == 'razorpay' &&
                                                <button
                                                    className="ml-5 educare-success-btn-md-fill"
                                                    onClick={(e) => handleRazorpayTest(e)}
                                                    type="button">
                                                    Razorpay Test Payment
                                                </button>
                                            }

                                            {data?.payment_gateway_name == 'paytm' &&
                                                <button
                                                    className="ml-5 educare-success-btn-md-fill"
                                                    onClick={(e) => handlePaytmTest(e)}
                                                    type="button">
                                                    Paytm Test Payment
                                                </button>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Fee Fine Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="flex justify-between">
                                            <div className="row">
                                                <div className="col-12 col-md-3">
                                                    <h5 className="font-semibold">
                                                        Late Fee Payment Fine
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <div className="educare-input-field-styles my-5">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="fee_late_fine_type"
                                                                    value="Late Fine Type"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            data_label="Daily/Weekly/Monthly"
                                                            data={lateFineTypes}
                                                            value={
                                                                data?.fee_late_fine_type
                                                            }
                                                            onChange={(e) =>
                                                                setData('fee_late_fine_type', e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                customErrors.fee_late_fine_type
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <div className="educare-input-field-styles my-5">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="fee_late_fine_start_date"
                                                                    value="Fine Start Date"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            selected={fineStartDate}
                                                            onChange={(date) =>
                                                                setFineStartDate(date)
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
                                                            peekNextMonth
                                                            dropdownMode="select"
                                                            isClearable
                                                            dateFormat="dd/MM/yyyy"
                                                            placeholderText="(Enter Only Date)"
                                                            className="w-full"
                                                        />
                                                        <InputError
                                                            message={
                                                                customErrors.fee_late_fine_start_date
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <div className="educare-input-field-styles my-5">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="fee_late_fine_amount"
                                                                    value="Late Fine Amount"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="fee_late_fine_amount"
                                                            value={
                                                                data.fee_late_fine_amount
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "fee_late_fine_amount",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className=""
                                                            placeHolder=""
                                                        />
                                                        <InputError
                                                            message={
                                                                customErrors.fee_late_fine_amount
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="educare-list-action-btn my-5">
                                                        <button
                                                            className="educare-success-btn-md-fill"
                                                            onClick={(e) => handleLateFineApply(e)}
                                                            type="button"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p>
                                                <span className="font-semibold">Note: </span>
                                                If Partial Payment has been made in any installments, then late fine will not work in that installments, but only in the remaining installments which are completely due, late fine will work.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex justify-between">
                                            <div className="row">
                                                <div className="col-12 col-md-3">
                                                    <h5 className="font-semibold">
                                                        Fee Payment Cheque Bounce Fine
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-md-3">
                                                    <div className="educare-input-field-styles my-5">
                                                        <TextInput
                                                            id="fee_payment_cheque_bounce_fine"
                                                            value={
                                                                data.fee_payment_cheque_bounce_fine
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "fee_payment_cheque_bounce_fine",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className=""
                                                            placeHolder=""
                                                        />
                                                        <InputError
                                                            message={
                                                                customErrors.fee_payment_cheque_bounce_fine
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="educare-list-action-btn my-5">
                                                        <button
                                                            className="educare-success-btn-md-fill"
                                                            onClick={(e) => handleChequeBounceFineApply(e)}
                                                            type="button"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="flex flex-wrap justify-between items-center">
                                <h3><span className='font-bold text-headingLight'>Current Session :</span> {currentAcademicYear}</h3>
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                    type="button"
                                    onClick = {(e) => {
                                        handleAssignStudentFeeStructure(e)
                                    }}
                                >
                                    Assign Student Fee Structure
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-settting"></i>
                                    Account Setting
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-3">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="md:col-span-6 col-span-12">
                                        <h5 className='my-5 maxSm:mb-0 text-[15px] font-medium font-primary text-headingLight'>Fee Integrated with Account</h5>
                                    </div>
                                    <div className="md:col-span-4 col-span-10">
                                        <div className="educare-create-school-settings-list-check">
                                            <div className="educare-radio-field-styles flex my-5 gap-3">
                                                <RadioInput
                                                    name="account_is_fee_integrated"
                                                    value="On"
                                                    checked={data?.account_is_fee_integrated && data?.account_is_fee_integrated === "Yes"}
                                                    onChange={() => setData("account_is_fee_integrated", "Yes")}
                                                    className='my-5'
                                                />
                                                <RadioInput
                                                    name="account_is_fee_integrated"
                                                    value="Off"
                                                    checked={data?.account_is_fee_integrated && data?.account_is_fee_integrated === "No"}
                                                    onChange={() => setData("account_is_fee_integrated", "No")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 col-span-2">
                                        <div className="educare-list-action-btn my-5 text-end">
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
                            </div>
                        </div>
                    </div>

                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                <div className="educare-common-card-title col-span-10">
                                    <h5>
                                        <i className="icon-settting"></i>
                                        Fully Fee Paid Sms Template
                                    </h5>
                                </div>
                                <div className="md:col-span-2 col-span-2">
                                    <div className="educare-list-action-btn my-5 text-end">
                                        <button
                                            className="educare-success-btn-sm-fill"
                                            onClick={() => handelChecked('Fee', 'fee_fully_paid_sms_template', data?.fee_fully_paid_sms_template)}
                                            type="button"
                                        >
                                            <i className="icon-check-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="fully_fee_paid_sms_template"
                                                        value="Message Template"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="fee_fully_paid_sms_template"
                                                value={
                                                    data?.fee_fully_paid_sms_template
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "fee_fully_paid_sms_template",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    customErrors.fee_fully_paid_sms_template
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-12">
                                        <div className="educare-settings-tags flex items-center flex-wrap gap-1">
                                            <h6 className='text-[15px] font-semibold text-headingLight'>Available Tags :</h6>

                                            {templateTags?.length > 0 &&
                                                templateTags?.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        type='button'
                                                        className='badge info'
                                                        onClick={() => {
                                                            handleTagClick('fully-paid', item?.value);
                                                        }}
                                                    >{item?.title}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                <div className="educare-common-card-title col-span-10">
                                    <h5>
                                        <i className="icon-settting"></i>
                                        Partial Fee Paid Sms Template
                                    </h5>
                                </div>
                                <div className="md:col-span-2 col-span-2">
                                    <div className="educare-list-action-btn my-5 text-end">
                                        <button
                                            className="educare-success-btn-sm-fill"
                                            onClick={() => handelChecked('Fee', 'fee_partial_paid_sms_template', data?.fee_partial_paid_sms_template)}
                                            type="button"
                                        >
                                            <i className="icon-check-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="partial_fee_paid_sms_template"
                                                        value="Message Template"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="fee_partial_paid_sms_template"
                                                value={
                                                    data?.fee_partial_paid_sms_template
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "fee_partial_paid_sms_template",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    customErrors.fee_partial_paid_sms_template
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-settings-tags flex items-center flex-wrap gap-1">
                                            <h6 className='text-[15px] font-semibold text-headingLight'>Available Tags :</h6>
                                            {templateTags?.length > 0 &&
                                                templateTags?.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        type='button'
                                                        className='badge info'
                                                        onClick={() => {
                                                            handleTagClick('partial-paid', item?.value);
                                                        }}
                                                    >{item?.title}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mt-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                <div className="educare-common-card-title col-span-10">
                                    <h5>
                                        <i className="icon-settting"></i>
                                        Fee Due Sms Template
                                    </h5>
                                </div>
                                <div className="md:col-span-2 col-span-2">
                                    <div className="educare-list-action-btn text-end">
                                        <button
                                            className="educare-success-btn-sm-fill"
                                            onClick={() => handelChecked('Fee', 'fee_due_sms_template', data?.fee_due_sms_template)}
                                            type="button"
                                        >
                                            <i className="icon-check-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5 maxSm:gap-2.5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="fee_due_sms_template"
                                                        value="Message Template"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="fee_due_sms_template"
                                                value={
                                                    data?.fee_due_sms_template
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "fee_due_sms_template",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    customErrors.fee_due_sms_template
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-settings-tags flex items-center flex-wrap gap-1">
                                            <h6 className='text-[15px] font-semibold text-headingLight'>Available Tags :</h6>
                                            {templateTags?.length > 0 &&
                                                templateTags?.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        type='button'
                                                        className='badge info'
                                                        onClick={() => {
                                                            handleTagClick('due', item?.value);
                                                        }}
                                                    >{item?.title}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FeeSettings;

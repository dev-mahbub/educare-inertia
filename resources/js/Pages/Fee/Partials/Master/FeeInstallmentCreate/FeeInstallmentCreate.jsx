import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function FeeInstallmentCreate() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());
    const [lastPaymentDate, setLastPaymentDate] = useState();

    const { data, setData, errors, post, reset, processing } = useForm({
        Installment_no: "",
        title: "",
        is_admission_installment: "",
        description: "",
        start_date: "",
        end_date: "",
        last_pay_date: "",
        monthly: "",
        quarterly: "",
        half_yearly: "",
        yearly: "",
        last_payment_date: "",
        admission_installment: "",
    });

    const handleFeeInstallmentData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    {/* <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New Installment
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFeeInstallmentData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="Installment_no"
                                                                value="Installment No"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="Installment_no"
                                                        value={
                                                            data.Installment_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "Installment_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.Installment_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-8">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={data.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeHolder="eg:JAN-2015"
                                                    />
                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="start_date"
                                                                value="Start Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        placeholderText="Start date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="end_date"
                                                                value="End Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) =>
                                                            setEndDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        placeholderText="End date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="last_pay_date"
                                                                value="Last Pay Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={lastDate}
                                                        onChange={(date) =>
                                                            setLastDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        placeholderText="Last Pay date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="translate-y-[-1px] inline-block">
                                                        <Checkbox
                                                            id="is_admission_installment"
                                                            name="is_admission_installment"
                                                            checked={
                                                                data.is_admission_installment
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_admission_installment",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_admission_installment"
                                                            value="Is Admission Installment"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton className="educare-gray-btn-lg-stroke">
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton className="educare-primary-btn-lg-fill">
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="lg:col-span-12 xl:col-span-6  col-span-12">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Create fee installment
                            </h5>
                        </div>
                        <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list pb-2">
                                    <h5 className="text-gray-500">
                                        Create fee installment in just one click
                                    </h5>
                                </div>
                                <div className="educare-create-school-settings-list-check">
                                    <div className="educare-radio-field-styles flex gap-3 p-2">
                                        <RadioInput
                                            name="month_type"
                                            value="Monthly (12 installment)"
                                            checked={
                                                data.month_type === "monthly"
                                            }
                                            onChange={() =>
                                                setData("month_type", "monthly")
                                            }
                                        />
                                    </div>
                                    <div className="educare-radio-field-styles flex gap-3 p-2">
                                        <RadioInput
                                            name="month_type"
                                            value="Quarterly (4 installment)"
                                            checked={
                                                data.month_type === "quarterly"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "month_type",
                                                    "quarterly"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-radio-field-styles flex gap-3 p-2">
                                        <RadioInput
                                            name="month_type"
                                            value="Half Yearly (4 installment)"
                                            checked={
                                                data.month_type ===
                                                "half_yearly"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "month_type",
                                                    "half_yearly"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-radio-field-styles flex gap-3 p-2">
                                        <RadioInput
                                            name="month_type"
                                            value="Yearly (1 installment)"
                                            checked={
                                                data.month_type === "yearly"
                                            }
                                            onChange={() =>
                                                setData("month_type", "yearly")
                                            }
                                        />
                                    </div>
                                    <div className="educare-radio-field-styles flex gap-3 p-2">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="admission_installment"
                                                    name="admission_installment"
                                                    checked={
                                                        data.admission_installment
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "admission_installment",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="admission_installment"
                                                    value="With Admission Installment"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-1 pt-2">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="last_payment_date"
                                                value="Last Payment Date of Month(Enter only Date)"
                                            />
                                            <DatePicker
                                                selected={lastPaymentDate}
                                                onChange={(date) =>
                                                    setLastPaymentDate(date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Last Payment date"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <p className="text-gray-500">
                                            <span className="text-red-600">
                                                Note :
                                            </span>{" "}
                                            <small>
                                                Don't fill if last payment date
                                                is month's last date
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <PrimaryButton
                                    className="educare-primary-btn-md-fill"
                                    type="submit"
                                >
                                    Create Installments
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

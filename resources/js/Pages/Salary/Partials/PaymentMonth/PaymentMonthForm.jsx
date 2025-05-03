import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from 'react';
import DatePicker from "react-datepicker";

const PaymentMonthForm = ({
    selectedItem,
    setSelectedItem,
    formMode,
    setFormMode
}) => {

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        clearErrors,
        processing
    } = useForm({
        title: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    useEffect(() => {
        if (selectedItem?.id != null) {
            setData(prevData => ({
                ...prevData,
                title: selectedItem.title,
                start_date: selectedItem.start_date ? new Date(selectedItem.start_date) : '',
                end_date: selectedItem.end_date ? new Date(selectedItem.end_date) : '',
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                title: "",
                start_date: new Date(),
                end_date: new Date()
            }));
        }
    }, [selectedItem]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    // handle save payment month start
    const handleSavePaymentMonth = (e) => {
        e.preventDefault();

        post(route('salary.payment_month.save'), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle save payment month end

    // handle update payment month start
    const handleUpdatePaymentMonth = (e) => {
        e.preventDefault();

        put(route('salary.payment_month.update', selectedItem?.id), {
            onSuccess: () => {
                handleReset();
            }
        });
    }
    // handle update payment month end

    // handle reset start
    const handleReset = () => {
        // router.get(route('salary.payment_month'));

        // reset();
        clearErrors();
        setSelectedItem({});
        setFormMode('create');

        setData(() => ({
            title: "",
            start_date: new Date(),
            end_date: new Date()
        }));
    }
    // handle reset end

    return (
        <>
            <div className="educare-class-form-box-wrapper">
                <div className="educare-create-school-details-form-wrap">
                    <div className="educare-card-title mb-[2px]">
                        <h5>
                            Add Payment Month
                        </h5>
                    </div>
                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                        <form onSubmit={handleAdmissionSourceData}>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
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
                                            value={
                                                data.title || ''
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.title
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
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
                                                selected={
                                                    data?.start_date && new Date(data?.start_date) || null
                                                }
                                                onChange={(date) =>
                                                    setData("start_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Start date"
                                                className="w-full"
                                            />
                                            <InputError
                                            message={
                                                errors.start_date
                                            }
                                            className="mt-2"
                                        />
                                        </div>
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
                                                selected={
                                                    data?.end_date && new Date(data?.end_date) || null
                                                }
                                                onChange={(date) =>
                                                    setData("end_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-full"
                                            />
                                            <InputError
                                            message={
                                                errors.end_date
                                            }
                                            className="mt-2"
                                        />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                        <PrimaryButton
                                            className="educare-gray-btn-lg-stroke"
                                            type="button"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </PrimaryButton>

                                        {formMode == 'create' &&
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleSavePaymentMonth}
                                            >
                                                Save
                                            </PrimaryButton>
                                        }

                                        {formMode == 'edit' &&
                                            <PrimaryButton
                                                className="educare-primary-btn-lg-fill"
                                                type="button"
                                                onClick={handleUpdatePaymentMonth}
                                            >
                                                Update
                                            </PrimaryButton>
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentMonthForm;

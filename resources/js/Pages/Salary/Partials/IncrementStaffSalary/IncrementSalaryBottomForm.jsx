import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import DatePicker from "react-datepicker";

const IncrementSalaryBottomForm = ({
    data,
    setData,
    errors,
    handleReset,
    handleSaveStaffSalaryIncrement
}) => {

    //set date in data
    const handleDateChange = (date) => {
        setData("increment_date", date);
    };

    return (
        <>
            <div className="educare-card-title mr-auto">
                <h5>
                    Increment
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-4 mb-2.5">
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Increment Date"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <DatePicker
                                    selected={data.increment_date || null}
                                    onChange={handleDateChange}
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select date"
                                    className="w-full"
                                />
                                <InputError
                                    message={
                                        errors.increment_date
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Increment Note"
                                        />
                                    </div>
                                </div>
                                <TextareaInput
                                    value={
                                        data.increment_note
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "increment_note",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.increment_note
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap justify-end gap-2.5 mt-2 ">
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="button"
                                    onClick={handleSaveStaffSalaryIncrement}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncrementSalaryBottomForm;

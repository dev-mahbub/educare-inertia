import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';

const PrintSalarySlipCard = ({
    paymentMonths
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        payment_month_id: "",
        is_with_office_copy: false,
    });

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-printer"></i>
                        Print Salary slip
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
                        <div className='max-w-[400px] min-w-[250px] maxXs:w-full'>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="payment_month_id"
                                            value="Required"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <SelectInput
                                    id="payment_month_id"
                                    data_label="Month"
                                    data={paymentMonths}
                                    value={
                                        data.payment_month_id
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "payment_month_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.payment_month_id
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="is_with_office_copy"
                                        name="is_with_office_copy"
                                        checked={
                                            data.is_with_office_copy
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "is_with_office_copy",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full ">
                                    <InputLabel
                                        htmlFor="is_with_office_copy"
                                        value="Select Office copy"
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            data.payment_month_id !== "" &&
                                <div>
                                    <a
                                        href={route('pdf_salary.salary_slips', data)}
                                        target="_blank"
                                        className="educare-primary-btn-md-fill"
                                    >
                                        Print
                                    </a>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintSalarySlipCard;

import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublishSalaryTopbar = ({
    paymentMonths,
    staffSalaryPayments,
    staffSalaryPaymentIds,
    setStaffSalaryPaymentIds
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
        staff_salary_payment_ids: staffSalaryPaymentIds
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            staff_salary_payment_ids: staffSalaryPaymentIds
        }));
    }, [staffSalaryPaymentIds]);

    // handle change payment month start
    const handleChangePaymentMonth = (value) => {
        setData((prevData) => ({
            ...prevData,
            payment_month_id: value
        }));

        setStaffSalaryPaymentIds([]);

        const form_data = {
            payment_month_id: value
        }

       handleFilterPaymentData(form_data);
    }
    // handle change payment month end

    // handle publish staff salary payment start
    const handlePublishStaffSalaryPayment = (e) => {
        e.preventDefault();

        if(data?.staff_salary_payment_ids?.length == 0) {
            toast.error('Please select at least one payment!', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('salary.publish.save'), {
                onSuccess: () => {
                    const form_data = {
                        payment_month_id: data?.payment_month_id
                    }

                    handleFilterPaymentData(form_data);
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'staff_salary_payment_ids') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });

                            break;
                        }
                    }

                    const form_data = {
                        payment_month_id: data?.payment_month_id
                    }

                    handleFilterPaymentData(form_data);
                }
            });
        }

    }
    // handle publish staff salary payment end

    // handle filter payment data start
    const handleFilterPaymentData = (form_data) => {
        router.post(route('salary.publish'), form_data);
    }
    // handle filter payment data end

    const CommonHeaderFilterTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Publish Salary
                </h5>
            </div>
            <form onSubmit={CommonHeaderFilterTopData} className="mb-2.5">
                <div className="educare-header-filter-topbar flex flex-wrap gap-2.5 items-center">
                    <div className="educare-header-filtar-bar-count mr-auto">
                        <span>Total: {staffSalaryPayments?.length}</span>
                    </div>
                    <div className="ml-auto whitespace-nowrap">
                        <div className="educare-select-field-styles">
                            <SelectInput
                                id="payment_month_id"
                                data_label="Month"
                                data={paymentMonths}
                                value={data.payment_month_id}
                                onChange={(e) =>
                                    handleChangePaymentMonth(e.target.value)
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.payment_month_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {/* Replace changable buttons */}
                        <div>
                            <Tooltip title="publish" placement="top" arrow>
                                <button
                                    type="button"
                                    className="educare-secondary-btn-md-fill"
                                    onClick={handlePublishStaffSalaryPayment}
                                >
                                    Publish
                                </button>
                            </Tooltip>
                        </div>

                        {/* Replace changable buttons */}
                    </div>
                </div>
            </form>
        </>
    );
};

export default PublishSalaryTopbar;

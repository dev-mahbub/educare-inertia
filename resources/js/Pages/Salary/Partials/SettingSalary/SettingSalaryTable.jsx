import RadioInput from "@/Components/RadioInput";
import { router, useForm } from "@inertiajs/react";

const SettingSalaryTable = ({
    siteSettings
}) => {

    const {
        data,
        setData
    } = useForm({
        account_is_salary_integrated: siteSettings.account_is_salary_integrated ?? '',
        account_is_leave_deduction_on_gross_pay: siteSettings.account_is_leave_deduction_on_gross_pay ?? ''
    });

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
        // <form onSubmit={handleRegistrationSettingData}>
        <form>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-settting"></i>
                            Account Setting
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>
                                                    Salary Integrated with
                                                    Account
                                                </h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="account_is_salary_integrated"
                                                                value="Yes"
                                                                checked={
                                                                    data.account_is_salary_integrated ==
                                                                    "Yes"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "account_is_salary_integrated",
                                                                        "Yes"
                                                                    )
                                                                }
                                                            />
                                                            <RadioInput
                                                                name="account_is_salary_integrated"
                                                                value="No"
                                                                checked={
                                                                    data.account_is_salary_integrated ==
                                                                    "No"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "account_is_salary_integrated",
                                                                        "No"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        type="button"
                                                        onClick={() => handelChecked('Account', 'account_is_salary_integrated', data?.account_is_salary_integrated)}
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
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-create-school-settings-list">
                                            <div className="educare-create-school-settings-list-title">
                                                <h6>
                                                Leave deduction based on Gross Pay
                                                </h6>
                                            </div>
                                            <div className="educare-create-school-settings-list-check">
                                                <div className="educare-input-field-stylesr">
                                                    <div className="educare-create-school-settings-list-check">
                                                        <div className="educare-radio-field-styles flex gap-3">
                                                            <RadioInput
                                                                name="account_is_leave_deduction_on_gross_pay"
                                                                value="Yes"
                                                                checked={
                                                                    data.account_is_leave_deduction_on_gross_pay ==
                                                                    "Yes"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "account_is_leave_deduction_on_gross_pay",
                                                                        "Yes"
                                                                    )
                                                                }
                                                            />
                                                            <RadioInput
                                                                name="account_is_leave_deduction_on_gross_pay"
                                                                value="No"
                                                                checked={
                                                                    data.account_is_leave_deduction_on_gross_pay ==
                                                                    "No"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "account_is_leave_deduction_on_gross_pay",
                                                                        "No"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 col-span-2">
                                                <div className="educare-list-action-btn my-5 text-end">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        type="button"
                                                        onClick={() => handelChecked('Account', 'account_is_leave_deduction_on_gross_pay', data?.account_is_leave_deduction_on_gross_pay)}
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
                </div>
            </div>
        </form>
    );
};

export default SettingSalaryTable;

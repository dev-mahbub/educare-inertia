import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';

const IncrementSalaryTopForm = ({
    data,
    setData,
    errors,
    staffs
}) => {

    // handle change staff start
    const handleChangeStaff = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: value
        }));

        const form_data = {
            staff_id: value
        }

        router.post(route('salary.increment_staff_salary'), form_data);
    }
    // handle change staff end

    return (
        <>
            <div className="educare-card-title mr-auto">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Increment Staff Salary
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 mb-2.5">
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Staff"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <SelectInput
                                data_label="Staff"
                                data={staffs}
                                value={
                                    data.staff_id
                                }
                                onChange={(e) =>
                                    handleChangeStaff(e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.staff_id
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Current Basic"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                value={
                                    data.basic_amount
                                }
                                onChange={(e) =>
                                    setData(
                                        "basic_amount",
                                        e.target.value
                                    )
                                }
                                placeHolder="0"
                                disabled={true}
                                className={`block disabled`}
                            />
                            <InputError
                                message={
                                    errors.basic_amount
                                }
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Increment Type"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <SelectInput
                                data_label=""
                                data={[]}
                                value={
                                    data.increament_type
                                }
                                onChange={(e) =>
                                    setData(
                                        "increament_type",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.increament_type
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Increment Value"
                                    />
                                    <sup>*</sup>
                                </div>
                            </div>
                            <TextInput
                                value={data.increment_value}
                                onChange={(e) =>
                                    setData(
                                        "increment_value",
                                        e.target.value
                                    )
                                }
                                placeHolder={"Increament(Flat)"}
                                disabled={true}
                                className={`block ${data.select_Current_basic ? 'enabled' : 'disabled'}`}
                            />
                            <InputError
                                message={
                                    errors.increment_value
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Basic Pay"
                                    />
                                </div>
                            </div>
                            <TextInput
                                value={
                                    data.basic_pay
                                }
                                onChange={(e) =>
                                    setData(
                                        "basic_pay",
                                        e.target.value
                                    )
                                }
                                placeHolder="10000"
                                disabled={true}
                                className={`block ${data.select_Current_basic ? 'enabled' : 'disabled'}`}
                            />
                            <InputError
                                message={
                                    errors.basic_pay
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <div className="educare-input-field-styles-label-wrap">
                                <div className="educare-input-field-styles-label">
                                    <InputLabel
                                        value="Grade Pay"
                                    />
                                </div>
                            </div>
                            <TextInput
                                value={
                                    data.grade_pay
                                }
                                onChange={(e) =>
                                    setData(
                                        "grade_pay",
                                        e.target.value
                                    )
                                }
                                placeHolder="0"
                                disabled={true}
                                className={`block ${data.select_Current_basic ? 'enabled' : 'disabled'}`}
                            />
                            <InputError
                                message={
                                    errors.grade_pay
                                }
                                className="mt-2"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncrementSalaryTopForm;

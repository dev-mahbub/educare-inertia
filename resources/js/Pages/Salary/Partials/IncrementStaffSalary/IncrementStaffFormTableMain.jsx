import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EarningsIncreamentTable from './EarningsIncreamentTable';
import IncrementHistoryTable from './IncrementHistoryTable';
import IncrementSalaryBottomForm from './IncrementSalaryBottomForm';
import IncrementSalaryTopForm from './IncrementSalaryTopForm';

const IncrementStaffFormTableMain = ({
    staffs,
    staffEarning,
    staff,
    incrementTypes,
    staffSalaryIncrements
}) => {

    const [selectedStaff, setSelectedStaff] = useState({});
    const [earningData, setEarningData] = useState([]);
    const [totalEarning, setTotalEarning] = useState(0);
    const [staffSalaryIncrementData, setStaffSalaryIncrementData] = useState([]);

    //form validation
    const {
        data,
        setData,
        errors,
        post,
        reset,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        staff_id: "",
        basic_amount: "",
        earnings: earningData,
        increment_date: new Date(),
        increment_note: ""
    });

    useEffect(() => {
        setSelectedStaff(staff ?? {});
    }, [staff]);

    useEffect(() => {
        if (selectedStaff?.id != null) {
            setData((prevData) => ({
                ...prevData,
                staff_id: selectedStaff?.id ?? ''
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                staff_id: prevData?.staff_id ?? ''
            }));
        }
    }, [selectedStaff]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            basic_amount: (staffEarning?.basic_pay ?? 0) + (staffEarning?.grade_pay ?? 0),
            // basic_pay: staffEarning?.basic_pay ?? 0,
            // grade_pay: staffEarning?.grade_pay ?? 0
        }));

        setEarningData(staffEarning?.earnings?.map(item => ({
            earning_type_id: item?.earning_type_id,
            earning_type_title: item?.earning_type_title,
            // expression: item?.amount,
            expression: item?.expression,
            amount: item?.amount,
            increment_type: '',
            increment_value: '',
            increment_amount: '',
            // total_amount: item?.amount,
            total_amount: '',
        })) ?? []);
    }, [staffEarning]);

    useEffect(() => {
        setStaffSalaryIncrementData(staffSalaryIncrements);
    }, [staffSalaryIncrements]);

    useEffect(() => {
        // setTotalEarning((earningData?.reduce((total, item) => total + (item?.amount == '' ? 0 : parseInt(item?.amount)), 0) ?? 0) + (data?.basic_amount ?? 0));
        setTotalEarning((earningData?.reduce((total, item) => total + (item?.amount == '' ? 0 : parseInt(item?.amount)), 0) ?? 0));

        setData((prevData) => ({
            ...prevData,
            // earnings: earningData
            earnings: earningData?.filter(item => item?.increment_type != '' && item?.increment_value != '')
        }));
    }, [earningData, data?.basic_amount]);

    // handle change form value start
    const handleChangeFormValue = (index, field, value) => {
        const updatedData = [...earningData];

        if (field == 'increment_value') {
            const currentItem = updatedData[index];
            const amount = currentItem?.amount ?? 0;
            const incrementValue = isNaN(value) || value == '' ? '' : parseInt(value);
            let incrementAmount;

            if (currentItem.increment_type == 'Percentage') {
                incrementAmount = amount * (incrementValue / 100);
            } else {
                incrementAmount = incrementValue;
            }

            updatedData[index][field] = incrementValue;
            updatedData[index]['increment_amount'] = incrementAmount;
            updatedData[index]['total_amount'] = amount + incrementAmount;
        } else if (field == 'increment_type') {
            updatedData[index][field] = value;
            updatedData[index]['increment_value'] = '';
            updatedData[index]['increment_amount'] = '';
            // updatedData[index]['total_amount'] = updatedData[index]['amount'] ?? 0;
            updatedData[index]['total_amount'] = '';
        } else {
            updatedData[index][field] = value;
        }

        setEarningData(updatedData);
    }
    // handle change form value end

    // handle save staff salary increment start
    const handleSaveStaffSalaryIncrement = (e) => {
        e.preventDefault();

        post(route('salary.increment_staff_salary.save'), {
            onSuccess: () => {
                const form_data = {
                    staff_id: data?.staff_id
                }

                setData((prevData) => ({
                    ...prevData,
                    increment_date: new Date(),
                    increment_note: "",
                }));

                router.post(route('salary.increment_staff_salary'), form_data);
            },
            onError: () => {

            }
        });
    }
    // handle save staff salary increment end

    // handle reset start
    const handleReset = () => {
        clearErrors();

        setData((prevData) => ({
            ...prevData,
            staff_id: "",
            basic_amount: "",
            earnings: [],
            increment_date: new Date(),
            increment_note: "",
        }));

        setEarningData([]);
        setSelectedStaff({});
        setStaffSalaryIncrementData([]);
    }
    // handle reset end

    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                {/*Increment Staff Salary Left Side*/}
                <div className="col-span-12 lg:col-span-6">
                    <IncrementSalaryTopForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        staffs={staffs}
                    />
                    <EarningsIncreamentTable
                        errors={errors}
                        earningData={earningData}
                        incrementTypes={incrementTypes}
                        totalEarning={totalEarning}
                        handleChangeFormValue={handleChangeFormValue}
                    />
                    {/* code review deduction increament*/}

                    {/* <DeductionIncreamentTable
                        data={data}
                        setData={setData}
                        errors={errors}
                    /> */}

                    {/* code review deduction increament*/}

                    <IncrementSalaryBottomForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        handleReset={handleReset}
                        handleSaveStaffSalaryIncrement={handleSaveStaffSalaryIncrement}
                    />
                </div>

                {/*Increment Staff Salary Right Side*/}
                <div className="col-span-12 lg:col-span-6">
                    <IncrementHistoryTable
                        staffSalaryIncrementData={staffSalaryIncrementData}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default IncrementStaffFormTableMain;

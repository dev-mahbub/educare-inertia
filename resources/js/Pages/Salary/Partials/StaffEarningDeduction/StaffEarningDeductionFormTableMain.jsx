import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import StaffEarningDeductionDeductionTable from './StaffEarningDeductionDeductionTable';
import StaffEarningDeductionEarningsTable from './StaffEarningDeductionEarningsTable';
import StaffEarningDeductionForm from './StaffEarningDeductionForm';
import StaffEarningDeductionTable from './StaffEarningDeductionTable';

const StaffEarningDeductionFormTableMain = ({
    staffs,
    payScales,
    staffEarning,
    earningTypes,
    deductionTypes,
    staff
}) => {
    //total pay scale basic value
    const [basicAmount, setBasicAmount] = useState(0);
    const [gradeAmount, setGradeAmount] = useState(0);
    const [totalBasicValue, setTotalBasicValue] = useState(0);

    //total earning state data
    const [totalEarning, setTotalEarning] = useState(0);

    //total deduction state data
    const [totalDeduction, setTotalDeduction] = useState(0);

    // net salary
    const [netSalary, setNetSalary] = useState(0);

    const [earningData, setEarningData] = useState([]);
    const [deductionData, setDeductionData] = useState([]);

    const [earningFormFields, setEarningFormFields] = useState(earningTypes?.map(item => ({
        id: item?.id,
        title: item?.title,
        expression: '',
        description: '',
        amount: '',
        // is_selected: false,
        is_selected: item?.title == 'Basic',
    })));

    const [deductionFormFields, setDeductionFormFields] = useState(deductionTypes?.map(item => ({
        id: item?.id,
        title: item?.title,
        expression: '',
        description: '',
        amount: '',
        is_selected: false,
    })));

    const [selectedStaff, setSelectedStaff] = useState({});
    const [selectedPayScale, setSelectedPayScale] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm ({
        employee_id: "",
        staff_id: "",
        pay_scale_id: "",
        bank_account_no: "",
        bank_name: "",
        pf_account_number: "",
        uan: "",
        ifsc: "",
        basic_pay: 0,
        grade_pay: 0,
        net_salary: 0,
        earnings: earningData,
        deductions: deductionData
    });

    useEffect(() => {
        setSelectedStaff(staff ?? {});
    }, [staff]);

    useEffect(() => {
        if (selectedStaff?.id != null) {
            setData((prevData) => ({
                ...prevData,
                staff_id: selectedStaff?.id ?? '',
                bank_account_no: selectedStaff?.bank_account_no ?? "",
                bank_name: selectedStaff?.bank_name ?? "",
                pf_account_number: selectedStaff?.pf_account_number ?? "",
                uan: selectedStaff?.uan ?? "",
                ifsc: selectedStaff?.ifsc ?? ""
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                staff_id: prevData?.staff_id ?? '',
                bank_account_no: prevData?.bank_account_no ?? "",
                bank_name: prevData?.bank_name ?? "",
                pf_account_number: prevData?.pf_account_number ?? "",
                uan: prevData?.uan ?? "",
                ifsc: prevData?.ifsc ?? ""
            }));
        }
    }, [selectedStaff]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            pay_scale_id: selectedPayScale?.id ?? "",
            basic_pay: selectedPayScale?.basic_pay ?? 0,
            grade_pay: selectedPayScale?.grade_pay ?? 0,
            net_salary: selectedPayScale?.net_salary ?? 0
        }));

        setEarningData(selectedPayScale?.earnings ?? []);
        setDeductionData(selectedPayScale?.deductions ?? []);

        setEarningFormFields((prevData) => prevData?.map(item => {
            const selectedItem = selectedPayScale?.earnings?.find((earning) => earning?.earning_type_id == item?.id);

            return {
                id: item?.id,
                title: item?.title,
                expression: selectedItem?.expression ?? '',
                description: selectedItem?.description ?? '',
                amount: selectedItem?.amount ?? '',
                is_selected: selectedItem || item?.title == 'Basic' ? true : false,
            }
        }));

        setDeductionFormFields((prevData) => prevData?.map(item => {
            const selectedItem = selectedPayScale?.deductions?.find((deduction) => deduction?.deduction_type_id == item?.id);

            return {
                id: item?.id,
                title: item?.title,
                expression: selectedItem?.expression ?? '',
                description: selectedItem?.description ?? '',
                amount: selectedItem?.amount ?? '',
                is_selected: selectedItem ? true : false,
            }
        }));
    }, [selectedPayScale]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            pay_scale_id: staffEarning?.pay_scale_id ?? "",
            basic_pay: staffEarning?.basic_pay ?? 0,
            grade_pay: staffEarning?.grade_pay ?? 0,
            net_salary: staffEarning?.net_salary ?? 0
        }));

        setEarningData(staffEarning?.earnings ?? []);
        setDeductionData(staffEarning?.deductions ?? []);

        setEarningFormFields((prevData) => prevData?.map(item => {
            const selectedItem = staffEarning?.earnings?.find((earning) => earning?.earning_type_id == item?.id);

            return {
                id: item?.id,
                title: item?.title,
                expression: selectedItem?.expression ?? '',
                description: selectedItem?.description ?? '',
                amount: selectedItem?.amount ?? '',
                is_selected: selectedItem || item?.title == 'Basic' ? true : false,
            }
        }));

        setDeductionFormFields((prevData) => prevData?.map(item => {
            const selectedItem = staffEarning?.deductions?.find((deduction) => deduction?.deduction_type_id == item?.id);

            return {
                id: item?.id,
                title: item?.title,
                expression: selectedItem?.expression ?? '',
                description: selectedItem?.description ?? '',
                amount: selectedItem?.amount ?? '',
                is_selected: selectedItem ? true : false,
            }
        }));
    }, [staffEarning]);

    useEffect(() => {
        const basicPayValue = parseInt(data.basic_pay) || 0;
        const gradePayValue = parseInt(data.grade_pay) || 0;

        setTotalBasicValue(basicPayValue + gradePayValue);
        setBasicAmount(basicPayValue);
        setGradeAmount(gradePayValue);

        // earning data
        const updatedEarningData = [...earningFormFields];

        setEarningFormFields(updatedEarningData?.map(item => {
            if (item?.title == 'Basic') {
                const amount = basicPayValue + gradePayValue;

                return { ...item, amount: amount, is_selected: true };
            }

            return item;
        }));
    }, [data.basic_pay, data.grade_pay]);

    useEffect(() => {
        setEarningData(earningFormFields?.filter(item => item?.is_selected == true)?.map(item => ({
            earning_type_id: item?.id,
            expression: item?.expression ?? '',
            description: item?.description ?? '',
            amount: item?.amount ?? ''
        })));
    }, [earningFormFields]);

    useEffect(() => {
        setDeductionData(deductionFormFields?.filter(item => item?.is_selected == true)?.map(item => ({
            deduction_type_id: item?.id,
            expression: item?.expression ?? '',
            description: item?.description ?? '',
            amount: item?.amount ?? ''
        })));
    }, [deductionFormFields]);

    useEffect(() => {
        // setTotalEarning(earningData?.reduce((total, item) => total + (item?.amount == '' ? 0 : parseInt(item?.amount)), 0) + (basicAmount + gradeAmount));
        setTotalEarning(earningData?.reduce((total, item) => total + (item?.amount == '' ? 0 : parseInt(item?.amount)), 0));

        setData((prevData) => ({
            ...prevData,
            earnings: earningData
        }));
    }, [earningData, basicAmount, gradeAmount]);

    useEffect(() => {
        setTotalDeduction(deductionData?.reduce((total, item) => total + (item?.amount == '' ? 0 : parseInt(item?.amount)), 0));

        setData((prevData) => ({
            ...prevData,
            deductions: deductionData
        }));
    }, [deductionData]);

    useEffect(() => {
        // earning data
        const updatedEarningData = [...earningFormFields];

        setEarningFormFields(updatedEarningData?.map(item => {
            if (item?.title != 'Basic') {
                let amount = '';

                const input = String(item?.expression)?.replace('basic', basicAmount + gradeAmount);

                try {
                    amount = eval(input);
                } catch (error) {
                    amount = item['amount'] ?? '';
                }

                if (isNaN(amount)) {
                    amount = '';
                } else if (String(amount)?.includes('.')) {
                    amount = parseInt(String(amount)?.split('.')[0] ?? 0);
                }

                return { ...item, amount: amount };
            }

            return { ...item, is_selected: true };
        }));

        // deduction data
        const updatedDeductionData = [...deductionFormFields];

        setDeductionFormFields(updatedDeductionData?.map(item => {
            let amount = '';

            const input = String(item?.expression)?.replace('basic', basicAmount + gradeAmount);

            try {
                amount = eval(input);
            } catch (error) {
                amount = item['amount'] ?? '';
            }

            if (isNaN(amount)) {
                amount = '';
            } else if (String(amount)?.includes('.')) {
                amount = parseInt(String(amount)?.split('.')[0] ?? 0);
            }

            return { ...item, amount: amount };
        }));
    }, [basicAmount, gradeAmount]);


    useEffect(() => {
        setNetSalary(totalEarning - totalDeduction);
    }, [totalEarning, totalDeduction]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            net_salary: netSalary
        }));
    }, [netSalary]);


    // handle change form value start
    const handleChangeFormValue = (type, index, field, value) => {
        if (type == 'earning') {
            const updatedData = [...earningFormFields];

            if (field == 'expression') {
                let amount = '';

                const input = value.replace('basic', basicAmount + gradeAmount);

                try {
                    amount = eval(input);
                } catch (error) {
                    amount = updatedData[index]['amount'] ?? '';
                }

                if (isNaN(amount)) {
                    amount = '';
                } else if (String(amount)?.includes('.')) {
                    amount = parseInt(String(amount)?.split('.')[0] ?? 0);
                }

                updatedData[index]['amount'] = amount;
            }

            updatedData[index][field] = value;

            setEarningFormFields(updatedData);
        } else if (type == 'deduction') {
            const updatedData = [...deductionFormFields];

            if (field == 'expression') {
                let amount = '';

                const input = value.replace('basic', basicAmount + gradeAmount);

                try {
                    amount = eval(input);
                } catch (error) {
                    amount = updatedData[index]['amount'] ?? '';
                }

                if (isNaN(amount)) {
                    amount = '';
                } else if (String(amount)?.includes('.')) {
                    amount = parseInt(String(amount)?.split('.')[0] ?? 0);
                }

                updatedData[index]['amount'] = amount;
            }

            updatedData[index][field] = value;

            setDeductionFormFields(updatedData);
        }
    }
    // handle change form value end


    // handle save staff earning start
    const handleSaveStaffEarning = (e) => {
        e.preventDefault();

        post(route('salary.teacher_earning.save'), {
            onSuccess: () => {
                handleReset();
            },
            onError: () => {

            }
        });
    }
    // handle save staff earning end


    // handle reset start
    const handleReset = () => {
        clearErrors();

        setData((prevData) => ({
            ...prevData,
            employee_id: "",
            staff_id: "",
            pay_scale_id: "",
            bank_account_no: "",
            bank_name: "",
            pf_account_number: "",
            uan: "",
            ifsc: "",
            basic_pay: 0,
            grade_pay: 0,
            net_salary: 0
        }));

        setEarningData([]);
        setDeductionData([]);
        setSelectedStaff({});
        setSelectedPayScale({});

        setEarningFormFields(earningTypes?.map(item => ({
            id: item?.id,
            title: item?.title,
            expression: '',
            description: '',
            amount: '',
            // is_selected: false,
            is_selected: item?.title == 'Basic',
        })));

        setDeductionFormFields(deductionTypes?.map(item => ({
            id: item?.id,
            title: item?.title,
            expression: '',
            description: '',
            amount: '',
            is_selected: false,
        })));
    }
    // handle reset end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                {/*left side from*/}
                <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                    <StaffEarningDeductionForm
                        staffs={staffs}
                        payScales={payScales}
                        data={data}
                        setData={setData}
                        errors={errors}
                        setSelectedPayScale={setSelectedPayScale}
                    />

                    <StaffEarningDeductionEarningsTable
                        basicAmount={basicAmount}
                        gradeAmount={gradeAmount}
                        totalEarning={totalEarning}
                        earningFormFields={earningFormFields}
                        handleChangeFormValue={handleChangeFormValue}
                        errors={errors}
                    />

                    <StaffEarningDeductionDeductionTable
                        totalDeduction={totalDeduction}
                        totalEarning={totalEarning}
                        netSalary={netSalary}
                        handleReset={handleReset}
                        handleSaveStaffEarning={handleSaveStaffEarning}
                        deductionFormFields={deductionFormFields}
                        handleChangeFormValue={handleChangeFormValue}
                        errors={errors}
                    />
                </div>
                {/*right side list*/}
                <div className="col-span-12 xl:col-span-4 lg:col-span-4 hidden">
                    <StaffEarningDeductionTable />
                </div>
            </div>
        </>
    );
};

export default StaffEarningDeductionFormTableMain;

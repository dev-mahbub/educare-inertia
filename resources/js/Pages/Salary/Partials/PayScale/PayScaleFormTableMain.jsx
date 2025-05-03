import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PayScaleDeductionTable from './PayScaleDeductionTable';
import PayScaleEarningsTable from './PayScaleEarningsTable';
import PayScaleForm from './PayScaleForm';
import PayScaleTable from './PayScaleTable';

const PayScaleFormTableMain = ({
    earningTypes,
    deductionTypes,
    payScales
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

    const [selectedData, setSelectedData] = useState({});
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

    const [formMode, setFormMode] = useState('create');

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm ({
        title: "",
        description: "",
        basic_pay: 0,
        grade_pay: 0,
        net_salary: "",
        earnings: earningData,
        deductions: deductionData
    });

    useEffect(() => {
        if(selectedData?.id != null) {
            setData((prevData) => ({
                ...prevData,
                title: selectedData?.title ?? "",
                description: selectedData?.description ?? "",
                basic_pay: selectedData?.basic_pay ?? 0,
                grade_pay: selectedData?.grade_pay ?? 0,
                net_salary: selectedData?.net_salary ?? 0
            }));

            setEarningData(selectedData?.earnings ?? []);
            setDeductionData(selectedData?.deductions ?? []);

            setEarningFormFields((prevData) => prevData?.map(item => {
                const selectedItem = selectedData?.earnings?.find((earning) => earning?.earning_type_id == item?.id);

                return {
                    id: item?.id,
                    title: item?.title,
                    expression: selectedItem?.expression ?? '',
                    description: selectedItem?.description ?? '',
                    amount: selectedItem?.amount ?? '',
                    is_selected: selectedItem || item?.tile == 'Basic' ? true : false,
                }
            }));

            setDeductionFormFields((prevData) => prevData?.map(item => {
                const selectedItem = selectedData?.deductions?.find((deduction) => deduction?.deduction_type_id == item?.id);

                return {
                    id: item?.id,
                    title: item?.title,
                    expression: selectedItem?.expression ?? '',
                    description: selectedItem?.description ?? '',
                    amount: selectedItem?.amount ?? '',
                    is_selected: selectedItem ? true : false,
                }
            }));
        }
    }, [selectedData]);

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
            if(item?.title != 'Basic') {
                let amount = '';

                const input = item?.expression.replace('basic', basicAmount + gradeAmount);

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

            return {...item, is_selected: true};
        }));

        // deduction data
        const updatedDeductionData = [...deductionFormFields];

        setDeductionFormFields(updatedDeductionData?.map(item => {
            let amount = '';

            const input = item?.expression.replace('basic', basicAmount + gradeAmount);

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
        if(type == 'earning') {
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
        } else if(type == 'deduction') {
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


    // handle save payscale start
    const handleSavePayScale = (e) => {
        e.preventDefault();

        post(route('salary.pay_scale.save'), {
            onSuccess: () => {
                handleReset();
            },
            onError: () => {

            }
        });
    }
    // handle save payscale end

    // handle update payscale start
    const handleUpdatePayScale = (e) => {
        e.preventDefault();

        put(route('salary.pay_scale.update', selectedData?.id), {
            onSuccess: () => {
                handleReset();
            },
            onError: () => {

            }
        });
    }
    // handle update payscale end


    // handle reset start
    const handleReset = () => {
        setData((prevData) => ({
            ...prevData,
            title: "",
            description: "",
            basic_pay: 0,
            grade_pay: 0,
            net_salary: 0
        }));

        setEarningData([]);
        setDeductionData([]);
        setSelectedData({});

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

        setFormMode('create');
    }
    // handle reset end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                {/*left side from*/}
                <div className="col-span-12 xl:col-span-8 lg:col-span-8">
                    <PayScaleForm
                        data={data}
                        setData={setData}
                        errors={errors}
                    />

                    <PayScaleEarningsTable
                        basicAmount={basicAmount}
                        gradeAmount={gradeAmount}
                        totalEarning={totalEarning}
                        earningFormFields={earningFormFields}
                        handleChangeFormValue={handleChangeFormValue}
                        errors={errors}
                    />

                    <PayScaleDeductionTable
                        totalDeduction={totalDeduction}
                        totalEarning={totalEarning}
                        netSalary={netSalary}
                        handleReset={handleReset}
                        handleSavePayScale={handleSavePayScale}
                        deductionFormFields={deductionFormFields}
                        handleChangeFormValue={handleChangeFormValue}
                        errors={errors}
                        formMode={formMode}
                        handleUpdatePayScale={handleUpdatePayScale}
                    />
                </div>
                {/*right side list*/}
                <div className="col-span-12 xl:col-span-4 lg:col-span-4">
                    <PayScaleTable
                        payScales={payScales}
                        setSelectedData={setSelectedData}
                        setFormMode={setFormMode}
                        handleReset={handleReset}
                    />
                </div>
            </div>
        </>
    );
};

export default PayScaleFormTableMain;

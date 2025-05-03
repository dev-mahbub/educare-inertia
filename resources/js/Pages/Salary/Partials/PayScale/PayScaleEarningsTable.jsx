import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

const PayScaleEarningsTable = ({
    basicAmount,
    gradeAmount,
    totalEarning,
    earningFormFields,
    handleChangeFormValue,
    errors
}) => {

    // const [totalPercentage, setTotalPercentages] = useState(0);

    // const {
    //     data,
    //     setData,
    //     errors,
    //     post,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     //checkbox
    //     pf_check: "",
    //     ta_check: "",
    //     esi_check: "",
    //     hra_check: "",
    //     abcd_check: "",
    //     the_belt_check: "",
    //     salary_check: "",
    //     transport_check: "",

    //     //basic
    //     basic_amount: "",
    //     //PF
    //     pf_expression: "",
    //     pf_description: "",
    //     pf_amount: "",

    //     //ESI
    //     esi_expression: "",
    //     esi_description: "",
    //     esi_amount: "",
    //     //TA
    //     ta_expression: "",
    //     ta_description: "",
    //     ta_amount: "",
    //     //hra
    //     hra_expression: "",
    //     hra_description: "",
    //     hra_amount: "",
    //     //abcd
    //     abcd_expression: "",
    //     abcd_description: "",
    //     abcd_amount: "",
    //     //the belt
    //     the_belt_expression: "",
    //     the_belt_description: "",
    //     the_belt_amount: "",
    //     //salary
    //     salary_expression: "",
    //     salary_description: "",
    //     salary_amount: "",
    //     //transport
    //     transport_expression: "",
    //     transport_description: "",
    //     transport_amount: "",
    // });

    // useEffect(() => {
    //     if (data.pf_check) {
    //         let total = 0;

    //         if (data.pf_expression === 'basic') {
    //             total = basicAmount;
    //         } else if (data.pf_expression.includes('basic*')) {
    //             const [_, percentage] = data.pf_expression.split('*');
    //             const [numerator, denominator] = percentage.split('/');
    //             total = basicAmount * (parseFloat(numerator) / parseFloat(denominator) || 0);
    //         } else {
    //             total = parseFloat(data.pf_expression) || 0;
    //         }

    //         total = isFinite(total) ? total : 0;

    //         setTotalPercentages(total);
    //         setTotalEarning(total);
    //     } else {
    //         setTotalEarning(0);
    //     }
    // }, [data.pf_check, data.pf_expression, basicAmount]);

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4} className="text-center">Earnings</th>
                        </tr>
                        <tr>
                            <th>

                            </th>
                            <th>Earning Type</th>
                            <th>Expression</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*basic start*/}
                        {/* <tr>
                            <td colSpan={3} className="font-semibold text-center">Basic</td>
                            <td>
                                <div className="educare-input-field-styles px-2.5">
                                    <TextInput
                                        value={
                                            basicAmount + gradeAmount
                                        }
                                        // onChange={(e) =>
                                        //     setData(
                                        //         "basic_amount",
                                        //         e.target.value
                                        //     )
                                        // }
                                        placeHolder='0'
                                        disabled={true}
                                        className={`block`}
                                    />
                                </div>
                            </td>
                        </tr> */}
                        {/*basic end*/}


                        {earningFormFields?.length > 0 &&
                            earningFormFields.map((item, index) => (
                                item?.title == 'Basic' ?
                                    <tr key={index}>
                                        <td colSpan={3} className="font-semibold text-center">Basic</td>
                                        <td>
                                            <div className="educare-input-field-styles px-2.5">
                                                <TextInput
                                                    value={
                                                        item?.amount
                                                    }
                                                    placeHolder='0'
                                                    disabled={true}
                                                    className={`block`}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                 :
                                    <tr key={index}>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        name="pf_check"
                                                        checked={
                                                            item?.is_selected
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                'earning',
                                                                index,
                                                                "is_selected",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item?.title}</td>
                                        <td>
                                            <div className="educare-input-field-styles mb-2 px-2.5">
                                                <TextInput
                                                    value={
                                                        item?.expression
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeFormValue(
                                                            'earning',
                                                            index,
                                                            "expression",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Expression--ex. basic*45/100"
                                                />
                                                <InputError
                                                    message={
                                                        errors.expression
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles px-2.5">
                                                <TextInput
                                                    value={
                                                        item?.description
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeFormValue(
                                                            'earning',
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeHolder="Description  ex. 45 % of basic"
                                                />
                                                <InputError
                                                    message={
                                                        errors.description
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles px-2.5">
                                                <TextInput
                                                    value={
                                                        item?.amount

                                                    }
                                                    // onChange={(e) =>
                                                    //     handleChangeFormValue(
                                                    //         'earning',
                                                    //         index,
                                                    //         "amount",
                                                    //         e.target.value
                                                    //     )
                                                    // }
                                                    disabled={true}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                            ))
                        }

                        {/*total start*/}
                        <tr>
                            <td colSpan={3}><h5 className="font-bold text-headingLight">Total Earning</h5></td>
                            {/* <td><h5 className="font-bold text-headingLight">{grandTotalEarning.toFixed(2)}</h5></td> */}
                            <td><h5 className="font-bold text-headingLight">{totalEarning}</h5></td>
                        </tr>
                        {/*total end*/}

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PayScaleEarningsTable;

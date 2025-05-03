import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

const PayScaleDeductionTable = ({
    totalDeduction,
    totalEarning,
    netSalary,
    handleReset,
    handleSavePayScale,
    deductionFormFields,
    handleChangeFormValue,
    errors,
    formMode,
    handleUpdatePayScale
}) => {

    // const netSalary = grandTotalEarning - totalDeduction;
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
    //      //checkbox
    //      late_fine_check: "",
    //      pf_check: "",
    //      esic_check: "",
    //      working_days_check: "",
    //      transport_check: "",
    //      leave_deduction_check: "",

    //      //late fine
    //      late_fine_expression: "",
    //      late_fine_description: "",
    //      late_fine_amount: "",
    //      //pf
    //      pf_expression: "",
    //      pf_description: "",
    //      pf_amount: "",
    //      //esic
    //      esic_expression: "",
    //      esic_description: "",
    //      esic_amount: "",
    //      //working days
    //      working_days_expression: "",
    //      working_days_description: "",
    //      working_days_amount: "",
    //      //transport
    //      transport_expression: "",
    //      transport_description: "",
    //      transport_amount: "",
    //      //leave deduction
    //      leave_deduction_expression: "",
    //      leave_deduction_description: "",
    //      leave_deduction_amount: "",

    // });

    // useEffect(() => {
    //     if (data.late_fine_check) {
    //         let total = 0;

    //         if (data.late_fine_expression === 'basic') {
    //             total = basicAmount;
    //         } else if (data.late_fine_expression.includes('basic*')) {
    //             const [_, percentage] = data.late_fine_expression.split('*');
    //             const [numerator, denominator] = percentage.split('/');
    //             total = basicAmount * (parseFloat(numerator) / parseFloat(denominator)) || 0;
    //         } else {
    //             total = parseFloat(data.late_fine_expression) || 0;
    //         }
    //         total = isFinite(total) ? total : 0;
    //         setTotalPercentages(total);
    //         setTotalDeduction(total);

    //     } else {
    //         setTotalDeduction(0)
    //     }
    // }, [
    //     data.late_fine_check, data.late_fine_expression, basicAmount, setTotalDeduction
    // ]);

    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto my-5">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4} className="text-center">Deductions</th>
                        </tr>
                        <tr>
                            <th>

                            </th>
                            <th>Deduction Type</th>
                            <th>Expression</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {deductionFormFields?.length > 0 &&
                            deductionFormFields.map((item, index) => (
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
                                                            'deduction',
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
                                                        'deduction',
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
                                                        'deduction',
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
                                                //         'deduction',
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

                        {/*total deduction and net salary start*/}
                        <tr>
                            <td colSpan={3}><h5 className="font-bold text-headingLight">Total Deduction</h5></td>
                            <td><h5 className="font-bold text-headingLight">{totalDeduction}</h5></td>
                        </tr>
                        <tr>
                            <td colSpan={3}><h5 className="font-bold text-headingLight">Net Salary</h5></td>
                            {/* <td><h5 className="font-bold text-headingLight">{grandTotalEarning} - {totalDeduction} = {netSalary}</h5></td> */}
                            <td><h5 className="font-bold text-headingLight">{totalEarning} - {totalDeduction} = {netSalary}</h5></td>
                        </tr>
                        {/*total deduction and net salary end*/}
                    </tbody>
                </table>

            </div>
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
                        onClick={handleSavePayScale}
                    >
                        Save
                    </PrimaryButton>
                }

                {formMode == 'edit' &&
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                        type="button"
                        onClick={handleUpdatePayScale}
                    >
                        Update
                    </PrimaryButton>
                }
            </div>
        </>
    );
};

export default PayScaleDeductionTable;

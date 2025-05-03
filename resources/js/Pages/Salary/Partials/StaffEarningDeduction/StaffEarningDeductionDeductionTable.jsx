import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";


const StaffEarningDeductionDeductionTable = ({
    totalDeduction,
    totalEarning,
    netSalary,
    handleReset,
    handleSaveStaffEarning,
    deductionFormFields,
    handleChangeFormValue,
    errors
}) => {
    return (
        <>
            <div className="educare-default-table xs:overflow-x-auto my-5">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={4} className="text-center">Deductions</th>
                        </tr>
                        <tr>
                            <th></th>
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
                <PrimaryButton
                    className="educare-primary-btn-lg-fill"
                    type="button"
                    onClick={handleSaveStaffEarning}
                >
                    Save
                </PrimaryButton>
            </div>
        </>
    );
};

export default StaffEarningDeductionDeductionTable;

import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function DeductedAmount({
    data,
    setData,
    errors,
    totalAdvanceAmount,
    totalAdvanceDeductedAmount
}) {

    const totalAdvanceDueAmount = totalAdvanceAmount - totalAdvanceDeductedAmount;

    // handle change advance deducted amount start
    const handleAdvanceDeductedAmountChange = (value) => {
        let amount = 0;

        if (isNaN(amount) || value == '') {
            amount = 0;
        } else if (String(amount)?.includes('.')) {
            amount = parseInt(String(amount)?.split('.')[0] ?? 0);
        } else {
            amount = parseInt(value);
        }

        if (amount > totalAdvanceDueAmount) {
            amount = totalAdvanceDueAmount;
        }

        setData((prevData) => ({
            ...prevData,
            advance_deducted_amount: amount
        }));
    };
    // handle change advance deducted amount end

    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Advance Payment</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalAdvanceAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Deducted Advance Payment</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalAdvanceDeductedAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Advance Due</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalAdvanceDueAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Deduct Amount</h5>
                                    </td>
                                    <td>
                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data?.advance_deducted_amount
                                                    }
                                                    onChange={(e) =>
                                                        handleAdvanceDeductedAmountChange(e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.advance_deducted_amount
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

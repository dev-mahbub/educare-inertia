import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

export default function DueAmount({
    data,
    errors,
    totalPaidDueAmount,
    totalDueAmount,
    handlePaidDueAmountChange
}) {
    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Due</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalDueAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Paid Due</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalPaidDueAmount}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Pay Due</h5>
                                    </td>
                                    <td>
                                        <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={
                                                        data?.paid_due_amount
                                                    }
                                                    onChange={(e) =>
                                                        handlePaidDueAmountChange(e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.paid_due_amount
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

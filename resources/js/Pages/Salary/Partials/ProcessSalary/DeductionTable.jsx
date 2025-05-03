import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from '@mui/material';

export default function DeductionTable({
    errors,
    deductionData,
    handleAmountChange,
    totalDeductionAmount
}) {
    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2} className="text-center">Deduction</th>
                                </tr>
                                <tr>
                                    <th>Deduction Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deductionData?.map((deduction, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center">
                                                <span>{deduction?.deduction_type_title}</span>
                                                <span>
                                                    <Tooltip
                                                        title="Editable. You can edit this value"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="flex items-center"
                                                        >
                                                            {deduction?.is_editable &&
                                                                <i className="icon-DropHalf ml-[2px] text-[16px] text-dark"></i>
                                                            }
                                                        </button>
                                                    </Tooltip>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={deduction?.amount}
                                                        onChange={(e) =>
                                                            handleAmountChange('deduction', index, e.target.value)
                                                        }
                                                        className={`block ${!deduction?.is_editable && 'disabled'}`}
                                                        disabled={!deduction?.is_editable}
                                                    />
                                                    <InputError
                                                        message={errors[`deductions.${index}.amount`]}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Deduction</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalDeductionAmount}</h5>
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

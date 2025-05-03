import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Tooltip } from '@mui/material';

export default function EarningsTable({
    errors,
    earningData,
    handleAmountChange,
    totalEarningAmount
}) {
    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={2} className="text-center">Earnings</th>
                                </tr>
                                <tr>
                                    <th>Earning Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningData?.map((earning, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center">
                                                <span>{earning?.earning_type_title}</span>
                                                <span>
                                                    <Tooltip
                                                        title="Editable. You can edit this value"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                        className="flex items-center"
                                                        >
                                                            {earning?.is_editable &&
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
                                                        value={earning?.amount}
                                                        onChange={(e) =>
                                                            handleAmountChange('earning', index, e.target.value)
                                                        }
                                                        className={`block ${!earning?.is_editable && 'disabled'}`}
                                                        disabled= {!earning?.is_editable}
                                                    />
                                                    <InputError
                                                        message={errors[`earnings.${index}.amount`]}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <h5 className="font-bold text-headingLight">Total Earning</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalEarningAmount}</h5>
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

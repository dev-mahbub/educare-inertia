import InputError from "@/Components/InputError";
import SelectInput from '@/Components/SelectInput';
import TextInput from "@/Components/TextInput";

export default function EarningsIncreamentTable({
    errors,
    earningData,
    incrementTypes,
    totalEarning,
    handleChangeFormValue
}) {
    return (
        <>
            <div className="educare-classroom-form-area mb-5">
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan={5} className="text-center">Earnings</th>
                                </tr>
                                <tr>
                                    <th>Earning Type</th>
                                    <th>Expression/Amount</th>
                                    <th>Increament Type<span className="text-danger">*</span></th>
                                    <th>Hike</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earningData?.length > 0 &&
                                    earningData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.earning_type_title}</td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                               item?.amount
                                                            }
                                                            placeHolder="10000"
                                                            disabled={true}
                                                            className={`block disabled`}
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[`earnings.${index}.basic_amount`]
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label=""
                                                        data={incrementTypes}
                                                        value={
                                                            item?.increment_type
                                                        }
                                                        onChange={(e) =>
                                                            handleChangeFormValue(
                                                                index,
                                                                "increment_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors[`earnings.${index}.increment_type`]
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                item?.increment_value
                                                            }
                                                            onChange={(e) =>
                                                                handleChangeFormValue(
                                                                    index,
                                                                    "increment_value",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeHolder=""
                                                            className={`block ${item?.increment_type ? '' : 'disabled'}`}
                                                            disabled={item?.increment_type ? false : true}
                                                        />
                                                        <InputError
                                                            message={
                                                                errors[`earnings.${index}.increment_value`]
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="educare-input-field-styles-px-8 max-w-[100px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                item?.total_amount
                                                            }
                                                            placeHolder=""
                                                            disabled={true}
                                                            className={`block disabled`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <h5 className="font-bold text-headingLight">Total Earning</h5>
                                    </td>
                                    <td>
                                        <h5 className="font-bold text-headingLight">{totalEarning}</h5>
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

import InputError from "@/Components/InputError";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";

const BulkWalletList = ({
    loading,
    formFields,
    setFormFields,
    data,
    setData,
    errors
}) => {

    //copy amount
    const handleCopyDeductionAmount = () => {

        const copyAmount = data.deduction_amount_copy;

        const updatedData = formFields?.map(item => ({
            ...item,
            deduction_amount: copyAmount
        }));

        setFormFields(updatedData);
    }

    //copy description
    const handleCopyDescription = () => {
        const copyDescription = data.description_copy;

        const updatedData = formFields?.map(item => ({
            ...item,
            description: copyDescription
        }));

        setFormFields(updatedData);
    }

    // handle form change start
    const handleFormChange = (index, field, value) => {
        const updatedData = [...formFields];

        if (field == 'deduction_amount' && isNaN(value)) {
            value = '';
        }

        updatedData[index][field] = value;

        setFormFields(updatedData);
    }
    // handle form change end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Adm No.</th>
                                        <th>Roll No.</th>
                                        <th>Father Name</th>
                                        <th>Wallet Amount</th>
                                        <th>Deduction Amount</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={5}></td>
                                        <td>
                                            <div className="flex  gap-2">
                                                <div className="educare-input-field-styles-px-8 max-w-[200px]">
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={
                                                                data.deduction_amount_copy
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "deduction_amount_copy",
                                                                    isNaN(e.target.value) ? '' : e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.deduction_amount_copy
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <PrimaryButton
                                                    // disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                    onClick={handleCopyDeductionAmount}
                                                >
                                                    Copy
                                                </PrimaryButton>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex  gap-2">
                                                <div className="educare-input-field-styles w-9/12">
                                                    <TextInput
                                                        value={
                                                            data.description_copy
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description_copy",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description_copy
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <PrimaryButton
                                                    // disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                    onClick={handleCopyDescription}
                                                >
                                                    Copy
                                                </PrimaryButton>
                                            </div>
                                        </td>
                                    </tr>
                                    {formFields?.length > 0 ? (
                                        formFields?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                <td>{item?.admission_no}</td>
                                                <td>{item?.roll_no}</td>
                                                <td>{concatName(item?.father_first_name, item?.father_middle_name, item?.father_last_name)}</td>
                                                <td>{item?.wallet_amount}</td>
                                                <td>
                                                    <div className="flex  gap-2">
                                                        <div className="educare-input-field-styles-px-8 max-w-[200px]">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        item?.deduction_amount
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleFormChange(index,
                                                                            "deduction_amount",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.deduction_amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex  gap-2">
                                                        <div className="educare-input-field-styles w-full">
                                                            <TextInput
                                                                value={
                                                                    item?.description
                                                                }
                                                                onChange={(e) =>
                                                                    handleFormChange(index,
                                                                        "description",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.description
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BulkWalletList;

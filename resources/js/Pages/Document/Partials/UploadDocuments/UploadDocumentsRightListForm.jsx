import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";


export default function UploadDocumentsRightListForm({
    withDocumentMode,
    setWithDocumentMode,
    filteredCategories,
    withDocumentData,
    setWithDocumentData,
    withoutDocumentData,
    setWithoutDocumentData,
    teachers,
    errors,
    handleSaveDocument,
    withDocumentErrors,
    withoutDocumentErrors,
    setData
}) {

    // handle change with document data start
    const handleWithDocumentDataChange = (index, field, value) => {
        const updatedData = [...withDocumentData];

        updatedData[index][field] = value;

        setWithDocumentData(updatedData);
    }
    // handle change with document data end

    // handle change without document data start
    const handleWithoutDocumentDataChange = (index, field, value) => {
        const updatedData = [...withoutDocumentData];

        updatedData[index][field] = value;

        setWithoutDocumentData(updatedData);
    }
    // handle change without document data start

    //add with document field start
    const addWithDocumentFields = () => {
        setWithDocumentData([...withDocumentData,
            {
                // document_category: "",
                document_category_id: "",
                file: null
            }
        ]);
    }
    //add with document field end

    //remove with document specific field start
    const removeWithDocumentFields = (index) => {
        const remainingField = withDocumentData.filter((field, i) => i !== index);
        setWithDocumentData(remainingField)
    }
    //remove with document specific field end

    //add without document field start
    const addWithoutDocumentFields = () => {
        setWithoutDocumentData([...withoutDocumentData,
            {
                // document_category: "",
                document_category_id: "",
                document_no: "",
                issued_by: null,
                generated_for: "",
                notes: "",
                issued_date: "",
            }
        ]);
    }
    //add without document field end

    //remove without document specific field start
    const removeWithoutDocumentFields = (index) => {
        const remainingField = withoutDocumentData.filter((field, i) => i !== index);
        setWithoutDocumentData(remainingField)
    }
    //remove without document specific field end

    //toggle button without and with document
    const toggleDocumentMode = () => {
        setWithDocumentMode(!withDocumentMode);
        setData((prevData) => ({
            ...prevData,
            is_with_document: !withDocumentMode
        }));
    };

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="flex flex-wrap justify-between  mb-2">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-AddressBook"></i>
                            Upload queue
                        </h5>
                    </div>
                    <div className="flex gap-2">
                        <PrimaryButton
                            className="educare-secondary-btn-md-fill whitespace-nowrap"
                            onClick={toggleDocumentMode}
                        >
                            {withDocumentMode ? "Without Document" : "With Document"}
                        </PrimaryButton>
                        {withDocumentMode == false &&
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill whitespace-nowrap"
                                onClick={addWithoutDocumentFields}
                            >
                                <i className="icon-PlusCircle mr-1"></i>
                                Add
                            </PrimaryButton>
                        }
                        {withDocumentMode == true &&
                            <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill whitespace-nowrap"
                                onClick={addWithDocumentFields}
                            >
                                <i className="icon-PlusCircle mr-1"></i>
                                Add
                            </PrimaryButton>
                        }
                    </div>

                </div>
                {
                    withDocumentMode ? (
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Category
                                                <span className="text-danger">*</span>
                                            </th>
                                            <th>
                                                Uploaded File
                                                <span className="text-danger">*</span>
                                            </th>
                                            {/* <th>Status</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withDocumentData?.length > 0 ?
                                            withDocumentData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-input-field-styles mb-2">
                                                            <SelectInput
                                                                data={filteredCategories}
                                                                value={
                                                                    item?.document_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    handleWithDocumentDataChange(index, 'document_category_id', e.target.value)
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    withDocumentErrors[`documents.${index}.document_category_id`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles educare-input-type-file-styles mb-2">
                                                            <input
                                                                type="file"
                                                                name="file"
                                                                onChange={(e) =>
                                                                    handleWithDocumentDataChange(index, 'file', e.target.files[0])
                                                                }
                                                            />
                                                            <InputError
                                                                message={
                                                                    withDocumentErrors[`documents.${index}.file`] ?? ''
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </td>
                                                    {/* <td></td> */}
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>

                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => {
                                                                            removeWithDocumentFields(index)
                                                                        }}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                        )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="educare-input-field-notes my-2">
                                <ul><li>Notes: We suggest you to upload documents in google drive and link here for managing documents.</li></ul>
                            </div>
                            <div className="flex justify-end gap-2">
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-success-btn-md-fill"
                                    type="button"
                                    onClick={handleSaveDocument}
                                >
                                    <i className="icon-upload mr-1"></i>
                                    Upload
                                </PrimaryButton>
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-danger-btn-md-fill "
                                >
                                    <i className="icon-TrashSimple mr-1"></i>
                                    Remove
                                </PrimaryButton>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list pb-none">
                                    <table className="mb-2.5">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Category
                                                    <span className="text-danger">*</span>
                                                </th>
                                                <th>Document No</th>
                                                <th>Issued By</th>
                                                <th>Document Generated For</th>
                                                <th>
                                                    Notes
                                                    <p className="text-[12px] text-headingLight text-nowrap">(You can also add external drive link here)</p>
                                                </th>
                                                <th>Issue Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {withoutDocumentData?.length > 0 ?
                                                withoutDocumentData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-2">
                                                                <SelectInput
                                                                    data_label="Category"
                                                                    data={filteredCategories}
                                                                    value={item?.document_category_id}
                                                                    onChange={(e) => handleWithoutDocumentDataChange(index, "document_category_id", e.target.value)}
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        withoutDocumentErrors[`documents.${index}.document_category_id`] ?? ''
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        value={item?.document_no}
                                                                        onChange={(e) => handleWithoutDocumentDataChange(index, "document_no", e.target.value)}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles mb-2">
                                                                <SelectInput
                                                                    data_label="Teacher"
                                                                    data={teachers}
                                                                    value={item?.issued_by}
                                                                    onChange={(e) => handleWithoutDocumentDataChange(index, "issued_by", e.target.value)}
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors[`documents.${index}.issued_by`]
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        value={item?.generated_for}
                                                                        onChange={(e) => handleWithoutDocumentDataChange(index, "generated_for", e.target.value)}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        value={item?.notes}
                                                                        onChange={(e) => handleWithoutDocumentDataChange(index, "notes", e.target.value)}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-input-field-styles min-w-[130px] max-w-[150px]">
                                                                <DatePicker
                                                                    selected={item?.issued_date && new Date(item?.issued_date)}
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={false}
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className="w-full"
                                                                    onChange={(date) => handleWithoutDocumentDataChange(index, "issued_date", date)}
                                                                    placeholderText="Issue date"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Remove"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={() => removeWithoutDocumentFields(index)}

                                                                        >
                                                                            X
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div className="flex justify-end">
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill "
                                    type="button"
                                    onClick={handleSaveDocument}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </>
                    )
                }

            </div>

        </>
    );
}

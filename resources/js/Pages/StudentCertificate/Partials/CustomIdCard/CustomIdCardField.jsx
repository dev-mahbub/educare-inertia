import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";

export default function CustomIdCardField({
    data,
    setData,
    fieldsData,
    setFieldsData,
    selectedColumns,
    setSelectedColumns,
}) {
    // handle select fields start
    const handleCheckboxChange = (name, checked) => {
        const updatedData = {...fieldsData};

        updatedData[name]['is_selected'] = checked ? true : false;

        const total_selected = Object.keys(selectedColumns)?.length;

        if(checked) {
            const columnExists = Object.values(selectedColumns)?.find(item => item?.field_name == updatedData[name]?.field_name)?.field_name != null;
            if (!columnExists) {
                const selected_data = {
                    ...updatedData[name],
                    order: total_selected + 1,
                    is_with_backpage: false
                };

                const updatedColumns = [ ...selectedColumns, selected_data];

                setSelectedColumns(updatedColumns);
            }
        }
        else {
            const updatedColumns = Object.values(selectedColumns)?.filter(item => {
                if (item?.field_name == updatedData[name]?.field_name && !checked) {
                    return false;
                }

                return true;
            });

            setSelectedColumns(updatedColumns);
        }

        setFieldsData(updatedData);
    };
    // handle select fields end

    // hanlde backpage checkbox change start
    const handleBackPackChecked = (fieldName, checked) => {
        const updatedColumns = Object.values(selectedColumns)?.map(item =>
            item.field_name === fieldName ? { ...item, is_with_backpage: checked ? true : false } : item
        );

        setSelectedColumns(updatedColumns);
    };
    // hanlde backpage checkbox change end

    // handle reset selected columns start
    const handleResetSelectedColumns = (e) => {
        e.preventDefault();

        let updatedData = {};

        for (const key in fieldsData) {
            updatedData[key] = {
                field_name: fieldsData[key]?.field_name,
                label_name: fieldsData[key]?.label_name,
                is_selected: false,
            }
        }

        setFieldsData(updatedData);

        setSelectedColumns([]);
    }
    // handle reset selected columns end

    return (
        <div className="educare-classroom-form-area">
            <div className="grid grid-cols-12 gap-[20px]">
                <div className="lg:col-span-4 col-span-12">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title">
                            <h5>Select Fields</h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>
                                            <div className="flex flex-wrap justify-between items-center">
                                                <div>
                                                    <h5 className="text-headingLight font-bold">Fields</h5>
                                                </div>
                                                <div>
                                                    <Tooltip title="Reset" placement="top" arrow as="button">
                                                        <button
                                                            className="educare-gray-btn-md-fill"
                                                            type="button"
                                                            onClick={(e) => {
                                                                handleResetSelectedColumns(e)
                                                            }}
                                                        >
                                                            <i className="icon-ArrowsClockwise"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(fieldsData).length > 0 ? (
                                        Object.keys(fieldsData).map((key, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={key}
                                                                name={key}
                                                                checked={fieldsData[key]?.is_selected ?? false}
                                                                onChange={(e) => handleCheckboxChange(key, e.target.checked)}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={key}
                                                                value={fieldsData[key]?.field_name}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2}>Data not found</td>
                                        </tr>
                                    )}

                                    {/* {
                                        data?.audience_type?.toLowerCase() === 'student' ? (
                                            <>
                                                {sampleData.length > 0 ? (
                                                    sampleData.map(item => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={item.selectFieldName}
                                                                            name={item.selectFieldName}
                                                                            checked={item.checked}
                                                                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor={item.selectFieldName}
                                                                            value={item.fieldName}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={2}>Data not found</td>
                                                    </tr>
                                                )}
                                            </>
                                        ) : ''
                                    } */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-8 col-span-12">
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Selected Fields
                            </h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Field Name</th>
                                        <th>Label Name</th>
                                        <th>Order</th>
                                        {data?.is_with_backpage == true &&
                                            <th>For Backpage</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(selectedColumns)?.length > 0 ? (
                                        Object.values(selectedColumns)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.field_name}</td>
                                                <td>
                                                    <div className="educare-input-field-styles">
                                                        <TextInput
                                                            value={item.label_name}
                                                            onChange={(e) =>
                                                                setSelectedColumns(
                                                                    Object.values(selectedColumns)?.map(data =>
                                                                        data.field_name === item.field_name
                                                                            ? { ...data, label_name: e.target.value }
                                                                            : data
                                                                    )
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-small-width">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item.order}
                                                                onChange={(e) =>
                                                                    setSelectedColumns(
                                                                        Object.values(selectedColumns)?.map(data =>
                                                                            data.field_name === item.field_name
                                                                                ? { ...data, order: parseInt(e.target.value) || 0 } // Convert input value to number
                                                                                : data
                                                                        )
                                                                    )
                                                                }

                                                                className="block"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                {data?.is_with_backpage == true &&
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    name={item.key_name}
                                                                    checked={item.is_with_backpage ?? false}
                                                                    onChange={(e) =>
                                                                        handleBackPackChecked(item.field_name, e.target.checked)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center">No selected fields</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

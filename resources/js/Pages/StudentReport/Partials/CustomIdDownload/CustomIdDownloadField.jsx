import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomIdDownloadField({
    data,
    setData,
    errors,
    attributes
}) {
    const [attributesData, setAttributesData] = useState({});
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [orderBy, setOrderBy] = useState("");
    const [params, setParams] = useState({});

    useEffect(() => {
        let initialData = {};

        for (const key in attributes) {
            initialData[key] = false
        }

        setAttributesData(initialData);
    }, [attributes]);

    useEffect(() => {
        let selectedData = {};

        for (const key in attributesData) {
            if (attributesData[key] == true) {
                selectedData[key] = attributesData[key]
            }
        }

        setSelectedAttributes(selectedData);

        if (Object.keys(selectedData)?.length == 0) {
            setOrderBy("");
        }

        setData((prevData) => ({
            ...prevData,
            student_attributes: selectedData,
        }));
    }, [attributesData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            order_by: orderBy,
        }));
    }, [orderBy]);

    // set url params start
    useEffect(() => {
        setParams(() => {
            const updatedData = {};

            for (const key in data) {
                if (key == 'classroom_ids' || key == "class_name_ids" || key == "student_attributes") {
                    updatedData[key] = JSON.stringify(data[key]);
                }
                else {
                    updatedData[key] = data[key];
                }
            }

            return updatedData;
        });
    }, [data]);
    // set url params end

    // handle checkbox change start
    const handleCheckboxChange = (name, value) => {
        const updatedData = {
            ...attributesData,
            [name]: value,
        }

        if(orderBy == name && value == false) {
            setOrderBy("");
        }

        setAttributesData(updatedData);
    };
    // handle checkbox change end

    // handle download student details start
    const handleDownloadStudentDetails = (e) => {
        e.preventDefault();

        const hasChecked = Object.keys(attributesData)?.some(item => attributesData[item] == true);

        if (hasChecked) {
            const url = new URL(route('export_excel.student_details'));

            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key])
            });

            window.location.href = url;
        }
        else {
            toast.error("Please select at least one student attribute.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    }
    // handle download student details end

    // handle reset attributes start
    const handleResetAttributes = () => {
        let updatedData = {};

        for (const key in attributes) {
            updatedData[key] = false
        }

        setAttributesData(updatedData);
        setSelectedAttributes({});
        setOrderBy("");
    }
    // handle reset attributes end

    // handle change order by start
    const handleSelectOrderBy = (e, name) => {
        if (e.target.checked) {
            setOrderBy(name);
        }
        else {
            setOrderBy("");
        }
    }
    // handle change order by end

    // old code start
    // const handleCheckboxChange = (name, value) => {
    //     // If the checkbox is checked, set both the label value and the original value in the data state
    //     const labelValue = value ? getLabelValueByName(name) : "";
    //     setData({
    //         ...data,
    //         [`${name}_label`]: labelValue,
    //         [name]: value,
    //     });
    // };

    // const getLabelValueByName = (name) => {
    //     // You may want to customize this function based on your label requirements
    //     switch (name) {
    //         case "student_name":
    //             return "Student Name";
    //         case "admission_number":
    //             return "Admission Number";
    //         default:
    //             return "";
    //     }
    // };
    // old code end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-4 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    Select Column
                                </h5>
                            </div>
                            <div className="educare-default-table max-w-full">
                                <table className="min-width-full">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="flex flex-wrap justify-between items-center">
                                                    <div>
                                                        <h5 className="text-headingLight font-bold">Student's Attribute</h5>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Reset"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-gray-btn-md-fill"
                                                                onClick={() => {
                                                                    handleResetAttributes()
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
                                        {Object.keys(attributesData)?.length > 0 &&
                                            Object.keys(attributesData)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={item}
                                                                    name={item}
                                                                    checked={attributesData[item] ?? false}
                                                                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={item}
                                                                    value={attributes[item] ?? ""}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {/* <tr>
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="student_name"
                                                            name="student_name"
                                                            checked={data.student_name}
                                                            onChange={(e) => handleCheckboxChange("student_name", e.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="student_name"
                                                            value="Student Name"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="admission_number"
                                                            name="admission_number"
                                                            checked={data.admission_number}
                                                            onChange={(e) => handleCheckboxChange("admission_number", e.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="admission_number"
                                                            value="Admission Number"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="flex flex-wrap justify-between items-center mb-2">
                                <div className="educare-card-title">
                                    <h5>
                                        Selected Column
                                    </h5>
                                </div>
                                {
                                    data.classroom_ids?.length > 0 || data.class_name_ids?.length > 0 ?
                                        <PrimaryButton
                                            // disabled={processing}
                                            className="educare-primary-btn-md-fill"
                                            type="button"
                                            onClick={(e) => {
                                                handleDownloadStudentDetails(e);
                                            }}
                                        >
                                            DownLoad Student Details
                                        </PrimaryButton>
                                        : ""
                                }
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Student's Attribute</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(selectedAttributes)?.length > 0 &&
                                            Object.keys(selectedAttributes)?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {attributes[item] ?? ""}
                                                    </td>

                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`order_by_${item}`}
                                                                    name={`order_by_${item}`}
                                                                    checked={
                                                                        orderBy == item
                                                                    }
                                                                    onChange={(e) => {
                                                                            handleSelectOrderBy(e, item)
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={`order_by_${item}`}
                                                                    value="Order by"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                        {/* <tr>
                                            <td>
                                                {data.student_name_label}
                                            </td>

                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="order_by_one"
                                                            name="order_by_one"
                                                            checked={
                                                                data.order_by_one
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "order_by_one",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="order_by_one"
                                                            value="Order by"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
                                        {/* <tr>
                                            <td>
                                                {data.admission_number_label}
                                            </td>

                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="order_by_two"
                                                            name="order_by_two"
                                                            checked={
                                                                data.order_by_two
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "order_by_two",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="order_by_two"
                                                            value="Order by"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

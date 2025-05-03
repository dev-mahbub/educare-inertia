import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { myContext } from "../ConfigurationContextApi";


const ConfigurationStepTwo = ({
    classNames,
    exams,
    resultCardConfigurationLists,
    ruleTypes,
    boards
}) => {

    //use context api
    const {
        selectedBoard,
        setSelectedBoard,
        //
        setStepTwoFormData,
        //
        selectedClass,
        setSelectedClass,
        //
        selectedClassNameIds,
        setSelectedClassNameIds,
        customErrors,
        setFormMode,
        editableData,
        setEditableData,
        setSelectedRuleType
    } = useContext(myContext);


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        rule_type: "",
        attendance_type: "student_attendance",
        exam_id: "",
        board_id: selectedBoard?.id != null ? selectedBoard?.id : (boards[0]?.id ?? ""),
        class_name_ids: [],
        select_all_class: "",
        search: ""
    });

    useEffect(() => {
        setSelectedBoard(boards[0] ?? {});
    }, [boards]);

    // handle filter class names start
    const filteredClassNames = useMemo(() => {
        return classNames?.filter(item => {
            const inputText = data?.search?.toLowerCase().trim();
            const classNameTitle = item?.title?.toLowerCase();

            return classNameTitle && classNameTitle.includes(inputText);
        });
    }, [classNames, data?.search])
    // handle filter class names end


    useEffect(() => {
        setStepTwoFormData(data);
    }, [data]);

    useEffect(() => {
        const selectedData = resultCardConfigurationLists?.find(item => editableData?.id == item?.id);
        setEditableData(selectedData ?? {});
    }, [resultCardConfigurationLists]);


    useEffect(() => {
        if (Object.keys(editableData)?.length > 0) {
            const classNameIds = editableData?.class_names?.map(item => item?.id);

            if (editableData?.class_names && Object.keys(editableData?.class_names)?.length > 0) {
                setSelectedClass(editableData?.class_names?.map(item => item?.title));
            }
            else {
                setSelectedClass([]);
            }

            setSelectedClassNameIds(classNameIds);

            setData((prevData) => ({
                ...prevData,
                rule_type: editableData?.rule_type ?? "",
                attendance_type: editableData?.attendance_type ?? "student_attendance",
                exam_id: editableData?.exam_id ?? "",
                board_id: editableData?.board_id ?? selectedBoard?.id ?? "",
                class_name_ids: classNameIds ?? [],
                select_all_class: editableData?.select_all_class ?? "",
            }));
        }
    }, [editableData]);


    // handle rule type change start
    const handleRuleTypeChange = (e) => {
        setEditableData({});
        setSelectedClass([]);
        setSelectedClassNameIds([]);

        const rule_type = e.target.value;

        setSelectedRuleType(rule_type);

        const configuration = resultCardConfigurationLists?.find(item => item?.rule_type == rule_type);

        if(configuration) {
            setEditableData(configuration);
            setFormMode('edit');
        } else {
            setEditableData({});
            setFormMode('create');
        }

        setData(() => ({
            rule_type: rule_type,
            attendance_type: "student_attendance",
            exam_id: "",
            board_id: selectedBoard?.id ?? "",
            class_name_ids: [],
            select_all_class: "",
            search: ""
        }));
    }
    // handle rule type change end


    // handle select class start
    const setSelectedClassnameId = (id) => {
        if ([...selectedClassNameIds]?.includes(id)) {
            setSelectedClassNameIds((prevData) => prevData?.filter(item => item !== id));
        } else {
            setSelectedClassNameIds((prevData) => ([
                ...prevData,
                id
            ]));
        }
    }

    useEffect(() => {
        let select_all_class = false;
        if (selectedClassNameIds?.length <= 0) {
            select_all_class = false;
        }
        else {
            select_all_class = selectedClassNameIds?.length === classNames?.length;
        }

        setData((prevData) => ({
            ...prevData,
            select_all_class: select_all_class,
            class_name_ids: selectedClassNameIds,
        }));
    }, [selectedClassNameIds]);

    const handleCheckboxSelect = (name, value) => {
        let selectedClassCopy = [...selectedClass]; // Copy the existing array

        if (name === "select_all_class") {
            // If "Select All" is checked, set all items to the selectedClass array
            if (value) {
                setSelectedClass(classNames.map((item) => item?.title));
                setSelectedClassNameIds(classNames.map((item) => item?.id));
            } else {
                setSelectedClass([]); // If "Select All" is unchecked, clear the array
                setSelectedClassNameIds([]);
            }
        } else {
            // Update the selectedClass array based on the checkbox state
            if (value) {
                // selectedClassCopy.push(name.replace("_id_a", ""))
                selectedClassCopy.push(classNames?.find(item => item?.title?.toLowerCase() == name.replace("_id_a", ""))?.title ?? "")
            } else {
                selectedClassCopy = selectedClassCopy.filter(item => item.toLowerCase() != name.replace("_id_a", ""));
            }

            setSelectedClass([...new Set(selectedClassCopy)]);
        }
    };
    // handle select class end


    //handle check data
    const handleCheckData = () => {
        let newFormData = { ...data };
        let selectedClasses = [...selectedClass];

        // Set all class checkboxes to true in the form data
        classNames.forEach((item) => {
            const checkboxName = `${String(item).toLowerCase()}_id_a`;
            newFormData[checkboxName] = true;

            // Add class to selectedClasses if not already present
            if (!selectedClasses.includes(item)) {
                selectedClasses.push(item);
            }
        });

        // Update form data and selectedClass state
        setData(newFormData);
        setSelectedClass(selectedClasses);
    };


    const formDummyData = (e) => {
        e.preventDefault();
    };


    // hanlde edit configuration start
    const handleEditData = (data) => {
        setFormMode('edit')
        setSelectedRuleType(data?.rule_type)
        setEditableData(data)
    }
    // hanlde edit configuration end


    // handle delete configuration start
    const handleDeleteConfiguration = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("result_card.configuration.destroy", id), {
                    onSuccess: ({ props }) => {
                        handleReset();
                    }
                });
            }
        });
    }
    // handle delete configuration end

    // const handle reset start
    const handleReset = () => {
        setEditableData({});
        setSelectedRuleType("");
        setFormMode("create");
        setSelectedClassNameIds([]);
        setSelectedClass([]);
        reset();
    }
    // const handle reset end


    return (
        <>
            <div className="educare-parent-montly-income-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-4">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <form onSubmit={formDummyData}>
                                <div className="educare-common-card">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="rule_type"
                                                    value="Select Report Templates"
                                                />
                                                <SelectInput
                                                    id="rule_type"
                                                    data_label="Template"
                                                    data={ruleTypes}
                                                    value={data.rule_type || ""}
                                                    onChange={(e) =>
                                                        handleRuleTypeChange(e)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={customErrors.rule_type}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="search"
                                                    value="Search Classes"
                                                />
                                                <TextInput
                                                    id="search"
                                                    value={
                                                        data?.search
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "search",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.search}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* checkbox */}

                                    <div className="grid grid-cols-12 gap-5 mt-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_class"
                                                        name="select_all_class"
                                                        checked={
                                                            data.select_all_class
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="select_all_class"
                                                        value="Select All"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {filteredClassNames.map((item, index) => (
                                            <div
                                                key={index}
                                                className="col-span-12 md:col-span-4 lg:col-span-4"
                                            >
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id={`${String(item?.title).toLowerCase()}_id_a`}
                                                            name={`${String(item?.title).toLowerCase()}_id_a`}
                                                            // checked={data[`${String(item?.title).toLowerCase()}_id_a`] || false}
                                                            checked={selectedClassNameIds?.includes(item?.id)}
                                                            onChange={(e) => {
                                                                setSelectedClassnameId(item?.id)
                                                                handleCheckboxSelect(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor={`${String(item?.title).toLowerCase()}_id_a`}
                                                            value={String(item?.title)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    Select Attendance(Report Card)
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="educare-create-school-settings-list-check min-width-full">
                                    <div className="educare-radio-field-styles flex flex-wrap gap-3">
                                        <RadioInput
                                            name="attendance_type"
                                            value="Student Attendance"
                                            checked={
                                                data.attendance_type ===
                                                "student_attendance"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "attendance_type",
                                                    "student_attendance"
                                                )
                                            }
                                        />
                                        <RadioInput
                                            name="attendance_type"
                                            value="Academic Attendance"
                                            checked={
                                                data.attendance_type ===
                                                "academic_attendance"
                                            }
                                            onChange={() =>
                                                setData(
                                                    "attendance_type",
                                                    "academic_attendance"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* search and select */}
                    </div>
                    <div className="col-span-12 xl:col-span-8 ">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                {selectedClass?.length ? (
                                    <>
                                        <div className="flex flex-wrap">
                                            {selectedClass?.map((item, index) => (
                                                <span
                                                    className="badge gray text-uppercase mr-1"
                                                    key={index}
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="col-span-12">
                                <div className="educare-input-field-styles max-w-[350px]">
                                    <SelectInput
                                        id="exam_id"
                                        data_label="Exam for Remarks and Attendance"
                                        data={exams}
                                        value={data.exam_id}
                                        onChange={(e) =>
                                            setData("exam_id", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={customErrors.exam_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* table */}

                            <div className="col-span-12">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list bg-supportingA/10 pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>TEMPLATE</th>
                                                    {/* <th>TERM EXAM</th> */}
                                                    <th>CLASSES</th>
                                                    <th>ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resultCardConfigurationLists?.length > 0 ?
                                                    resultCardConfigurationLists?.map((item, index) => (
                                                        <tr key={index} className={editableData?.id == item?.id ? 'bg-success' : ''}>
                                                            <td>{item?.rule_type}</td>
                                                            {/* <td>{item?.exam?.title ?? ""}</td> */}
                                                            <td>
                                                                {item?.class_name_titles}
                                                                {/* {className
                                                                    .filter((classItem) => classItem !== "X") // Exclude "X" class
                                                                    .map((everyClass, index) => <span key={index}>{`${everyClass?.title}, `}</span>)
                                                                } */}
                                                            </td>
                                                            <td>
                                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                className="educare-warning-btn-sm-fill"
                                                                                // onClick={handleCheckData}
                                                                                onClick={() => {
                                                                                    handleEditData(item)
                                                                                }}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                            {/* <Link
                                                                                href={route(
                                                                                    "exam.edit",
                                                                                    item?.id
                                                                                )}
                                                                                className="educare-warning-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </Link> */}
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handleDeleteConfiguration(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                    </tr>
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigurationStepTwo;

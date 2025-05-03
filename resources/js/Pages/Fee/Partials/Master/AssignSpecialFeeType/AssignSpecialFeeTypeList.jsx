import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AssignSpecialFeeTypeList({
    classNames = [],
    classrooms = [],
    special_fee_types = [],
    students = [],
    feeInstallments = [],
}) {

    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAllStudentChecked, setSelectAllStudentChecked] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [classroomId, setClassroomId] = useState("");
    const [classNameId, setClassNameId] = useState("");

    const [formFields, setFormFields] = useState([
        {
            special_fee_type: "",
            special_fee_type_amount: "",
        },
    ]);

    const { data, setData, errors, post, get, reset, processing } = useForm({
        search: "",
        select_all_student_id: "",
        special_fee_array: formFields,
        class_name_id: "",
        classroom_id: "",
        selected_fee_ids: selectedFeeIds,
        selected_student_ids: selectedStudentIds,
    });


    // filter students data
    const filteredStudentsData = useMemo(() => {
        return studentsData.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.admission_no?.toLowerCase();
            const studentName = `${item?.first_name} ${item?.middle_name} ${item?.last_name}`.toLowerCase();
            const classroomTitle = item?.classroom?.title?.toLowerCase();
            const srnNo = String(item?.srn_no)?.toLowerCase();
            const fatherPhone = String(item?.father?.phone)?.toLowerCase();

            return (
                (studentName && studentName.includes(inputText)) ||
                (admissionNo && admissionNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (srnNo && srnNo.includes(inputText)) ||
                (fatherPhone && fatherPhone.includes(inputText))
            );

        });
    }, [studentsData, filterText])
    //filter students data


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: classNameId,
        }));
    }, [classNameId]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));
    }, [classroomId]);


    useEffect(() => {
        setStudentsData(students.sort(customSort));
        setLoading(false);
    }, [students]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            search: filterText
        }));
    }, [filterText]);


    useEffect(() => {
        setData('special_fee_array', formFields);
    }, [formFields])


    useEffect(() => {
       setData('selected_fee_ids', selectedFeeIds);
    }, [selectedFeeIds])

    useEffect(() => {
        if (selectedStudentIds?.length <= 0) {
            setSelectAllStudentChecked(false)
        }
        else {
            setSelectAllStudentChecked(selectedStudentIds?.length === filteredStudentsData?.length)
        }

        setData((prevData) => ({
            ...prevData,
            selected_student_ids: selectedStudentIds
        }))
    }, [selectedStudentIds])


    // handle search start
    const handleSearch = (e) => {
        setFilterText(e.target.value);
    }
    // handle search end


    // handle student checkbox select start
    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_student_id") {
            if (value === true) {
                setSelectedStudentIds(filteredStudentsData.map((item) => item.id))
            }
            else {
                setSelectedStudentIds([])
            }

            setSelectAllStudentChecked(value);
        }
    };
    // handle student checkbox select start


    const handleClassNameChange = (event) => {
        const class_name_id = Number.isNaN(parseInt(event.target.value)) ? "" : event.target.value;

        setClassNameId(class_name_id);
        setClassroomId("");

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
            classroom_id: "",
        }));

        getStudentsByClassNameAndClassroom(class_name_id, "");
    }


    const handleClassroomChange = (event) => {
        const classroom_id = Number.isNaN(parseInt(event.target.value)) ? "" : event.target.value;

        setClassroomId(classroom_id);

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
        }));

        getStudentsByClassNameAndClassroom(data?.class_name_id, classroom_id);
    }



    // get students by className and classroom start
    const getStudentsByClassNameAndClassroom = (class_name_id = "", classroom_id = "") => {
        const form_data = {
            class_name_id: class_name_id,
            classroom_id: classroom_id,
        }

        setLoading(false);

        router.post(route('fee.assign_special_type'), form_data);
    }
    // get students by className and classroom end


    //reset form data start
    const handleReset = () => {
        setFormFields([]);
        setSelectedFeeIds([]);
        setSelectedStudentIds([]);
        getStudentsByClassNameAndClassroom(classNameId, classroomId);
    }
    //reset form data end


    // handle form submit start
    const handleFeeAssignData = (e) => {
        e.preventDefault();

        data.selected_student_ids = filteredStudentsData?.filter(item => selectedStudentIds?.includes(item?.id))?.map(item => item?.id)

        post(route("fee.save_assign_special_type"), {
            preserveScroll: true,
            onSuccess: () => handleReset(),
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    count++;

                    toast.error(errors[key], {
                        position: 'top-right',
                        autoClose: 1500,
                    })

                    getStudentsByClassNameAndClassroom(classNameId, classroomId);

                    if (count >= 1) {
                        break;
                    }

                }
            }
        });
    };
    // handle form submit end


    /* Add Special Fee Type - working good
    * repeatable form fields start
    */
    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = event.target.value;

        setFormFields(updatedFields);

        setData((prevData) => ({
            ...prevData,
            [field]: event.target.value,
        }));
    };

    const addFields = () => {
        setFormFields([
            ...formFields,
            { special_fee_type: "", special_fee_type_amount: "" },
        ]);
    };

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];

        updatedFormFields.splice(index, 1);

        setFormFields(updatedFormFields);
    };
    //repeatable form fields end


    // add fee checkbox value to array
    const setSelectedFeeId = (id) => {
        if ([...selectedFeeIds]?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeIds([
                ...selectedFeeIds,
                id,
            ]);

        }

        const updateSelectedFeeIds = [...selectedFeeIds];

        setData('selected_fee_ids', updateSelectedFeeIds);
    };

    // add student checkbox value to array
    const setSelectedStudentId = (id) => {
        if ([...selectedStudentIds]?.includes(id)) {
            setSelectedStudentIds([...selectedStudentIds].filter((item) => item !== id));
        }
        else {
            setSelectedStudentIds([
                ...selectedStudentIds,
                id,
            ]);
        }

        const updateSelectedStudentIds = [...selectedStudentIds];

        setData('selected_student_ids', updateSelectedStudentIds);
    };


    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if classroomRoll exists and roll_no is not null for both a and b
        if (a.classroom_roll && b.classroom_roll && a.classroom_roll.roll_no != null && b.classroom_roll.roll_no != null) {
            return a.classroom_roll.roll_no - b.classroom_roll.roll_no;
        } else if (!a.classroom_roll || a.classroom_roll.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the end of the sorted array
        }
    }
    // sort students by classroom roll end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-7  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title flex flex-wrap justify-between">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student
                                    <span>(Total : {filteredStudentsData?.length})</span>
                                </h5>
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="search"
                                        value={data.search}
                                        onChange={(e) => {
                                            handleSearch(e);
                                        }

                                        }
                                        className="block"
                                        placeHolder="Search"
                                    />
                                    <InputError
                                        message={errors.search}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New Special Fee Type
                                    </h5>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleFeeAssignData}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-12 xl:col-span-7  col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-admission-list-area">
                                    <div className="educare-admission-list-inner">
                                        <div className="educare-admission-list-inner-wrapper">
                                            <div className="educare-admission-list pb-none">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id="select_all_student_id"
                                                                        name="select_all_student_id"
                                                                        checked={
                                                                            selectAllStudentChecked
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                                                        }
                                                                    />
                                                                </div>
                                                            </th>
                                                            <th>Admission No.</th>
                                                            <th>Roll No.</th>
                                                            <th>Name</th>
                                                            <th>Class</th>
                                                            <th>Father Mobile</th>
                                                        </tr>
                                                    </thead>
                                                    {loading ?
                                                        <Loader></Loader>
                                                    :
                                                        <tbody>
                                                            {filteredStudentsData?.length > 0 ? (
                                                                filteredStudentsData?.map(
                                                                    (item, index) => (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                                    <Checkbox
                                                                                        id="student_id"
                                                                                        name="student_id"
                                                                                        checked={selectedStudentIds?.includes(item?.id)}
                                                                                        value={item.title}
                                                                                        onChange={(e) => setSelectedStudentId(item?.id)}
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td>{item?.admission_no}</td>
                                                                            <td>{item?.classroom_roll?.roll_no ?? ""}</td>
                                                                            <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                                                            <td>{item?.classroom?.title ?? ""}</td>
                                                                            <td>{item?.father?.phone ?? ""}</td>
                                                                        </tr>
                                                                    )
                                                                )
                                                            ) : (
                                                                <tr>
                                                                    <td
                                                                        className="text-center text-red-500"
                                                                        colSpan="7"
                                                                    >
                                                                        Data not
                                                                        found
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-12 xl:col-span-5 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput2
                                                        id="class"
                                                        data_label="Class"
                                                        data={classNames}
                                                        selectedData={
                                                            data?.class_name_id
                                                        }
                                                        onChange={(e) => {
                                                            handleClassNameChange(e)
                                                        }}
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.class_name_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput2
                                                        id="classroom"
                                                        data_label="Section"
                                                        data={classrooms}
                                                    selectedData={data?.classroom_id}
                                                        onChange={(e) => {
                                                            handleClassroomChange(e)
                                                        }}
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.classroom_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <button
                                                    type="button"
                                                    className="educare-secondary-btn-md-fill"
                                                    onClick={addFields}
                                                >
                                                    <i className="icon-PlusCircle"></i>{" "}
                                                    Add Special Fee Type
                                                </button>
                                            </div>
                                            {formFields.length === 0 ? (
                                                ""
                                            ) : (
                                                <div className="col-span-12">
                                                    <div className="repeatable-speacial-fee bg-supportingA/10 p-2.5">
                                                        <div className="educare-repeatable-input-field-styles">
                                                            <div className="flex flex-col gap-4">
                                                                {formFields.map(
                                                                    (
                                                                        form,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="educare-repeatable-input-field-style-single flex gap-2.5"
                                                                        >
                                                                            <div className="educare-select-field-styles">
                                                                                <SelectInput
                                                                                    id="special_fee_type"
                                                                                    name="special_fee_type"
                                                                                    data_label="Special Fee Type"
                                                                                    data={
                                                                                        special_fee_types
                                                                                    }
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        handleFormChange(
                                                                                            event,
                                                                                            index,
                                                                                            "special_fee_type"
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        form.special_fee_type
                                                                                    }
                                                                                    className="block"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.special_fee_type
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                            <div className="educare-input-field-styles maxXs:mb-0">
                                                                                <TextInput
                                                                                    id="special_fee_type_amount"
                                                                                    name="special_fee_type_amount"
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        handleFormChange(
                                                                                            event,
                                                                                            index,
                                                                                            "special_fee_type_amount"
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        form.special_fee_type_amount
                                                                                    }
                                                                                    className="block"
                                                                                    placeHolder="Amount"
                                                                                />
                                                                                <InputError
                                                                                    message={
                                                                                        errors.special_fee_type_amount
                                                                                    }
                                                                                    className="mt-2"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <div>
                                                                                    <Tooltip
                                                                                        title="Delete"
                                                                                        placement="top"
                                                                                        arrow
                                                                                    >
                                                                                        <button
                                                                                            type="button"
                                                                                            className="educare-danger-btn-md-fill"
                                                                                            onClick={() =>
                                                                                                removeFields(
                                                                                                    index
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="icon-TrashSimple"></i>
                                                                                        </button>
                                                                                    </Tooltip>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-span-12">
                                                <div className="flex flex-col flex-wrap gap-5">
                                                {feeInstallments?.length > 0 ? (
                                                    feeInstallments?.map((item, index) => (
                                                            <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document justify-start">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id={`fee_id_${item.id}`}
                                                                        name={`fee_id_${item.id}`}
                                                                    checked={selectedFeeIds?.includes(item?.id)}
                                                                        value={item.id}
                                                                        onChange={(e) => setSelectedFeeId(item?.id)}
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel htmlFor={`fee_id_${item.id}`} value={item.title} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <span>Fee not found</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="text-end">
                                                    <PrimaryButton className="educare-primary-btn-lg-fill">
                                                        Assign
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

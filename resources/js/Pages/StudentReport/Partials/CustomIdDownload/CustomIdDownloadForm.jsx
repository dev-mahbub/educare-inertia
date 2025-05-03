import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CustomIdDownloadField from "./CustomIdDownloadField";

export default function CustomIdDownloadForm({
    classrooms,
    classNames,
    academicYears,
    statusArray,
    attributes
}) {
    const [selectedClassroomIds, setSelectedClassroomIds] = useState([]);
    const [selectedClassNameIds, setSelectedClassNameIds] = useState([]);
    const [checkAllClass, setCheckAllClass] = useState(false);
    const [checkAllSection, setCheckAllSection] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        academic_year_id: "",
        status: "",
        class_section_type: "class_type",
        classroom_ids: [],
        class_name_ids: [],
        student_attributes: [],
        order_by: "",
    });

    useEffect(() => {
        if (selectedClassroomIds?.length <= 0) {
            setCheckAllSection(false);
        }
        else {
            setCheckAllSection(selectedClassroomIds?.length === classrooms?.length);
        }

        setData((prevData) => ({
            ...prevData,
            classroom_ids: selectedClassroomIds
        }));
    }, [selectedClassroomIds, classrooms]);

    useEffect(() => {
        if (selectedClassNameIds?.length <= 0) {
            setCheckAllClass(false);
        }
        else {
            setCheckAllClass(selectedClassNameIds?.length === classNames?.length);
        }

        setData((prevData) => ({
            ...prevData,
            class_name_ids: selectedClassNameIds
        }));
    }, [selectedClassNameIds, classNames]);


    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        if(data?.class_section_type === 'class_type') {
            let updatedClassNameIds = [...selectedClassNameIds];

            // parent will check, all child will check
            if (name === "select_all_class_id") {
                if (value) {
                    updatedClassNameIds = classNames?.map(item => item?.id);
                }
                else {
                    updatedClassNameIds = [];
                }
            } else {
                if (selectedClassNameIds?.includes(value)) {
                    updatedClassNameIds = updatedClassNameIds?.filter(item => item != value);
                }
                else {
                    updatedClassNameIds = [...updatedClassNameIds, value];
                }
            }

            setSelectedClassNameIds(updatedClassNameIds)

            setData((prevData) => ({
                ...prevData,
                class_name_ids: updatedClassNameIds
            }));
        }
        else if (data?.class_section_type === 'section_type') {
            let updatedClassroomIds = [...selectedClassroomIds];

            // parent will check, all child will check
            if (name === "select_all_section_id") {
                if (value) {
                    updatedClassroomIds = classrooms?.map(item => item?.id);
                }
                else {
                    updatedClassroomIds = [];
                }
            } else {
                if (selectedClassroomIds?.includes(value)) {
                    updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
                }
                else {
                    updatedClassroomIds = [...updatedClassroomIds, value];
                }
            }

            setSelectedClassroomIds(updatedClassroomIds)

            setData((prevData) => ({
                ...prevData,
                classroom_ids: updatedClassroomIds
            }));
        }
    };
    //handle Checkbox end


    // handle class section type change start
    const handleClassSectionTypeChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_section_type: value
        }));

        setSelectedClassroomIds([]);
        setSelectedClassNameIds([]);
    }
    // handle class section type change end


    // handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id
        }));

        const form_data = {
            academic_year_id: academic_year_id,
        }

        router.post(route('student_report.custom_download'), form_data)
    }
    // handle academic year change end


    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };


    return (
        <>

            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xl:col-span-4 col-span-12">
                        {/*form start*/}
                        <div className="educare-card-title">
                            <h5>
                            Student Download
                            </h5>
                        </div>
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="academic_year_id"
                                                        value="Academic Year"
                                                    />
                                                    <SelectInput
                                                        id="academic_year_id"
                                                        data_label="Select Academic Year"
                                                        data={academicYears}
                                                        value={
                                                            data.academic_year_id
                                                        }
                                                        onChange={(e) =>
                                                            handleAcademicYearChange(e)
                                                        }
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="status"
                                                        value="All Active/Inactive/TC"
                                                    />
                                                    <SelectInput
                                                        id="status"
                                                        data_label="All Active/Inactive/TC"
                                                        data={statusArray}
                                                        value={
                                                            data.status
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name="class_section_type"
                                                        value="Class Wise"
                                                        checked={data.class_section_type === "class_type"}
                                                        onChange={() => handleClassSectionTypeChange("class_type")}
                                                    />
                                                    <RadioInput
                                                        name="class_section_type"
                                                        value="Section Wise"
                                                        checked={data.class_section_type === "section_type"}
                                                        onChange={() => handleClassSectionTypeChange("section_type")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="educare-classroom-table-wrapper mt-4">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            {data.class_section_type === "class_type" &&
                                                                <Checkbox
                                                                    id="select_all_class_id"
                                                                    name="select_all_class_id"
                                                                    checked={
                                                                        checkAllClass
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            }

                                                            {data.class_section_type === "section_type" &&
                                                                <Checkbox
                                                                    id="select_all_section_id"
                                                                    name="select_all_section_id"
                                                                    checked={
                                                                        checkAllSection
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    Select All
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.class_section_type === "class_type" &&
                                                (classNames?.length > 0 &&
                                                    classNames?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={`class_name_id_${item?.id}`}
                                                                            name={`class_name_id_${item?.id}`}
                                                                            checked={
                                                                                selectedClassNameIds?.includes(item?.id)
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxSelect(e.target.name, item?.id)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item?.title}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }

                                            {data.class_section_type === "section_type" &&
                                                (classrooms?.length > 0 &&
                                                    classrooms?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={`classroom_id_${item?.id}`}
                                                                            name={`classroom_id_${item?.id}`}
                                                                            checked={
                                                                                selectedClassroomIds?.includes(item?.id)
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxSelect(e.target.name, item?.id)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {item?.title}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/*form end*/}
                    </div>
                    <div className="xl:col-span-8 col-span-12">
                        <CustomIdDownloadField
                            data={data}
                            setData={setData}
                            errors={errors}
                            attributes={attributes}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

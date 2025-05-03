import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PreDefinedDownloadReportsList from "./PreDefinedDownloadReportsList";

export default function PreDefinedDownloadForm({
    classNames,
    classrooms,
    statusArray
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
        status: "",
        class_section_type: "class_type",
        classroom_ids: [],
        class_name_ids: [],
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
        if (data?.class_section_type === 'class_type') {
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

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Predefined Download
                </h5>
            </div>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
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
                                        <div className="educare-input-field-styles mt-2">
                                            <SelectInput
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
                                    </form>
                                </div>
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
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <PreDefinedDownloadReportsList
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


import InputError from "@/Components/InputError";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FreeezeMarksClassWise from "./FreeezeMarksClassWise";
import FreeezeMarksSectionWise from "./FreeezeMarksSectionWise";
import FreezeMarksTable from "./FreezeMarksTable";


const FreezeMarksFilter = ({
    exams,
    classNames,
    freezeMarksSubjectWiese,
    classrooms,
    subjects
}) => {
    const [checkboxValue, setCheckboxValue] = useState("");
    const [filteredClassNames, setFilteredClassNames] = useState([]);
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedClassNameIds, setSelectedClassNameIds] = useState([]);
    const [selectedClassSectionIds, setSelectedClassSectionIds] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        type: "",
        exam_id: "",
        class_name_id: "",
        classroom_id: "",
        subject_id: "",
        class_name_ids: [],
        classroom_ids: []
    });

    useEffect(() => {
        setFilteredClassNames(classNames);
    }, [classNames]);

    useEffect(() => {
        setFilteredClassrooms(classrooms);
    }, [classrooms]);

    useEffect(() => {
        setFilteredSubjects(subjects);
    }, [subjects]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            type: checkboxValue
        }));
    }, [checkboxValue]);

    const handleCheckboxSelect = (value) => {
        setCheckboxValue(value);

        setData((prevData) => ({
            ...prevData,
            exam_id: "",
            class_name_id: "",
            classroom_id: "",
            subject_id: "",
            class_name_ids: [],
            classroom_ids: [],
        }));

        setFilteredClassNames([]);
        setFilteredClassrooms([]);
        setFilteredSubjects([]);
        setSelectedClassNameIds([]);
        setSelectedClassSectionIds([]);
    }

    // handle change exam start
    const handleExamChange = (e) => {
        const exam_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            exam_id: exam_id,
            class_name_id: "",
            classroom_id: "",
            subject_id: "",
            class_name_ids: [],
            classroom_ids: [],
        }));

        setFilteredClassNames([]);
        setFilteredClassrooms([]);
        setFilteredSubjects([]);
        setSelectedClassNameIds([]);
        setSelectedClassSectionIds([]);

        const form_data = {
            type: data?.type,
            exam_id: exam_id
        }

        router.post(route('exam.freeze_marks'), form_data);
    }
    // handle change exam end
    

    return (
        <>
            <div className="educare-common-card mb-2.5">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="type"
                                    value="Class Wise"
                                    checked={
                                        data?.type === "class_wise"
                                    }
                                    onChange={() =>
                                        handleCheckboxSelect('class_wise')
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="type"
                                    value="Section Wise"
                                    checked={
                                        data.type === "section_wise"
                                    }
                                    onChange={() =>
                                        handleCheckboxSelect('section_wise')
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <div className="educare-radio-field-styles flex gap-3">
                                <RadioInput
                                    name="type"
                                    value="Subject Wise"
                                    checked={
                                        data.type === "subject_wise"
                                    }
                                    onChange={() =>
                                        handleCheckboxSelect('subject_wise')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* class wise */}
            {data.type === "class_wise" && (
                <div className="grid grid-cols-12 gap-5">
                    <div className="sm:col-span-6 lg:col-span-4 md:col-span-4 col-span-12">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="exam_id"
                                data_label="Schedule Test"
                                data={exams}
                                value={data.exam_id}
                                onChange={(e) =>
                                    handleExamChange(e)
                                }
                                className="block"
                            />
                            <InputError
                                message={errors.exam_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            )}
            {data.type === "section_wise" && (
                <div className="grid grid-cols-12 gap-5">
                    <div className="sm:col-span-6 lg:col-span-4 md:col-span-4 col-span-12">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="exam_id"
                                data_label="Schedule Test"
                                data={exams}
                                onChange={(e) => {
                                    handleExamChange(e)
                                }}

                                className="block"
                            />
                            <InputError
                                message={errors.exam_id_2}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            )}
            {data.type === "subject_wise" && (
                <FreezeMarksTable
                    exams ={exams}
                    freezeMarksSubjectWiese = {freezeMarksSubjectWiese}
                    classNames={filteredClassNames}
                    classrooms={filteredClassrooms}
                    subjects={filteredSubjects}
                    data={data}
                    setData={setData}
                    setFilteredClassNames={setFilteredClassNames}
                    setFilteredClassrooms={setFilteredClassrooms}
                    setFilteredSubjects={setFilteredSubjects}
                />
            )}

            {/* scheduled test class form start*/}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-6 mt-5">
                    {checkboxValue  === "class_wise" && (
                        <FreeezeMarksClassWise
                            data={data}
                            setData={setData}
                            errors={errors}
                            classNames = {filteredClassNames}
                            selectedClassNameIds={selectedClassNameIds}
                            setSelectedClassNameIds={setSelectedClassNameIds}
                        />
                    )}
                    {checkboxValue  === "section_wise" && (
                        <FreeezeMarksSectionWise
                            data={data}
                            setData={setData}
                            errors={errors}
                            classrooms = {filteredClassrooms}
                            selectedClassSectionIds={selectedClassSectionIds}
                            setSelectedClassSectionIds={setSelectedClassSectionIds}
                        />
                    )}
                </div>
            </div>
            {/* scheduled test class form end*/}


        </>
    );
};

export default FreezeMarksFilter;

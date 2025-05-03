import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PaidSales from "./PaidSales";
import PendingItemDetail from "./PendingItemDetail";
import PendingSales from "./PendingSales";
import SoldItemDetail from "./SoldItemDetail";

export default function PartySaleReportForm({
    classroomNames = [],
    pendingSale,
    paidSale,
    teacherNames = [],
    pendingSaleItem,
    paidSaleItem,
    students,
    student
}) {

    const [loading, setLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [params, setParams] = useState({});

    const {
        data,
        setData
    } = useForm({
        teacher_student_type: "Student",
        admission_no: "",
        classroom_id: "",
        student_id: "",
        mobile_no: "",
        staff_id: "",
    });

    useEffect(() => {
        setParams({
            teacher_student_type: data?.teacher_student_type,
            classroom_id: data?.classroom_id,
            student_id: data?.student_id,
            staff_id: data?.staff_id,
        });
    }, [data]);

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: selectedStudent?.id ?? "",
            }));
        }
    }, [selectedStudent]);

    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no
        }));
    }

    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if (key == 'Enter') {
            e.preventDefault();

            const form_data = {
                teacher_student_type: data?.teacher_student_type,
                classroom_id: data?.classroom_id,
                admission_no: data?.admission_no
            }

            router.post(route('party_sale_report.list'), form_data);
        }
    }
    // handle admission no change end

    // handle classroom change start
    const handleClassroom = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            student_id: "",
            admission_no: "",
            father_name: "",
            father_phone: "",
        }));

        const form_data = {
            teacher_student_type: data?.teacher_student_type,
            classroom_id: id
        }

        router.post(route('party_sale_report.list'), form_data);
    }
    // handle classroom change end

    // handle student change start
    const handleStudent = (id) => {
        setSelectedStudent(students?.find(item => item?.id == id) ?? {})
    }
    // handle student change end

    const handleSearch = (e) => {
        e.preventDefault();

        if (data) {
            router.post(route('party_sale_report.list'), data);
            setLoading(false);
        }
    }

    const handleTeacher = (id) => {
        const selectedTeacher = teacherNames.find((item => (item.id == id)));

        if (selectedTeacher) {
            setData((prevData) => ({
                ...prevData,
                teacher_student_type: "Teacher",
                admission_no: "",
                classroom_id: "",
                student_id: "",
                mobile_no: selectedTeacher ? selectedTeacher.staff_phone : '',
                staff_id: id,
            }));
        }
    };

    const handleReset = (e) => {
        e.preventDefault();

        router.get(route('party_sale_report.list'));

        setLoading(false);
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="flex justify-between flex-wrap gap-2 maxXs:mb-4">
                                    <div className="educare-card-title maxXs:pb-0">
                                        <h5>
                                            Sale Summary
                                        </h5>
                                    </div>
                                    <form>
                                        <div className="educare-radio-field-styles flex flex-wrap gap-3 maxXs:gap-1">
                                            <RadioInput
                                                name="teacher_student_type"
                                                value="Select for Student"
                                                checked={data?.teacher_student_type === "Student"}
                                                onChange={() => setData("teacher_student_type", "Student")}
                                            />
                                            <RadioInput
                                                name="teacher_student_type"
                                                value="Select for Teacher "
                                                checked={data.teacher_student_type === "Teacher"}
                                                onChange={() => setData("teacher_student_type", "Teacher")}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form>
                                        {
                                            data.teacher_student_type === "Student" ?
                                                (
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-12 md:col-span-4">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={
                                                                        data.admission_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleAdmissionNoChange(e)
                                                                    }
                                                                    onKeyPress={(e) => {
                                                                        handleAdmissionNoKeyPress(e)
                                                                    }}
                                                                    className="block"
                                                                    placeHolder="Adm No."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Class"
                                                                    data={classroomNames}
                                                                    value={data.classroom_id}
                                                                    onChange={(e) => handleClassroom(e.target.value)}
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Student"
                                                                    data={students}
                                                                    value={data.student_id}
                                                                    onChange={(e) => {
                                                                        handleStudent(e.target.value);
                                                                    }}
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12">
                                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                                <PrimaryButton
                                                                    className="educare-gray-btn-lg-stroke"
                                                                    type="button"
                                                                    onClick={handleReset}
                                                                >
                                                                    Reset
                                                                </PrimaryButton>
                                                                <PrimaryButton
                                                                    className="educare-primary-btn-lg-fill"
                                                                    onClick={handleSearch}
                                                                    type="button"
                                                                >
                                                                    Search
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            value="Teacher"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    data_label="Teacher"
                                                                    data={teacherNames}
                                                                    onChange={(e) => handleTeacher(e.target.value)}
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    value="Mobile Number"
                                                                />
                                                                <TextInput
                                                                    defaultValue={data?.mobile_no}
                                                                    className="block"
                                                                    placeHolder="Mobile No."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12">
                                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                                <PrimaryButton
                                                                    className="educare-gray-btn-lg-stroke"
                                                                    type="button"
                                                                    onClick={handleReset}
                                                                >
                                                                    Reset
                                                                </PrimaryButton>
                                                                <PrimaryButton
                                                                    className="educare-primary-btn-lg-fill"
                                                                    onClick={handleSearch}
                                                                    type="button"
                                                                >
                                                                    Search
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </form>
                                </div>
                                {
                                    <>
                                        <PendingSales
                                            pendingSale={pendingSale}
                                            loading={loading}
                                            setLoading={setLoading}
                                            params={params}
                                        />
                                        <PaidSales
                                            paidSale={paidSale}
                                            loading={loading}
                                            setLoading={setLoading}
                                            params={params}
                                        />
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        {
                            <>
                                <PendingItemDetail
                                    pendingSaleItem={pendingSaleItem}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                                <SoldItemDetail
                                    paidSaleItem={paidSaleItem}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

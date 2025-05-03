import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import DatePicker from "react-datepicker";

const AllocationFilter = ({
    classrooms = [],
    students = [],
    data,
    setData,
    errors,
    post,
    reset,
    processing,
}) => {
    const [studentData, setStudentData] = useState([]);

    const handleClassroom = (id) => {
        const filteredStudent = students?.sort(customSort)?.filter((item) => item?.classroom_id == id);
        setStudentData(filteredStudent);
    }

    const handleAdm = (id) => {
        const studentAdm = studentData?.find((item) => item?.id == id);
        setData({
            ...data,
            'student_id': id,
            'admission_no': studentAdm?.admission_no,
        })
    }

    // sort students by classroom roll start
    const customSort = (a, b) => {
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
            <div className="educare-common-card-title">
                <h5>
                    <i className="icon-House"></i>
                    Student Allocation
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border ">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 xxl:col-span-3 xxxl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="admission_no"
                                                value="Adm.No"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="admission_no"
                                        value={
                                            data.admission_no
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "admission_no",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.admission_no}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="classroom_id"
                                                value="Class"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="classroom_id"
                                        data_label="Class"
                                        data={classrooms}
                                        value={
                                            data.classroom_id
                                        }
                                        onChange={(e) => {
                                            setData(
                                                "classroom_id",
                                                e.target.value
                                            )
                                            handleClassroom(e.target.value);
                                        }
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.classroom_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="student_id"
                                                value="Student"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="student_id"
                                        data_label="Student"
                                        data={studentData}
                                        value={
                                            data.student_id
                                        }
                                        onChange={(e) => {
                                            handleAdm(e.target.value)
                                        }
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.student_id}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="joining_date_at"
                                        value="Date Of Joining"
                                    />
                                    <DatePicker
                                        selected={
                                            data?.joining_date_at
                                            && new Date(data?.joining_date_at)
                                        }
                                        onChange={(date) =>
                                            setData("joining_date_at", date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Joining date"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 lg:col-span-2">
                                <button type="submit" className="educare-primary-btn-md-fill md:mt-6 whitespace-nowrap">
                                    Assign To Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllocationFilter;

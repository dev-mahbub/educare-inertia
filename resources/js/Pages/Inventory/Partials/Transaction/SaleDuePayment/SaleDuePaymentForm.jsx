import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import SaleDueAmountDetail from "./SaleDueAmountDetail";
import SaleDuePopup from "./SaleDuePopup/SaleDuePopup";

export default function SaleDuePaymentForm({
    classrooms,
    students,
    student,
    paymentModes,
    staffs,
    staff,
    saleLedgers,
    filteredStudents
}) {
    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };

    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedStaff, setSelectedStaff] = useState({});
    const [selectedSaleLedger, setSelectedSaleLedger] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        audience_type: "Student",
        admission_no: "",
        classroom_id: "",
        student_id: "",
        mobile_no: "",
        staff_id: "",
        bank_ledger_id: "",
        payment_date: new Date(),
        transaction_no: "",
        transaction_details: "",
        transaction_date: new Date(),
        sale_ledger_id: "",
        paid_amount: 0,
        due_amount: 0
    });

    useEffect(() => {
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setSelectedStaff(staff);
    }, [staff]);

    useEffect(() => {
        if (selectedStudent?.id != null) {
            setData((prevData) => ({
                ...prevData,
                admission_no: selectedStudent?.admission_no ?? "",
                classroom_id: selectedStudent?.classroom_id ?? "",
                student_id: selectedStudent?.id ?? ""
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                student_id: "",
                admission_no: ""
            }));
        }
    }, [selectedStudent]);

    useEffect(() => {
        if (selectedStaff?.id != null) {
            setData((prevData) => ({
                ...prevData,
                staff_id: selectedStaff?.id ?? "",
                mobile_no: selectedStaff?.phone ?? "",
            }));
        }
        else {
            setData((prevData) => ({
                ...prevData,
                staff_id: "",
                mobile_no: ""
            }));
        }
    }, [selectedStaff]);

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
                classroom_id: data?.classroom_id,
                admission_no: data?.admission_no,
                audience_type: 'Student'
            }

            router.post(route('sale_due_payment'), form_data);
        }
    }
    // handle admission no change end

    // handle classroom change start
    const handleChangeClassroom = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            student_id: "",
            admission_no: "",
            father_name: "",
            father_phone: "",
        }));

        const form_data = {
            classroom_id: id,
            audience_type: 'Student'
        }

        router.post(route('sale_due_payment'), form_data);
    }
    // handle classroom change end

    // handle student change start
    const handleSelectStudent = (id) => {
        const form_data = {
            student_id: id,
            audience_type: 'Student'
        }

        router.post(route('sale_due_payment'), form_data);
    }
    // handle student change end

    // handle staff change start
    const handleSelectStaff = (id) => {
        const form_data = {
            staff_id: id,
            audience_type: 'Teacher'
        }

        router.post(route('sale_due_payment'), form_data);
    }
    // handle staff change end

    // handle change audience type start
    const handleChangeAudienceType = (value) => {
        setData((prevData) => ({
            ...prevData,
            audience_type: value,
            admission_no: "",
            classroom_id: "",
            student_id: "",
            mobile_no: "",
            staff_id: ""
        }));

        const form_data = {
            audience_type: value
        }

        router.post(route('sale_due_payment'), form_data);
    }
    // handle change audience type end

    // handle select sale ledger start
    const handleSelectSaleLedger = (id, isSelected) => {
        setSelectedSaleLedger(isSelected ? saleLedgers?.find(item => item?.id == id) ?? {} : {});
    }
    // handle select sale ledger end

    // concate name
    const concatName = (first_name = null, middle_name = null, last_name = null) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="flex justify-between flex-wrap gap-2 mb-1">
                                    <div className="educare-card-title">
                                        <h5>
                                            Sale Due Payment
                                        </h5>
                                    </div>
                                    <div>
                                        <div className="educare-radio-field-styles flex flex-wrap gap-3">
                                            <RadioInput
                                                // name="audience_type"
                                                value="Select for Student"
                                                checked={data?.audience_type == "Student"}
                                                onChange={() => handleChangeAudienceType("Student")}
                                            />
                                            <RadioInput
                                                // name="audience_type"
                                                value="Select for Teacher "
                                                checked={data?.audience_type == "Teacher"}
                                                onChange={() => handleChangeAudienceType("Teacher")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        {
                                            data.audience_type == "Student" ?
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
                                                                <InputError
                                                                    message={
                                                                        errors.admission_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Class"
                                                                    data={classrooms}
                                                                    value={
                                                                        data.classroom_id
                                                                    }
                                                                    onChange={(e) => handleChangeClassroom(e.target.value)}
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.classroom_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    data_label="Student"
                                                                    data={students}
                                                                    value={
                                                                        data.student_id
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleSelectStudent(e.target.value)
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.student_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12">
                                                            <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                                {/* <PrimaryButton
                                                                    className="educare-gray-btn-lg-stroke"
                                                                >
                                                                    Reset
                                                                </PrimaryButton> */}
                                                                <PrimaryButton
                                                                    className="educare-primary-btn-lg-fill"
                                                                    onClick={handleListPopupClick}
                                                                >
                                                                    Search
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                        {selectedStudent?.id != null &&
                                                            <div className="col-span-12 flex flex-wrap justify-between  ">
                                                                <h5 className="text-headingLight">Father Name : <span className="font-semibold">{concatName(selectedStudent?.father?.first_name, selectedStudent?.father?.middle_name, selectedStudent?.father?.last_name)}</span></h5>
                                                                <h5 className="text-headingLight">Mobile No : <span className="font-semibold">{selectedStudent?.father?.phone}</span></h5>
                                                            </div>
                                                        }
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
                                                                    data={staffs}
                                                                    value={
                                                                        data.staff_id
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleSelectStaff(e.target.value)
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.staff_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    value="Mobile Number"
                                                                />
                                                                <TextInput
                                                                    value={
                                                                        data.mobile_no
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "mobile_no",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block cursor-not-allowed"
                                                                    placeHolder="Mobile No."
                                                                    disabled
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.mobile_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </form>
                                </div>
                                <div className="educare-classroom-table-wrapper mt-5">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Check
                                                    </th>
                                                    <th>Sr.</th>
                                                    <th>Title</th>
                                                    <th>Total</th>
                                                    <th>Paid</th>
                                                    <th>Due</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {saleLedgers?.length > 0 ?
                                                    saleLedgers.map((item, index) => (
                                                        <tr key={index} className={item?.paid_type == 'Paid' ? 'bg-success' : ''}>
                                                            <td>
                                                                {item?.paid_type == 'Unpaid' &&
                                                                    <div className="educare-checkbox-field-styles">
                                                                        <Checkbox
                                                                            name={`sale_ledger_${item?.id}`}
                                                                            checked={
                                                                                selectedSaleLedger?.id == item?.id
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleSelectSaleLedger(item?.id, e.target.checked)
                                                                            }
                                                                        />
                                                                    </div>
                                                                }
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.title}</td>
                                                            <td>{parseFloat(item?.total_amount ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item?.paid_amount ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item?.due_amount ?? 0)?.toFixed(2)}</td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="6"
                                                        >
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <SaleDueAmountDetail
                            paymentModes={paymentModes}
                            selectedSaleLedger={selectedSaleLedger}
                            data={data}
                            setData={setData}
                            setSelectedSaleLedger={setSelectedSaleLedger}
                        />
                    </div>
                </div>
            </div>
            <SaleDuePopup
                listPopup={listPopup}
                setListPopup={setListPopup}
                filteredStudents={filteredStudents}
                selectedStudent={selectedStudent}
            />
        </>
    );
}

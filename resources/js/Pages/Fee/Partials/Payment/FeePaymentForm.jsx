import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import PaymentStatus from './PaymentStatus';
import SearchStudentPopup from './Popup/SearchStudentPopup';

const FeePaymentForm = ({
    classrooms = [],
    students = [],
    selectedStudent,
    setSelectedStudent,
    studentFeeInstallmentsData,
    setStudentFeeInstallmentsData,
    studentFeeVouchersData,
    setStudentFeeVouchersData,
    studentTransportVouchersData,
    setStudentTransportVouchersData,
    filteredStudentsData,
    getStudentFeeInstallments,
    setSelectedDiscount,
    setSelectedFeeIds,
    setFeeInstallmentsDataArray,
    setSelectedFeeInstallments,
    setSelectedInstallments,
    currentDueAmount
}) => {
    const [modalSearchStudentOpen, setModalSearchStudentOpen] = useState(false);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const [classroomId, setClassroomId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [admissionNo, setAdmissionNo] = useState("");


    //search student popup start
    const handleModalSearchStudentClick = () => {
        setModalSearchStudentOpen(!modalSearchStudentOpen);
    };
    //search student popup end


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        admission_no: "",
        student_id: "",
        classroom_id: "",
    });

    useEffect(() => {
        setFilteredStudents(Object.values(students).sort(customSort));
    }, [students])


    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));

        setFilteredStudents(Object.values(students)?.filter(item => item?.classroom_id == classroomId).sort(customSort));
    }, [classroomId])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: studentId,
        }));
    }, [studentId]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            admission_no: admissionNo,
        }));
    }, [admissionNo]);
    // handle form data end

    // set selected student data
    useEffect(() => {
        if (selectedStudent?.id != null) {
            setFilteredStudents(Object.values(students)?.filter(item => item?.classroom_id == selectedStudent?.classroom_id).sort(customSort));
            setClassroomId(selectedStudent?.classroom_id ?? "");
            setStudentId(selectedStudent?.id ?? "");
            setAdmissionNo(selectedStudent?.admission_no ?? "");
        }
        else {
            setStudentId("");
            setAdmissionNo(admissionNo ?? "");
        }

        setData((prevData) => ({
            ...prevData,
            classroom_id: selectedStudent?.classroom_id ?? classroomId ?? "",
            admission_no: selectedStudent?.admission_no ?? admissionNo ?? "",
            student_id: selectedStudent?.id ?? ""
        }));
    }, [selectedStudent]);
    // end set selected student data


    // handle admission no change start
    const handleAdmissionNoChange = (e) => {
        const admission_no = e.target.value;

        setAdmissionNo(admission_no);

        setData((prevData) => ({
            ...prevData,
            admission_no: admission_no,
        }));
    }


    const handleAdmissionNoKeyPress = (e) => {
        const key = e.key;

        if(key == 'Enter') {
            e.preventDefault()

            const form_data = {
                admission_no: admissionNo,
                student_id: "",
                request_type: "fetch_fee_installments",
            }

            getStudentFeeInstallments(form_data);
        }
    }
    // handle admission no change end


    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value;

        setFilteredStudents(Object.values(students)?.filter(item => item?.classroom_id == classroom_id).sort(customSort));
        setSelectedStudent({});
        setSelectedDiscount({});
        setClassroomId(classroom_id);
        setAdmissionNo("");
        setStudentId("");

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            admission_no: "",
            student_id: "",
        }));

        const form_data = {
            classroom_id: classroom_id,
            request_type: "fetch_student",
        }

        getStudentFeeInstallments(form_data);
    }
    // handle classrooom change end


    // handle student change start
    const handleSelectStudent = (e, value) => {
        e.preventDefault();

        const selectedStudentData = Object.values(filteredStudents)?.find(student => student?.id == value?.id);

        if (selectedStudentData?.id != null) {
            setSelectedStudent(selectedStudentData);

            const form_data = {
                student_id: selectedStudentData?.id,
                request_type: "fetch_fee_installments",
            }

            getStudentFeeInstallments(form_data);
        }
        else {
            setAdmissionNo("");
            setSelectedStudent({});
            setSelectedDiscount({});
            setStudentFeeInstallmentsData([]);
            setStudentFeeVouchersData([]);
            setStudentTransportVouchersData([]);
            setSelectedFeeIds([]);
            setSelectedInstallments({
                fee_installment: [],
                general_voucher: [],
                transport_voucher: [],
            });
            setFeeInstallmentsDataArray([]);
            setSelectedFeeInstallments([]);
        }

        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudentData?.admission_no ?? "",
            student_id: selectedStudentData?.id ?? "",
        }));
    };
    // handle student change end


    const feePaymentData = (e) => {
        e.preventDefault();
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
            <form onSubmit={feePaymentData}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title flex flex-wrap justify-between gap-2.5">
                            <h5>
                                <i className="icon-CurrencyInr"></i>
                                Fee Payment
                            </h5>
                            <div className='educare-filter-action-btn flex flex-wrap gap-1'>
                                {selectedStudent?.id != null &&
                                    <div>
                                        <Tooltip
                                            title="Sale Due Payment"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('sale_due_payment')}
                                                className="educare-warning-btn-md-fill"
                                            >
                                                Sale Due Payment
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                {selectedStudent?.id != null &&
                                    <div>
                                        <Tooltip
                                            title="Student Structure"
                                            placement="top"
                                            arrow
                                        >
                                            <a
                                                target="_blank"
                                                href={route('pdf_fee.student_fee_summary', { student_id: selectedStudent?.id })}
                                                className="educare-tertiary-btn-md-fill"
                                            >
                                                <i className='icon-FilePdf border-0'></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                <div>
                                    <Tooltip
                                        title="Search Student"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button type='button'
                                            className="educare-secondary-btn-md-fill"
                                            onClick={handleModalSearchStudentClick}
                                        >
                                            <i className="icon-search-interface-symbol border-0"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="xl:col-span-4 col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="admission_no"
                                            value={
                                                data.admission_no
                                            }
                                            onChange={(e) => {
                                                handleAdmissionNoChange(e)
                                            }
                                            }
                                            onKeyPress={(e) => {
                                                handleAdmissionNoKeyPress(e)
                                            }}
                                            className="block"
                                            placeHolder="Admission No."
                                        />
                                        <InputError
                                            message={
                                                errors.admission_no
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="xl:col-span-4 col-span-12">
                                    <div className="educare-input-field-styles">
                                        <SelectInput
                                            id="class_id"
                                            data_label="Class"
                                            data={classrooms}
                                            value={
                                                data.classroom_id
                                            }
                                            onChange={(e) => {
                                                    handleClassroomChange(e);
                                                }
                                            }
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
                                <div className="xl:col-span-4 col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-type-file-styles">
                                            <Autocomplete
                                                disablePortal
                                                options={Object.values(filteredStudents).map(student => ({
                                                    "id": student?.id,
                                                    "title": `${student?.classroom_roll?.roll_no ? student?.classroom_roll?.roll_no +' - ' : ''} ${student?.first_name} ${student?.middle_name} ${student?.last_name}`,
                                                }))}
                                                getOptionLabel={(option) => option.title ?? "Select Student"}
                                                value={selectedStudent?.id != null &&
                                                    ({
                                                        "id": selectedStudent?.id,
                                                        "title": `${selectedStudent?.classroom_roll?.roll_no ? selectedStudent?.classroom_roll?.roll_no +' - ' : ''} ${selectedStudent?.first_name} ${selectedStudent?.middle_name} ${selectedStudent?.last_name}`,
                                                    })
                                                }
                                                onChange={handleSelectStudent}
                                                renderInput={(
                                                    params
                                                ) => (
                                                    <TextField
                                                        {...params}
                                                        // placeholder="Select Student"
                                                        placeholder={selectedStudent?.id != null ? `${selectedStudent?.classroom_roll?.roll_no ? selectedStudent?.classroom_roll?.roll_no + ' - ' : ''} ${selectedStudent?.first_name} ${selectedStudent?.middle_name} ${selectedStudent?.last_name}` : "Select Student"}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {Object.keys(studentFeeInstallmentsData)?.length > 0 && selectedStudent?.id != null &&
                                <PaymentStatus
                                    feeInstallmentsData={studentFeeInstallmentsData}
                                    feeVouchersData={studentFeeVouchersData}
                                    feeTransportVouchersData={studentTransportVouchersData}
                                    currentDueAmount={currentDueAmount}
                                />
                            }
                        </div>
                    </div>
                </div>
            </form>
            <SearchStudentPopup
                modalSearchStudentOpen={modalSearchStudentOpen}
                setModalSearchStudentOpen={setModalSearchStudentOpen}
                filteredStudentsData={filteredStudentsData}
                selectedStudent={selectedStudent}
                getStudentFeeInstallments={getStudentFeeInstallments}
            />
        </>
    );
};

export default FeePaymentForm;




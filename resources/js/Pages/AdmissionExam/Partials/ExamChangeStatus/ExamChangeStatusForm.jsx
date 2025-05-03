import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExamChangeStatusStudent from "./ExamChangeStatusStudent";

export default function ExamChangeStatusForm({
    academicYears,
    examStatusArray,
    classNames,
    registrations,
    academicYearId
}) {
    const [selectedEnquiryIds, setSelectedEnquiryIds] = useState([]);
    const {
        data,
        setData,
        errors,
        patch,
        reset,
        processing
    } = useForm({
        academic_year_id: academicYearId ?? "",
        class_name_id: "",
        enquiry_ids: selectedEnquiryIds,
        exam_status: "",
        search: "",
        from_date: "",
        to_date: "",
    });

    const filteredRegistrations = useMemo(() => {
        const filterText = data?.search?.trim()?.toLowerCase();

        return registrations?.filter((item) => {
            const studentName = (item?.first_name + " " + item?.middle_name + " " + item?.last_name)?.toLowerCase();
            const fatherName = (item?.father_first_name + " " + item?.father_middle_name + " " + item?.father_last_name)?.toLowerCase();
            const fatherMobile = item?.father_mobile?.toLowerCase();
            const registrationNo = item?.registration_no?.toLowerCase();
            const testDate = item?.test_date?.toLowerCase();
            const examStatus = (item?.exam_status ?? "Pending")?.toLowerCase();
            const examResult = item?.exam_result?.toLowerCase();

            return (
                studentName?.includes(filterText) ||
                fatherName?.includes(filterText) ||
                fatherMobile?.includes(filterText) ||
                registrationNo?.includes(filterText) ||
                testDate?.includes(filterText) ||
                examStatus?.includes(filterText) ||
                examResult?.includes(filterText)
            );
        });
    }, [registrations, data?.search]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            enquiry_ids: selectedEnquiryIds
        }));
    }, [selectedEnquiryIds]);


    // handle academic year change start
    const handleAcademicYearChange = (e) => {
        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id : academic_year_id,
            class_name_id : "",
        }));

        const form_data = {
            academic_year_id: academic_year_id
        }

        router.post(route('admission_exam.change_selected_status'), form_data);
    }
    // handle academic year change start


    // handle class change start
    const handleClassNameChange = (e) => {
        const class_name_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id,
        }));

        const form_data = {
            'academic_year_id' : data?.academic_year_id,
            'class_name_id': class_name_id
        }

        handleFilterAdmissionData(form_data);
    }
    // handle class change end

    // handle filter admission data start
    const handleFilterAdmissionData = (form_data) => {
        router.post(route('admission_exam.change_selected_status'), form_data);
    }
    // handle filter admission data end


    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    // handle admission exam status update start
    const handleAdmissionExamStatusUpdate = (e, examStatus) => {
        e.preventDefault();

        if(data?.enquiry_ids?.length == 0) {
            toast.error("Please select at least a student", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                enquiry_ids: data?.enquiry_ids,
                exam_status: examStatus
            }

            router.patch(route("admission.exam.status.update"), form_data, {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedEnquiryIds([]);

                    const form_data = {
                        academic_year_id: data?.academic_year_id ?? "",
                        class_name_id: data?.class_name_id ?? "",
                        from_date: data?.from_date ?? "",
                        to_date: data?.to_date ?? "",
                        exam_status: data?.exam_status ?? "",
                    }

                    handleFilterAdmissionData(form_data);
                }
            });
        }

    }
    // handle admission exam status update end


    const selectedEnquiryIdFromChild = (id) => {
        if ([...selectedEnquiryIds]?.includes(id)) {
            setSelectedEnquiryIds([...selectedEnquiryIds].filter((item) => item !== id));
        }
        else {
            setSelectedEnquiryIds([
                ...selectedEnquiryIds,
                id,
            ]);
        }

        const updateSelectedEnquiryIds = [...selectedEnquiryIds];

        setData('enquiry_ids', updateSelectedEnquiryIds);
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="max3Xl:col-span-12 col-span-4">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Exam Status
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles mb-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Academic Year"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Academic Year"
                                                        data={academicYears}
                                                        value={
                                                            data?.academic_year_id
                                                        }
                                                        onChange={(e) =>
                                                            handleAcademicYearChange(e)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.academic_year_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="educare-input-field-styles my-2">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={classNames}
                                                        value={
                                                            data.class_name_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassNameChange(e)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap justify-end  gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-warning-btn-md-fill"
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleAdmissionExamStatusUpdate(e, 'Not Selected')
                                                        }}
                                                    >
                                                        Save As Not Selected
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-md-fill"
                                                        type="button"
                                                        onClick={(e) => {
                                                            handleAdmissionExamStatusUpdate(e, 'Selected')
                                                        }}
                                                    >
                                                        Save As Selected
                                                    </PrimaryButton>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max3Xl:col-span-12 col-span-8">
                        <ExamChangeStatusStudent
                            registrations={filteredRegistrations}
                            sendSelectedEnquiryIdToParent={selectedEnquiryIdFromChild}
                            selectedEnquiryIds={selectedEnquiryIds}
                            examStatusArray = {examStatusArray}
                            data={data}
                            setData={setData}
                            handleFilterAdmissionData={handleFilterAdmissionData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

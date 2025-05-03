import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from "@/Components/SelectInput";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function FeeCertificatePopup({
    feePopupOpen,
    setFeePopupOpen,
    classrooms = [],
    studentNames = [],
    academicSession = [],
    feeTypes = [],
    feeTitles = [],
}) {
    const [studentData, setStudentData] = useState([]);
    const [classroomData, setClassroomData] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        academic_year_id: "",
        classroom_id: "",
        student_id: "",
        selected_fee: [],
        fee_all: false,
        to_installment_id: "",
        from_installment_id: "",
    });

    const handleAcademicYear = (academicYearId) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: "",
            academic_year_id: academicYearId,
            student_id: "",
        }));
        setClassroomData(classrooms?.filter((item) => item?.academic_year_id == academicYearId));
    }

    const handleClassroom = (classroomId) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
            student_id: "",
        }));
        setStudentData(studentNames?.filter((item) => item?.classroom_id == classroomId));
    }

    const closeModal = () => {
        setFeePopupOpen(false);
    };

    const handleFee = (id) => {
        const isSelected = data.selected_fee.some((fee) => fee.fee_id === id);
        const updatedSelectedFees = isSelected
            ? data.selected_fee.filter((fee) => fee.fee_id !== id)
            : [...data.selected_fee, { fee_id: id }];

        setData({ ...data, 'selected_fee': updatedSelectedFees, 'fee_all': false });
    }

    const handleAllFee = (isChecked) => {
        if (isChecked) {
            const allFeeIds = feeTypes.map((item) => item.id);
            const updatedSelectedFees = allFeeIds.map((fee_id) => ({ fee_id }));
            setData({ ...data, 'selected_fee': updatedSelectedFees, 'fee_all': true });
        } else {
            setData({ ...data, 'selected_fee': [], 'fee_all': false });
        }
    };

    const encodedData = encodeURIComponent(JSON.stringify(data));

    const handleData = () => {
        window.open(route('fee_certificate_generator', { data: encodedData }), '_blank');
    }



    return (
        <form>
            <div className='educare-admission-follow-up-area space-y-6'>
                <Modal show={feePopupOpen} onClose={closeModal} className="educare-xl-width-modal">
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Generate Fee Certificate</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="academic_year_id"
                                                data_label="academic year"
                                                data={academicSession}
                                                value={data?.academic_year_id}
                                                onChange={(e) => handleAcademicYear(e.target.value)}
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="class"
                                                data={classroomData}
                                                value={data.classroom_id}
                                                onChange={(e) => handleClassroom(e.target.value)}
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="student_id"
                                                data_label="student"
                                                data={studentData}
                                                value={data?.student_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "student_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="from_installment_id"
                                                data_label="installment"
                                                data={feeTitles}
                                                value={data?.from_installment_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "from_installment_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="to_installment_id"
                                                data_label="to installment"
                                                data={feeTitles}
                                                value={data?.to_installment_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "to_installment_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-2">
                                        <div className="educare-create-school-settings-list-check min-width-full">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="fee_all"
                                                        name="fee_all"
                                                        onChange={(e) => handleAllFee(e.target.checked)}
                                                        checked={data.fee_all}
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="fee_all"
                                                        value="All Fee Types"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    {feeTypes?.length ?
                                        feeTypes?.map((item2, index2) => (
                                            <div className="col-span-2" key={index2}>
                                                <div className="educare-create-school-settings-list-check min-width-full">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`type_${index2}`}
                                                                name={`type_${index2}`}
                                                                onChange={(e) => handleFee(item2?.id)}
                                                                checked={data.selected_fee.some(fee => fee.fee_id === item2.id)}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`type_${index2}`}
                                                                value={item2?.display_name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                        <span className="text-center text-red-500">Data not found</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex mt-6 justify-end">
                                <PrimaryButton type="button" className="educare-primary-btn-md-fill" onClick={handleData}>
                                    Generate
                                </PrimaryButton>
                                <SecondaryButton type="button" className="ml-3" onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </form>
    );
}

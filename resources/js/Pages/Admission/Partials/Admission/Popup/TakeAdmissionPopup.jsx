import Checkbox from "@/Components/Checkbox";
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TakeAdmissionPopup({
    takeAdmissionPopup,
    setTakeAdmissionPopup,
    data,
    classrooms,
    registrationData,
    selectedFeeStructure
}) {
    const [classroomId, setClassroomId] = useState(null);

    const closeModal = () => {
        setTakeAdmissionPopup(false);
        setClassroomId(null)
    };

    // new code
    const handleTakeAdmission = (e) => {
        e.preventDefault();

        if(classroomId == null) {
            toast.error("Please select at least one section for take admission", {
                position: 'top-right',
                autoClose: 1500,
            })
        } else {
            data['classroom_id'] = classroomId;

            router.post(route("admission_registration.add_admission_save", registrationData.id), data, {
                preserveScroll: true,
                onSuccess: () => {
                    window.location.href = route('admission_registration.view_admission', registrationData.id);
                }
            });
        }
    };

    // handle select classroom start
    const handleSelectClassroom = (isChecked, id) => {
        if(isChecked) {
            setClassroomId(id);
        }
        else {
            setClassroomId(null);
        }
    }
    // handle select classroom end

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end


    return (
        <section className='educare-admission-follow-up-area space-y-6'>
            <Modal show={takeAdmissionPopup} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        {/* <div className="educare-popup-form-header py-3">
                            <h5>Registration</h5>
                        </div> */}
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div>
                                <div className="educare-popup-form-header py-3">
                                    <h5>Select class section</h5>
                                </div>
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className='col-span-12'>
                                        <table className="w-full text-center">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Section</th>
                                                    <th>Total Student</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {Object.keys(classrooms)?.length > 0 &&
                                                    Object.values(classrooms)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-checkbox-styles">
                                                                    <label className="inline-block">
                                                                        <Checkbox
                                                                            name="classroom_id"
                                                                            checked={
                                                                                classroomId == item?.id
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleSelectClassroom(e.target.checked, item?.id)
                                                                            }
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </td>
                                                            <td>{item?.title}</td>
                                                            <td>{item?.total_student ?? 0}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-popup-form-header py-3">
                                    <h5>Student Fee Structure</h5>
                                </div>
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className='col-span-12'>
                                        <table className="w-full text-center">
                                            <thead>
                                                <tr>
                                                    <th>Installment No</th>
                                                    <th>Title</th>
                                                    <th>Amount</th>
                                                    <th>Cumulative Amount</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {selectedFeeStructure?.fee_installments && Object.keys(selectedFeeStructure?.fee_installments)?.length > 0 &&
                                                    Object.values(selectedFeeStructure?.fee_installments)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item?.title}</td>
                                                            <td>{formatNumber(item?.amount ?? 0)}</td>
                                                            <td>{formatNumber(item?.comulative_amount ?? 0)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center pt-6'>
                                {/* <Link
                                    href={route('admission_enquery_reg.create_registration', { enquiry_id: entryStudentData ?.id})}
                                    className="educare-primary-btn-md-fill"
                                >
                                    Start Registration Process
                                </Link> */}
                                <PrimaryButton
                                    className='educare-gray-btn-md-fill mr-2'
                                    type='button'
                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    Close
                                </PrimaryButton>
                                <PrimaryButton
                                    className='educare-primary-btn-md-fill'
                                    type='button'
                                    onClick={(e) => {
                                        handleTakeAdmission(e, data?.id);
                                    }}
                                >
                                    Confirm
                                </PrimaryButton>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

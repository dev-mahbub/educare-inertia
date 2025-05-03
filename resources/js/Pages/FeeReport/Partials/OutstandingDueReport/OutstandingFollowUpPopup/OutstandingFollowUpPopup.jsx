import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";


export default function OutstandingFollowUpPopup({
    className = '',
    followUpPopup,
    setFollowUpPopup,
    studentData,
    setStudentData,
    getFeeDuesReportData,
    formData
}) {
    const [commitmentDate, setCommitmentDate] = useState(new Date());
    const [formType, setFormType] = useState('create');
    const [editableData, setEditableData] = useState({});
    const [totalFollowUp, setTotalFollowUp] = useState(0);
    const [totalPickedFollowUp, setTotalPickedFollowUp] = useState(0);
    const [totalUnPickedFollowUp, setTotalUnPickedFollowUp] = useState(0);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        post,
        put
    } = useForm({
        student_id: "",
        note: "",
        commitment_date: "",
        call_picked: true,
        due_amount: 0,
    });

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            note: editableData?.note ?? "",
            call_picked: editableData?.call_picked ?? true
        }));

        if (Object.keys(editableData)?.length > 0 && (editableData?.commitment_date != "" || editableData?.commitment_date != null)) {
            setCommitmentDate(new Date(editableData.commitment_date));
        }
        else {
            setCommitmentDate(new Date());
        }
    },[editableData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            commitment_date: commitmentDate
        }))
    }, [commitmentDate]);

    useEffect(() => {
        setTotalFollowUp(studentData?.due_follow_ups?.length);
        setTotalPickedFollowUp(studentData?.due_follow_ups?.filter(item => item?.call_picked)?.length);
        setTotalUnPickedFollowUp(studentData?.due_follow_ups?.filter(item => !item?.call_picked)?.length);
        setData((prevData) => ({
            ...prevData,
            student_id: studentData?.id ?? "",
            due_amount: studentData?.total_due_amount ?? 0,
        }));
    }, [studentData]);
    // handle form data end


    const followUpPopupData = (e) => {
        e.preventDefault();
    };

    // handle close modal start
    const closeModal = () => {
        setFollowUpPopup(false);
        setStudentData({});
        handleReset();
    };
    // handle close modal end


    // handle form reset start
    const handleReset = () => {
        setEditableData({});
        setFormType('create');
        reset();
        setCommitmentDate(new Date());
        setData((prevData) => ({
            ...prevData,
            student_id: studentData?.id ?? "",
            due_amount: studentData?.total_due_amount ?? 0,
        }));
    };
    // handle form reset end


    // handle edit due follow up start
    const handleEditFollowUp = (id) => {
        setFormType('edit');
        setEditableData(studentData?.due_follow_ups?.find(item => item?.id == id));
    }
    // handle edit due follow up end


    // handle update due follow up start
    const handleSaveDueFollowUp = (e) => {
        e.preventDefault();

        post(route("fee_report.save_student_due_followup"), {
            preserveScroll: true,
            // onSuccess: ({ props }) => closeModal(),
            onSuccess: ({ props }) => handleSuccess(),
            // onError: (errors) => handleError(),
        });
    }
    // handle update due follow up end

    // handle update due follow up start
    const handleUpdateDueFollowUp = (e) => {
        e.preventDefault();

        put(route('fee_report.update_student_due_followup', editableData?.id), {
            preserveScroll: true,
            // onSuccess: ({ props }) => closeModal(),
            onSuccess: ({ props }) => handleSuccess(),
            // onError: (errors) => handleError(),
        });
    }
    // handle update due follow up end

    // handle success start
    const handleSuccess = () => {
        getFeeDuesReportData(formData)
        closeModal();
    }
    // handle success end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={followUpPopup} onClose={closeModal} className="educare-xl-width-modal">
                    <form onSubmit={followUpPopupData}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Add Student Follow Up</h5>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                >
                                    <i className="icon-XCircle text-[24px]"></i>
                                </button>
                            </div>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <ul className='grid grid-cols-12 gap-5'>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Student's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{studentData?.name ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{studentData?.father_name ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Phone : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{studentData?.sms_phone ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Total Follow Up : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{totalFollowUp}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Picked Call : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{totalPickedFollowUp}</span>
                                    </li>
                                    <li className='col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>UnPicked Call: </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{totalUnPickedFollowUp}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="note"
                                            value="Notes"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextareaInput
                                    id="note"
                                    value={data?.note}
                                    onChange={(e) => setData({ ...data, note: e.target.value })}
                                    type="text"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.note
                                    }
                                    className="mt-2"
                                />
                            </div>
                            <div className='grid grid-cols-12 gap-5'>
                                <div className='col-span-12 md:col-span-6'>
                                    <div className="educare-create-school-settings-list-check w-full">
                                        <div className="educare-radio-field-styles flex flex-wrap gap-3">
                                            <RadioInput
                                                name="call_picked"
                                                value="Picked Call"
                                                checked={data.call_picked == true}
                                                onChange={() => setData("call_picked", true)}
                                            />
                                            <RadioInput
                                                name="call_picked"
                                                value="UnPicked Call"
                                                checked={data.call_picked == false}
                                                onChange={() => setData("call_picked", false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-12 md:col-span-6'>
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Commitment Date"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={commitmentDate}
                                            onChange={(date) => setCommitmentDate(date)}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Select Date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={errors.commitment_date}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={handleReset}>Reset</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                onClick={(e) => {
                                    if (formType === 'edit') {
                                        handleUpdateDueFollowUp(e)
                                    }
                                    else {
                                        handleSaveDueFollowUp(e)
                                    }
                                }}
                            >
                                Save
                            </PrimaryButton>
                        </div>
                        <div className="educare-admission-list-area">
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list bg-supportingA/10 mt-5">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Called Date</th>
                                                    <th>Call Status</th>
                                                    <th>Follow Up Note</th>
                                                    <th>Commit. Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {studentData?.due_follow_ups?.length > 0 ?
                                                    studentData?.due_follow_ups?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{++index}</td>
                                                            <td>{item?.called_date}</td>
                                                            <td>{item?.called_picked ? 'Picked' : 'UnPicked'}</td>
                                                            <td className="break-all">{item?.note}</td>
                                                            <td>{item?.formated_commitment_date}</td>
                                                            <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-warning-btn-sm-fill"
                                                                                onClick={(e) => {
                                                                                    handleEditFollowUp(item?.id);
                                                                                }}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="7">
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
                    </form>

                </Modal>
            </section>
        </>
    );
}

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";


export default function AddDueFollowUpPopup({
    followUpData,
    setShowStudentFollowUpPopup,
    showStudentFollowUpPopup,
    setFollowUpData,
    filterFormData,
    setLoading
}) {

    const [commitmentDate, setCommitmentDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        student_id: "",
        note: "",
        commitment_date :"",
        call_picked: true,
        due_amount: 0,
    });

    // handle form data start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: followUpData?.id ?? "",
            due_amount: followUpData?.total_due_amount ?? 0
        }));
    }, [followUpData]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            commitment_date: commitmentDate
        }));
    },[commitmentDate]);
    // handle form data end

    // handle form submit success start
    const handleSuccess = () => {
        closeModal();
        filterData(filterFormData)
    }
    // handle form submit success end


    // handle form error success start
    const handleError = () => {
        filterData(filterFormData)
    }
    // handle form error success end

    // handle form reset start
    const handleReset = () => {
        reset();
        setCommitmentDate(new Date());
        errors.note = "";
        errors.commitment_date = "";
    }
    // handle form reset end

    // handle close modal start
    const closeModal = () => {
        setShowStudentFollowUpPopup(false);
        handleReset();
        setFollowUpData({});
    };
    // handle close modal end


    // filter data start
    const filterData = (form_data) => {
        setLoading(false);

        router.post(route('fee_report.complete_outstanding_dues'), form_data);
    }
    // filter data end


    // handle form submit start
    const addFollowUpData = (e) => {
        e.preventDefault();

        post(route("fee_report.save_student_due_followup"), {
            preserveScroll: true,
            onSuccess: ({ props }) => handleSuccess(),
            onError: (errors) => handleError(),
        });
    };
    // handle form submit end

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={showStudentFollowUpPopup} onClose={closeModal}>
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <form onSubmit={addFollowUpData}>
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Add Student FollowUp</h5>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                >
                                    <i className="icon-XCircle text-[24px]"></i>
                                </button>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles flex justify-start">
                                    <ul className="w-1/2">
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Student's Name : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.name}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Phone : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.sms_phone}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Picked Call : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.due_follow_ups?.filter(item => item?.call_picked == true)?.length}</span>
                                        </li>
                                        <li>
                                            <span className='text-[16px] font-normal text-headingLightest'>Due Amount : </span>
                                            <span className='text-[14px] font-normal text-white badge bg-green-500'>{followUpData?.total_due_amount ?? 120}</span>
                                        </li>
                                    </ul>
                                    <ul className="w-1/2">
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.father_name}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Total FollowUp : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.due_follow_ups?.length}</span>
                                        </li>
                                        <li>
                                            <span className='text-[16px] font-normal text-headingLightest'>UnPicked Call : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{followUpData?.due_follow_ups?.filter(item => item?.call_picked == false)?.length}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="note"
                                                        value="Note"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="note"
                                                value={
                                                    data.note
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "note",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.note
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-radio-field-styles flex gap-3">
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
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="commitment_date"
                                                        value="Commitment Date"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <DatePicker
                                                selected={commitmentDate}
                                                onChange={(date) =>
                                                    setCommitmentDate(date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Commitment Date"
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
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={handleReset}>Reset</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Save</PrimaryButton>
                        </div>
                    </form>
                    <div className="educare-classroom-table-wrapper bg-supportingA/10 mt-5">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Called Date</th>
                                        <th>Call Status</th>
                                        <th>Follow Up Note</th>
                                        <th>Commit. Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followUpData?.due_follow_ups?.length > 0 ? (
                                        followUpData?.due_follow_ups?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item?.called_date}</td>
                                                <td>{item?.call_picked ? "Picked" : "UnPicked"}</td>
                                                <td>
                                                    <div className='max-w-[150px]'>{item?.note}</div>
                                                </td>
                                                <td>{item?.commitment_date}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

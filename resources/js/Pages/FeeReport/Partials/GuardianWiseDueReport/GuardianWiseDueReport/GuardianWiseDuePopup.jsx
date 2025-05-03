import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";



export default function GuardianWiseDuePopup({
    className = '',
    GuardianWisePopup,
    setGuardianWisePopup,
    studentsData,
    setStudentsData,
    selectedStudentData,
    setSelectedStudentData,
    params
 }) {
    const [commitmentDate, setCommitmentDate] = useState(new Date());
    const [studentsReport, setStudentsReport] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalDue, setTotalDue] = useState(0);
    const [totalPicked, setTotalPicked] = useState(0);
    const [totalUnPicked, setTotalUnPicked] = useState(0);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        post,
        errors,
    } = useForm({
        response_type: "response",
        student_id: "",
        note: "",
        commitment_date: "",
        call_picked: true,
        due_amount: 0,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            commitment_date: commitmentDate
        }))
    }, [commitmentDate]);


    useEffect(() => {
        let students_report = [];

        if (studentsData && Object.keys(studentsData)?.length > 0 && selectedStudentData && Object.keys(selectedStudentData)?.length > 0) {
            students_report = Object.values(studentsData?.student_data)?.filter(item => item?.id != selectedStudentData?.id);

            setTotalAmount(Object?.values(students_report)?.reduce((total, item) => total + item?.total_amount, 0));
            setTotalDiscount(Object?.values(students_report)?.reduce((total, item) => total + item?.total_discount, 0));
            setTotalPayable(Object?.values(students_report)?.reduce((total, item) => total + item?.total_payable, 0));
            setTotalPaid(Object?.values(students_report)?.reduce((total, item) => total + item?.total_paid, 0));
            setTotalDue(Object?.values(students_report)?.reduce((total, item) => total + item?.total_due, 0));
        }
        if (selectedStudentData && Object.keys(selectedStudentData)?.length > 0) {
            setTotalPicked(Object?.values(selectedStudentData?.follow_ups)?.filter((item) => item?.call_picked == true)?.length);
            setTotalUnPicked(Object?.values(selectedStudentData?.follow_ups)?.filter((item) => item?.call_picked == false)?.length);
        }

        setStudentsReport(students_report);

        setData((prevData) => ({
            ...prevData,
            student_id: selectedStudentData?.id ?? "",
            due_amount: selectedStudentData?.total_due ?? 0,
        }));
    },[studentsData, selectedStudentData]);


    // handle save student due follow up start
    const handleStudentDueFollowUpData = (e) => {
        e.preventDefault();

        post(route('fee_report.save_student_due_followup'), {
            preserveScroll: true,
            onSuccess: () => handleSuccess(),
            onError: () => {
                router.post(route("fee_report.guardian_wise_due_report"), params);
            },
            onFinish: () => {},
        });
    };
    // handle save student due follow up start


    // handle success start
    const handleSuccess = () => {
        handleReset();
        router.post(route("fee_report.guardian_wise_due_report"), params);
    }
    // handle success end

    // handle form reset start
    const handleReset = () => {
        reset();
        setCommitmentDate(new Date());
        setData((prevData) => ({
            ...prevData,
            commitment_date: new Date(),
            student_id: selectedStudentData?.id ?? "",
            due_amount: selectedStudentData?.total_due ?? 0,
        }));
    };
    // handle form reset end


    const closeModal = () => {
        setGuardianWisePopup(false);
        setStudentsData({})
        setSelectedStudentData({});
        reset();
        setCommitmentDate(new Date());
    };

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
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={GuardianWisePopup} onClose={closeModal} className="educare-xl-width-modal">
                    <form onSubmit={handleStudentDueFollowUpData} className="p-[30px] pt-2.5">
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
                            <div className="educare-classroom-table-wrapper bg-supportingA/10">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Student</th>
                                                <th>Father</th>
                                                <th>Class</th>
                                                <th>Total</th>
                                                <th>Discount</th>
                                                <th>Payable</th>
                                                <th>Paid</th>
                                                <th>Due</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(studentsReport)?.length > 0 ?
                                                <>
                                                    {Object.values(studentsReport)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.student_name}</td>
                                                            <td>{item?.father_name}</td>
                                                            <td>{item?.classroom_title}</td>
                                                            <td>{formatNumber(item?.total_amount)}</td>
                                                            <td>{formatNumber(item?.total_discount)}</td>
                                                            <td>{formatNumber(item?.total_payable)}</td>
                                                            <td>{formatNumber(item?.total_paid)}</td>
                                                            <td>{formatNumber(item?.total_due)}</td>
                                                        </tr>
                                                    ))}
                                                    < tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>Total</td>
                                                        <td>{formatNumber(totalAmount)}</td>
                                                        <td>{formatNumber(totalDiscount)}</td>
                                                        <td>{formatNumber(totalPayable)}</td>
                                                        <td>{formatNumber(totalPaid)}</td>
                                                        <td>{formatNumber(totalDue)}</td>
                                                    </tr>
                                                </>
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="14">Data not found</td>
                                                </tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="educare-input-field-styles">
                                <ul className='grid grid-cols-12 gap-5'>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Student's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudentData?.name ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudentData?.father_name ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Phone : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudentData?.father_phone ?? ""}</span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Total Follow Up : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>
                                            {selectedStudentData?.follow_ups &&
                                                Object.keys(selectedStudentData?.follow_ups)?.length
                                            }
                                        </span>
                                    </li>
                                    <li className='mb-2 col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Picked Call : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{totalPicked}</span>
                                    </li>
                                    <li className='col-span-12 md:col-span-6'>
                                        <span className='text-[16px] font-normal text-headingLightest'>UnPicked Call: </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{totalUnPicked}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="notes"
                                            value="Notes"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextareaInput
                                    id="notes"
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
                                                value="Response"
                                                checked={data.call_picked == true}
                                                onChange={() => setData("call_picked", true)}
                                            />
                                            <RadioInput
                                                name="call_picked"
                                                value="Not Responded"
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
                            <PrimaryButton  type="button" className="educare-gray-btn-md-stroke" onClick={handleReset}>Reset</PrimaryButton>
                            <PrimaryButton  type= "submit" className="educare-primary-btn-md-fill">Save</PrimaryButton>
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
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedStudentData?.follow_ups && Object.keys(selectedStudentData?.follow_ups)?.length > 0 ?
                                                    Object.values(selectedStudentData?.follow_ups)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>{item?.called_date ?? ""}</td>
                                                            <td>{item?.call_picked == true ? 'Picked' : 'UnPicked'}</td>
                                                            <td>{item?.note ?? ""}</td>
                                                            <td>{item?.commitment_date ?? ""}</td>
                                                            {/* <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className="educare-warning-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td> */}
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="14">Data not found</td>
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

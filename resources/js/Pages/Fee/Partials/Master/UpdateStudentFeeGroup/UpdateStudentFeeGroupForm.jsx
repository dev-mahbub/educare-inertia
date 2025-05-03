import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateStudentFeeGroupForm = ({ classrooms = [], studentFeeInstallments = [], students = [], feeStructureLists = [] }) => {

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [filteredFeeStructureData, setFilteredFeeStructureData] = useState({});
    const [filteredFeeStructureLists, setFilteredFeeStructureLists] = useState({});
    const [unpaidStudentFeeInstallments, setUnpaidStudentFeeInstallments] = useState([]);

    const [selectedFeeInstallmentIds, setSelectedFeeInstallmentIds] = useState([]);
    const [selectedOldFeeInstallmentIds, setSelectedOldFeeInstallmentIds] = useState([]);

    const [selectedNewFeeInstallments, setSelectedNewFeeInstallments] = useState([]);
    const [selectedOldFeeInstallments, setSelectedOldFeeInstallments] = useState([]);

    const [showOldFeeStructure, setShowOldFeeStructure] = useState(false);
    const [showCompareFee, setShowCompareFee] = useState(false);



    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        fee_structure_id: "",
        new_fee_ids: selectedFeeInstallmentIds,
        old_fee_ids: selectedOldFeeInstallmentIds,
    });


    useEffect(() => {
        setFilteredFeeStructureLists(feeStructureLists?.filter(item => item?.class_name_ids?.includes(selectedStudent?.class_name_id)));
    },[feeStructureLists])

    // store new fee ids and old fee ids value in form data
    useEffect(() => {
        if (filteredFeeStructureData?.id != null) {
            setSelectedNewFeeInstallments(Object?.values(filteredFeeStructureData?.fee_installments)?.filter(item => selectedFeeInstallmentIds?.includes(item?.fee_id)));
        }

        setData((prevData) => ({
            ...prevData,
            new_fee_ids: selectedFeeInstallmentIds
        }))
    }, [selectedFeeInstallmentIds, filteredFeeStructureData]);

    useEffect(() => {
        setSelectedOldFeeInstallments(Object.values(studentFeeInstallments)?.filter(item => selectedOldFeeInstallmentIds?.includes(item?.fee?.id)));

        setData((prevData) => ({
            ...prevData,
            old_fee_ids: selectedOldFeeInstallmentIds
        }))
    }, [selectedOldFeeInstallmentIds, studentFeeInstallments]);
    // end store new fee ids and old fee ids value in form data


    // get student by classroom id
    const handleClassroomChange = (id) => {
        setFilteredStudents(students?.filter(student => student?.classroom_id == id));

        setData((prevData) => ({
            ...prevData,
            admission_no: "",
            classroom_id: id,
            student_id: "",
        }));
    }
    // end get student by classroom id


    // get selected fee structure data
    const handleFeeStructureChange = (id) => {
        setFilteredFeeStructureData(filteredFeeStructureLists?.find(item => item?.id == id));

        setData((prevData) => ({
            ...prevData,
            fee_structure_id: id,
        }))

        if(id == "") {
            setSelectedFeeInstallmentIds([]);
        }
    }
    // end get selected fee structure data

    // store selected fee installment id
    const handleCheckboxSelect = (id) => {
        if ([...selectedFeeInstallmentIds]?.includes(id)) {
            setSelectedFeeInstallmentIds([...selectedFeeInstallmentIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeInstallmentIds([
                ...selectedFeeInstallmentIds,
                id,
            ]);
        }
    }


    // end store selected fee installment id
    // store selected fee installment id
    const handleOldFeeCheckboxSelect = (id) => {
        if ([...selectedOldFeeInstallmentIds]?.includes(id)) {
            setSelectedOldFeeInstallmentIds([...selectedOldFeeInstallmentIds].filter((item) => item !== id));
        }
        else {
            setSelectedOldFeeInstallmentIds([
                ...selectedOldFeeInstallmentIds,
                id,
            ]);
        }
    }
    // end store selected fee installment id

    // get student fee installments
    const handleStudentChange = (e) => {
        const selectedStudent = filteredStudents.find(student => student.id == e.target.value);

        setFilteredFeeStructureLists([]);

        handleFormReset();

        setData((prevData) => ({
            ...prevData,
            admission_no: selectedStudent?.admission_no ?? '',
            student_id: e.target.value,
        }));

        setSelectedStudent(selectedStudent);

        getStudentFeeInstallmentsById(e);
    }

    const getStudentFeeInstallmentsById = (e) => {
        e.preventDefault();

        router.post(route('fee.update_fee_to_student'), {student_id: e.target.value});
    }
    // end get student fee installments


    // handle assign new fee structure form
    const handleShowOldFeeInstallments = (e) => {
        e.preventDefault();

        if (selectedNewFeeInstallments?.length > 0) {
            setUnpaidStudentFeeInstallments(Object?.values(studentFeeInstallments)?.filter(fee => fee?.payment_status === 'Due'));

            setShowOldFeeStructure(true);
        }
        else {
            toast.error("Please select at least one fee from new structure", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
    }

    const handleHideOldFeeInstallments = (e) => {
        e.preventDefault();

        setShowOldFeeStructure(false);
    }

    const handleShowComapareFeeInstallments = (e) => {
        e.preventDefault();

        setShowOldFeeStructure(false);
        setShowCompareFee(true);
    }

    const handleHideComapareFeeInstallments = (e) => {
        e.preventDefault();

        setShowOldFeeStructure(true);
        setShowCompareFee(false);
    }
    // end handle assign new fee structure form


    // update student fee structure
    const handleUpdateStudentFeeStructure = (e) => {
        e.preventDefault();

        put(route('fee.update_fee_to_student.update'), {
            onSuccess: ({ props }) => {
                handleFormReset();

                router.post(route('fee.update_fee_to_student'), { student_id: selectedStudent?.id });
            },
            onError: (errors) => {

            }
        })
    }
    // end update student fee structure


    // reset form
    const handleFormReset = () => {
        setFilteredFeeStructureData({});
        setSelectedFeeInstallmentIds([])
        setSelectedOldFeeInstallmentIds([])
        setShowOldFeeStructure(false)
        setShowCompareFee(false)

        setData((prevData) => ({
            ...prevData,
            fee_structure_id: "",
            new_fee_ids: [],
            old_fee_ids: [],
        }))
    }
    // end reset form


    return (
        <div className='update-student-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="lg:col-span-6 col-span-12">
                    <div className="educare-class-form-box-wrapper">
                        <div className="educare-create-school-details-form-wrap">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Change Student Fee Group
                                </h5>
                            </div>
                            <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
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
                                                placeHolder="Ad No."
                                            />
                                            <InputError
                                                message={
                                                    errors.admission_no
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="classroom_id"
                                                data_label="Class"
                                                data={classrooms}
                                                value={
                                                    data.classroom_id
                                                }
                                                onChange={(e) => {
                                                        handleClassroomChange(e.target.value);
                                                    }
                                                }
                                                type="text"
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
                                    <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="student_id"
                                                data_label="Student"
                                                data={filteredStudents}
                                                value={
                                                    data.student_id
                                                }
                                                onChange={(e) => {
                                                        handleStudentChange(e)
                                                    }
                                                }
                                                type="text"
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
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <h5 className='text-[15px] font-semibold text-headingLight'>Student Type :</h5>
                                            {selectedStudent?.id != null &&
                                                <span className='badge info'>{selectedStudent?.boarding_type}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {selectedStudent?.id != null &&
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sr.</th>
                                                    <th>Title</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(studentFeeInstallments)?.length > 0 ?
                                                    Object.values(studentFeeInstallments)?.map((feeInstallment, index )=> (
                                                        <tr key={index} className={feeInstallment?.payment_status == 'Paid' ? 'bg-success' : (feeInstallment?.payment_status == 'Partial' ? 'bg-danger' : '')}>
                                                            <td>{++index}</td>
                                                            <td>{feeInstallment?.fee?.title}</td>
                                                            {feeInstallment?.payment_status == 'Due' ?
                                                                <td>{feeInstallment?.total_payable_amount}</td>
                                                            :
                                                                <td>{`payable = ${feeInstallment?.total_payable_amount}, paid = ${feeInstallment?.total_paid_amount}, due = ${feeInstallment?.total_due_amount}`}</td>
                                                            }
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="10">Student Does not have any fee.</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {(selectedStudent?.id != null && Object.keys(studentFeeInstallments)?.length > 0) &&
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <form onSubmit={handleUpdateStudentFeeStructure}>
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Change Day Scholar / Day Boarding
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="dummy_11"
                                                                value="Please Select Day Boarding Group Structure"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="fee_structure_id"
                                                        data_label="Group"
                                                        value={
                                                            data.fee_structure_id
                                                        }
                                                        data={filteredFeeStructureLists}
                                                        onChange={(e) =>
                                                            handleFeeStructureChange(e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.fee_structure_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {(!showOldFeeStructure && !showCompareFee) &&
                                        <div className="educare-classroom-table-wrapper">
                                            <div className="educare-default-table xs:overflow-x-auto">
                                                <div>
                                                    <h5 className="font-bold">Please select installments for assign new structure</h5>
                                                </div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Sr.</th>
                                                            <th>Title</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredFeeStructureData?.id != null && Object.keys(filteredFeeStructureData?.fee_installments)?.length > 0 ?
                                                            Object?.values(filteredFeeStructureData?.fee_installments)?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <Checkbox
                                                                            name="fee_id"
                                                                            checked={
                                                                                selectedFeeInstallmentIds?.includes(item?.fee_id)
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleCheckboxSelect(item?.fee_id)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>{++index}</td>
                                                                    <td>{item?.fee_title}</td>
                                                                    <td>{item?.total_fee_amount}</td>
                                                                </tr>
                                                            ))
                                                        :
                                                            <tr>
                                                                <td className="text-center text-red-500" colSpan="10">Data not found.</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-3">
                                                <PrimaryButton
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={(e) =>  {
                                                        handleShowOldFeeInstallments(e);
                                                    }}
                                                >
                                                    Assign New Structure
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    }

                                    {showOldFeeStructure &&
                                        <div className="educare-classroom-table-wrapper">
                                            <div className="educare-default-table xs:overflow-x-auto">
                                                <div>
                                                    <h5 className="font-bold">Select installments for delete from existing structure</h5>
                                                </div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Sr.</th>
                                                            <th>Title</th>
                                                            <th>Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.keys(unpaidStudentFeeInstallments)?.length > 0 ?
                                                            Object?.values(unpaidStudentFeeInstallments)?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <Checkbox
                                                                            name="fee_id"
                                                                            checked={
                                                                                selectedOldFeeInstallmentIds?.includes(item?.fee?.id)
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleOldFeeCheckboxSelect(item?.fee?.id)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>{++index}</td>
                                                                    <td>{item?.fee?.title}</td>
                                                                    <td>{item?.total_payable_amount}</td>
                                                                </tr>
                                                            ))
                                                        :
                                                            <tr>
                                                                <td className="text-center text-red-500" colSpan="10">Data not found.</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-3">
                                                <PrimaryButton
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={(e) => {
                                                        handleHideOldFeeInstallments(e);
                                                    }}
                                                >
                                                    Back
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={(e) =>  {
                                                        handleShowComapareFeeInstallments(e);
                                                    }}
                                                >
                                                    Confirm
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    }

                                    {showCompareFee &&
                                        <div className="educare-classroom-table-wrapper">
                                            <div className="educare-default-table xs:overflow-x-auto flex justify-between">
                                                <div className="mr-3 w-full">
                                                    <div className="educare-success-btn-lg-fill w-full text-center">
                                                        <span className="w-full text-center !text-sm ">Added New Installment</span>
                                                    </div>
                                                    <table >
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.</th>
                                                                <th>Title</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedNewFeeInstallments?.length > 0 ?
                                                                selectedNewFeeInstallments?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{++index}</td>
                                                                        <td>{item?.fee_title}</td>
                                                                    </tr>
                                                                ))
                                                                :
                                                                <tr>
                                                                    <td className="text-center text-red-500" colSpan="10">No fee selected.</td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="w-full">
                                                    <div className="educare-danger-btn-lg-fill w-full text-center">
                                                        <span className="w-full text-center !text-sm ">Removed from existing Fee</span>
                                                    </div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Sr.</th>
                                                                <th>Title</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedOldFeeInstallments?.length > 0 ?
                                                                selectedOldFeeInstallments?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{++index}</td>
                                                                        <td>{item?.fee?.title}</td>
                                                                    </tr>
                                                                ))
                                                                :
                                                                <tr>
                                                                    <td className="text-center text-red-500" colSpan="10">No fee selected.</td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <PrimaryButton
                                                    type="button"
                                                    className="educare-primary-btn-md-fill"
                                                    onClick={(e) => {
                                                        handleHideComapareFeeInstallments(e);
                                                    }}
                                                >
                                                    Back
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    type="submit"
                                                    className="educare-primary-btn-md-fill"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default UpdateStudentFeeGroupForm;

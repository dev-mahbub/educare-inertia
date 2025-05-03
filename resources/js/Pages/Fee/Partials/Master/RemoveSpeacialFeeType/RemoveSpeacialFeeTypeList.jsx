import Checkbox from '@/Components/Checkbox';
import Loader from '@/Components/Loader';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import SpeacialTypePopup from './Popup/SpeacialTypePopup';
import RemoveSpeacialFeeTypeListFilter from './RemoveSpeacialFeeTypeListFilter';

const RemoveSpeacialFeeTypeList = ({
    specialFeeTypes = [],
    classrooms = [],
    specialFeeAssignedStudents = [],
}) => {

    const [specialFeeAssignedStudentsData, setSpecialFeeAssignedStudentsData] = useState([]);
    const [specialFeeByStudent, setspecialFeeByStudent] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [feeId, setFeeId] = useState(null);
    const [feeTypeId, setFeeTypeId] = useState(null);
    const [classNameId, setClassNameId] = useState(null);
    const [classroomId, setClassroomId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkAllStudent, setCheckAllStudent] = useState(false);

    const [speacialTypePopup, setSpeacialTypePopup] = useState(false);
    const handleFirstPopupClick = () => {
        setSpeacialTypePopup(!speacialTypePopup);
    };


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_student_id: "",
        student_ids: selectedStudentIds,
        fee_id: feeId,
        fee_type_id: feeTypeId,
        class_name_id: classNameId,
        classroom_id: classroomId,
    });

    useEffect(() => {
        setSpecialFeeAssignedStudentsData(specialFeeAssignedStudents);
        setLoading(false)
    }, [specialFeeAssignedStudents])


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_ids: selectedStudentIds,
        }));
    }, [selectedStudentIds])

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_type_id: feeTypeId,
        }));
    }, [feeTypeId])


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: classNameId,
        }));
    }, [classNameId])


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: classroomId,
        }));
    }, [classroomId])

    useEffect(() => {
        if (selectedStudentIds?.length <= 0) {
            setCheckAllStudent(false)
        }
        else {
            setCheckAllStudent(selectedStudentIds?.length === Object.keys(specialFeeAssignedStudentsData)?.length)
        }

        setData((prevData) => ({
            ...prevData,
            student_ids: selectedStudentIds
        }))
    }, [selectedStudentIds])


    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_student_id") {
            if (value === true) {
                setSelectedStudentIds(Object.values(specialFeeAssignedStudentsData)?.map((item) => item?.student_id))
            }
            else {
                setSelectedStudentIds([])
            }

            setCheckAllStudent(value);
        }
    };
    //handle Checkbox end



    const classroomIdFromChild = (id) => {
        setClassroomId(id);
    }


    const classNameIdFromChild = (id) => {
        setClassNameId(id);
    }


    // add checkbox value to array
    const setSelectedStudentId = (id) => {
        if ([...selectedStudentIds]?.includes(id)) {
            setSelectedStudentIds([...selectedStudentIds].filter((item) => item !== id));
        }
        else {
            setSelectedStudentIds([
                ...selectedStudentIds,
                id,
            ]);
        }

        const updateSelectedStudentIds = [...selectedStudentIds];


        setData((prevData) => ({
            ...prevData,
            student_ids: updateSelectedStudentIds
        }))
    };


    const setSpecialFeeByStudentData = (studentId) => {
        setspecialFeeByStudent(specialFeeAssignedStudentsData[studentId]);
    }

    const removeSpecialFeeType = (e, student_ids, fee_type_id, class_name_id = null, fee_id = null) => {
        e.preventDefault();

        const sendData = {
            'student_ids': student_ids,
            'fee_type_id': fee_type_id,
            'class_name_id': class_name_id,
            'classroom_id': data.classroom_id,
            'fee_id': fee_id,
        };

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('fee.remove_special_type.delete'), sendData, {
                    onSuccess: ({ props }) => {
                        setSelectedStudentIds([]);
                        setLoading(false);

                        router.post(route("fee.remove_special_type"), {
                            classroom_id: data?.classroom_id,
                            fee_type_id: fee_type_id,
                        });
                    },
                    onError: (errors) => {
                        if (errors) {
                            let count = 0;

                            for (let key in errors) {
                                count++;

                                if (errors.hasOwnProperty(key)) {
                                    toast.error(errors[key], {
                                        position: 'top-right',
                                        autoClose: 1500,
                                    });
                                }

                                if (count >= 1) {
                                    break;
                                }
                            }

                        }

                        setLoading(false);

                        router.post(route("fee.remove_special_type"), {
                            classroom_id: data?.classroom_id,
                            fee_type_id: fee_type_id,
                        });
                    }
                });

                setSpeacialTypePopup(false);
            }
        });
    }


    return (
        <>
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Special fee type Student list
                </h5>
            </div>
                <RemoveSpeacialFeeTypeListFilter
                    specialFeeTypes={specialFeeTypes}
                    classrooms={classrooms}
                    setFeeTypeId={setFeeTypeId}
                    sendClassRoomIdToParent={classroomIdFromChild}
                    sendClassNameIdToParent={classNameIdFromChild}
                    removeSpecialFeeType={removeSpecialFeeType}
                    studentIds={selectedStudentIds}
                    specialFeeAssignedStudents={specialFeeAssignedStudentsData}
                    setLoading={setLoading}
                    setSelectedStudentIds={setSelectedStudentIds}
                />
            <div className="grid grid-cols-12 gap-5">
                <div className="xl:col-span-8 col-span-12">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="select_all_student_id"
                                                name="select_all_student_id"
                                                checked={
                                                    checkAllStudent
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                }
                                            />
                                        </div>
                                    </th>
                                    <th>Admission No.</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ?
                                <Loader></Loader>
                            :
                                <tbody>
                                    {Object.keys(specialFeeAssignedStudentsData)?.length > 0 ? (
                                        Object.values(specialFeeAssignedStudentsData)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="student_id"
                                                            name="student_id"
                                                            checked={
                                                                selectedStudentIds.includes(item?.student_id)
                                                            }
                                                            onChange={(e) => {
                                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                                    setSelectedStudentId(item?.student_id)
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>{item?.admission_no}</td>
                                                <td>{`${item?.first_name} ${item?.middle_name} ${item?.last_name}`}</td>
                                                <td>{item?.classroom?.title}</td>
                                                <td>{item.fee[0].fee_type?.amount}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete Installment Wise"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button type='button'
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={ () => {
                                                                        handleFirstPopupClick();
                                                                        setSpecialFeeByStudentData(item?.student_id);
                                                                    }}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete From All Installment"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href="#"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    as="button"
                                                                    onClick={(e) => {
                                                                        setData('student_ids', item?.student_id);
                                                                        removeSpecialFeeType(e, [item?.student_id], data.fee_type_id, item?.classroom?.class_name_id);
                                                                    }}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                    )}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
                <div className="xl:col-span-4 col-span-12 mt-1">
                    <div className="educare-input-field-notes">
                        <h6>Attention !</h6>
                        <ul>
                            <li>
                                Use this option , to remove the existing special fee type assignements.
                            </li>
                            <li className='pt-1'>
                                <strong >Note -</strong> This option will remove only unpaid installments. All Paid installments will still reflect the fee amount.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <SpeacialTypePopup
            speacialTypePopup={speacialTypePopup}
            setSpeacialTypePopup={setSpeacialTypePopup}
            specialFeeTypes={specialFeeByStudent}
            removeSpecialFeeType={removeSpecialFeeType}
        />
        </>
    );
};

export default RemoveSpeacialFeeTypeList;

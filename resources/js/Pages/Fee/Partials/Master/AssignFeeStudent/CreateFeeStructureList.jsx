import Checkbox from "@/Components/Checkbox";
import Loader from "@/Components/Loader";
import PrimaryButton from '@/Components/PrimaryButton';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";


const CreateFeeStructureList = ({
    studentsWithFeeStructureData = [],
    selectedFeeStructureId = null,
    sendSaveStatusToParent,
    sendRemoveStatusToParent,
    loading,
    classroomId,
    empCatId,
    setLoading
}) => {

    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [studentCheckedAll, setStudentCheckedAll] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        delete: destroy,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        student_ids: selectedStudentIds,
        fee_structure_id: selectedFeeStructureId,
    });

    useEffect(() => {
        setData('student_ids', selectedStudentIds);
    }, [selectedStudentIds]);


    useEffect(() => {
        setData('fee_structure_id', selectedFeeStructureId);
    }, [selectedFeeStructureId]);


    useEffect(() => {
        if (selectedStudentIds?.length <= 0) {
            setStudentCheckedAll(false)
        }
        else {
            setStudentCheckedAll(selectedStudentIds?.length === studentsWithFeeStructureData?.filter(item => item?.fee_structure == null)?.length)
        }
    }, [selectedStudentIds, studentsWithFeeStructureData]);


    const setSelectedStudentId = (id) => {
        if(selectedStudentIds?.includes(id)){
            setSelectedStudentIds([...selectedStudentIds]?.filter(item => item !== id))
        }
        else {
            setSelectedStudentIds([...selectedStudentIds, id]);
        }
    }


    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_student") {
            if (value === true) {
                setSelectedStudentIds(studentsWithFeeStructureData?.filter(item => item?.fee_structure == null)?.map((item) => item.id))
            }
            else {
                setSelectedStudentIds([])
            }

            setStudentCheckedAll(value);
        }
    };
    //handle Checkbox end

    // handle filter data start
    const handleFilterData = () => {
        setLoading(false);

        const form_data = {
            classroom_id: classroomId,
            employment_cat_id: empCatId,
        }

        router.post(route('fee.assign_fee_to_student'), form_data);
    }
    // handle filter data end


    // handle assign student fee structure start
    const handleAssignFeeStructureToStudent = (e) => {
        e.preventDefault();

        post(route('fee.assign_fee_to_student.save'), {
            onSuccess: ({ props }) => {
                setSelectedStudentIds([])
                sendSaveStatusToParent(true);
                handleFilterData()
            },
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    count++;

                    if (key === 'fee_structure_id') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (key === 'student_ids' || key.split('.')[0] === 'amount') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (count >= 1) {
                        break;
                    }
                }
            }
        })
    }
    // handle assign student fee structure start


    // handle remove student fee structure start
    const handleRemoveStudentFeeStructure = (id) => {
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
                destroy(route('fee.assign_fee_to_student.delete', id), {
                    onSuccess: ({ props }) => {
                        handleFilterData()
                        setSelectedStudentIds([])
                        sendRemoveStatusToParent(true);
                    }
                });
            }
        });
    }
    // handle remove student fee structure end

    return (

        <div className="educare-admission-list-area">
            <div className="educare-admission-list-inner">
                <div className="educare-admission-list-inner-wrapper">
                    <form onSubmit={handleAssignFeeStructureToStudent}>
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="select_all_student"
                                                    name="select_all_student"
                                                    checked={studentCheckedAll}
                                                    onChange={(e) => handleCheckboxSelect(e.target.name, e.target.checked)} />
                                            </div>
                                        </th>
                                        <th>Adm.No.</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Roll No.</th>
                                        <th>Father Name</th>
                                        <th>Employment Category</th>
                                        <th>Mobile</th>
                                        <th>Fee Group Template</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {Object.keys(studentsWithFeeStructureData)?.length > 0 ?
                                            Object.values(studentsWithFeeStructureData)?.map((item, index) => (
                                                <tr key={index} className={item?.fee_structure != null ? 'bg-success' : ''}>
                                                    <td>
                                                        {item?.fee_structure == null &&
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id="student_id"
                                                                    name="student_id"
                                                                    checked={selectedStudentIds?.includes(item?.id)}
                                                                    onChange={(e) => {
                                                                        setSelectedStudentId(item?.id);
                                                                    } } />
                                                            </div>}
                                                    </td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                                    <td>{item?.classroom?.title}</td>
                                                    <td>{item?.classroom_roll?.roll_no ?? ""}</td>
                                                    <td>{`${item?.father?.first_name ?? ""} ${item?.father?.middle_name ?? ""} ${item?.father?.last_name ?? ""}`}</td>
                                                    <td>{item?.employment_category?.title ?? ""}</td>
                                                    <td>{item?.father?.sms_phone ?? ""}</td>
                                                    <td>{item?.fee_structure?.title ?? ""}</td>
                                                    <td>
                                                        {item?.fee_structure &&
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <PrimaryButton
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleRemoveStudentFeeStructure(item?.id)
                                                                        }}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </PrimaryButton>
                                                                </div>
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>

                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>}
                                    </tbody>
                                }
                            </table>
                        </div>
                        {selectedStudentIds?.length > 0 &&
                            <div className="mt-2">
                                <Tooltip
                                    title="View Structure"
                                    placement="top"
                                    arrow
                                >
                                    <button type="submit" className="educare-primary-btn-md-fill"
                                    >
                                        Associate fee structure to student
                                    </button>
                                </Tooltip>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>

    );
};

export default CreateFeeStructureList;

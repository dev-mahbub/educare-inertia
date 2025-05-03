import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SaleDuePopup({
    className = '',
    listPopup,
    setListPopup,
    filteredStudents,
    selectedStudent
}) {

    const [studentsData, setStudentsData] = useState([]);

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
        student_name: "",
        father_name: "",
    });

    useEffect(() => {
        setStudentsData(filteredStudents);
    }, [filteredStudents]);

    // handle filter student start
    const handleFilterStudent = (e) => {
        e.preventDefault();

        const form_data = {
            request_type: 'filter_student',
            audience_type: 'Student',
            student_id: selectedStudent?.id,
            admission_no: data?.admission_no,
            student_name: data?.student_name,
            father_name: data?.father_name
        }

        router.post(route('sale_due_payment'), form_data);
    }
    // handle filter student end

    // handle select filtered student start
    const handleSelectFilteredStudent = (id) => {
        const form_data = {
            student_id: id,
            audience_type: 'Student',
            request_type: "",
        }

        router.post(route('sale_due_payment'), form_data);

        closeModal();
    }
    // handle select filtered student end


    // handle form and students data reset start
    const handleReset = () => {
        reset();
        setStudentsData([]);
    }
    // handle form and students data reset end
    const closeModal = () => {
        setListPopup(false);
        handleReset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Select student by search</h5>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 grid grid-cols-12 gap-3">
                                <div className='col-span-12 md:col-span-6 lg:col-span-3'>
                                    <div className="educare-input-field-styles">
                                        <TextInput
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
                                            placeHolder="Adm No."
                                        />
                                        <InputError
                                            message={
                                                errors.admission_no
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className='col-span-12 md:col-span-6 lg:col-span-3'>
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={
                                                data.student_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "student_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Student Name"
                                        />
                                        <InputError
                                            message={
                                                errors.student_name
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className='col-span-12 md:col-span-6 lg:col-span-3'>
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={
                                                data.father_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "father_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                            placeHolder="Father Name"
                                        />
                                        <InputError
                                            message={
                                                errors.father_name
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className='col-span-12 md:col-span-6 lg:col-span-3'>
                                    <div className="educare-header-filtar-bar-action educare-filter-action-btn flex gap-2">
                                        <div>
                                            <Tooltip
                                                title="Search"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-secondary-btn-md-fill"
                                                    onClick={handleFilterStudent}
                                                >
                                                    <i className="icon-search-interface-symbol"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip
                                                title="Reset"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <button
                                                    type="button"
                                                    className="educare-gray-btn-md-fill"
                                                    onClick={handleReset}
                                                >
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Adm.No</th>
                                                <th>Roll.No</th>
                                                <th>Class</th>
                                                <th>Student Name</th>
                                                <th>Parent Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentsData?.length > 0 ?
                                                studentsData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className='text-blue-600'
                                                                onClick={(e) => {
                                                                    handleSelectFilteredStudent(item?.id)
                                                                }}
                                                            >
                                                                {item?.admission_no}
                                                            </button>
                                                        </td>
                                                        <td>{item?.classroom_roll?.roll_no}</td>
                                                        <td>{item?.classroom?.title}</td>
                                                        <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                        <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="5"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}

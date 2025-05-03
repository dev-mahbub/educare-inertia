import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSiblingPopupForm({
    students,
    editSiblingPopupOpen,
    setSiblingEditPopupOpen,
    enquiry,
    formData,
    setFormData,
    setSelectedSibling,
    selectedSibling
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
        student_first_name: "",
        father_first_name: "",
        father_mobile: "",
    });

    useEffect(() => {
        setStudentsData(students);
    }, [students]);

    const closeModal = () => {
        setSiblingEditPopupOpen(false);
    };

    const searchStudentFilterData = (e) => {
        e.preventDefault();
    };

    // handle select sibling start
    const handleSelectSibling = (id) => {
        const student = studentsData?.find(item => item?.id == id);

        setSelectedSibling(student);

        setFormData((prevData) => ({
            ...prevData,
            father_first_name : student?.father?.first_name ?? "",
            father_middle_name : student?.father?.middle_name ?? "",
            father_last_name : student?.father?.last_name ?? "",
            father_email : student?.father?.email ?? "",
            father_mobile : student?.father?.phone ?? "",
            father_sms_number : student?.father?.sms_phone ?? "",
            father_highest_qualification : student?.father?.highest_qualification ?? "",
            father_occupation : student?.father?.occupation ?? "",
            father_income_per_year : student?.father?.income_per_year ?? "",
            father_department : student?.father?.department ?? "",
            father_designation : student?.father?.designation ?? "",
            father_aadhar_card_no : student?.father?.aadhar_card_no ?? "",
            father_pan_card_no : student?.father?.pan_card_no ?? "",
            father_office_address : student?.father?.office_address ?? "",
            father_company_name : student?.father?.company_name ?? "",
        }));
    }
    // handle select sibling end

    // handle filter student start
    const handleFilterStudent = (e) => {
        e.preventDefault();

        if(data?.admission_no == "" && data?.student_first_name == "" && data?.father_first_name == "" && data?.father_mobile == "") {
            toast.error("Please type admission number, student name father name or father mobile to search!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            let form_data = {
                admission_no: data?.admission_no ?? "",
                student_first_name: data?.student_first_name ?? "",
                father_first_name: data?.father_first_name ?? "",
                father_mobile: data?.father_mobile ?? "",
                academic_year_id: formData?.academic_year_id ?? ""
            }

            if (enquiry?.id != null) {
                form_data = {
                    enquiry_id: enquiry?.id,
                    admission_no : data?.admission_no ?? "",
                    student_first_name : data?.student_first_name ?? "",
                    father_first_name : data?.father_first_name ?? "",
                    father_mobile : data?.father_mobile ?? "",
                    academic_year_id: formData?.academic_year_id ?? ""
                }
            }

            router.post(route('admission_enquery_reg.create_registration'), form_data);
        }
    }
    // handle filter student end

    // handle form and students data reset start
    const handleReset = () => {
        reset();
        setStudentsData([]);
    }
    // handle form and students data reset end

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editSiblingPopupOpen} onClose={closeModal} className="educare-xl-width-modal">
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                        <div className="educare-popup-form-header py-3 flex flex-wrap gap-2.5 justify-between">
                            <h5>Select student by search</h5>
                            {selectedSibling?.id != null &&
                                <p className='text-success'>Parent Selected</p>
                            }
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <form onSubmit={searchStudentFilterData}>
                                            <div className=" educare-header-filtar-bar-inner-main">
                                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                    <div className="educare-header-filtar-bar-fields-area relative">
                                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.admission_no}
                                                                    onChange={(e) => setData("admission_no", e.target.value)}
                                                                    placeHolder="Admission no."
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.student_first_name}
                                                                    onChange={(e) => setData("student_first_name", e.target.value)}
                                                                    placeHolder="Student first name"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.father_first_name}
                                                                    onChange={(e) => setData("father_first_name", e.target.value)}
                                                                    placeHolder="Father first name"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.father_mobile}
                                                                    onChange={(e) => setData("father_mobile", e.target.value)}
                                                                    placeHolder="Father Mobile"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                            </div>
                                                        </div>
                                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                                    </div>
                                                </div>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                                    <div className="educare-button-field-styles">
                                                        <Tooltip
                                                            title="Search"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button type='button'
                                                                className="educare-secondary-btn-md-fill"
                                                                onClick={handleFilterStudent}
                                                            >
                                                                <i className="icon-search-interface-symbol"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <Tooltip
                                                            title="Reset"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-gray-btn-md-fill"
                                                                onClick={(e) => {
                                                                    handleReset()
                                                                }}
                                                            >
                                                                <i className="icon-ArrowsClockwise"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="educare-admission-list-inner bg-supportingA/10">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Adm.No</th>
                                            <th>Roll No.</th>
                                            <th>Class</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {studentsData?.length > 0 ?
                                                studentsData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.admission_no ?? ""}</td>
                                                        <td>{item?.classroom_roll?.roll_no ?? ""}</td>
                                                        <td>{item?.classroom?.title ?? ""}</td>
                                                        <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                                        <td>
                                                            <Tooltip
                                                                title="Click"
                                                                placement="top"
                                                                arrow
                                                                as="button"
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className='hover:text-blue-600'
                                                                    onClick={(e) => {
                                                                        handleSelectSibling(item?.id)
                                                                    }}
                                                                >
                                                                    {`${item?.father?.first_name ?? ""} ${item?.father?.middle_name ?? ""} ${item?.father?.last_name ?? ""}`}
                                                                </button>
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="8">
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
            </Modal>
        </div>
    );
}

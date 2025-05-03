import InputError from '@/Components/InputError';
import Loader from "@/Components/Loader";
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

import { useEffect, useState } from 'react';

import useScrollableFilterBar from "@/Utils/FilterArrow";


export default function SearchStudentPopup({
    modalSearchStudentOpen,
    setModalSearchStudentOpen,
    filteredStudentsData = [],
    selectedStudent,
    getStudentFeeInstallments
 }) {

    const [studentsData, setStudentsData] = useState([]);
    const [filterLoading, setFilterLoading] = useState(true);

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
        father_mobile: "",
        mother_name: "",
        mother_mobile: "",
    });


    useEffect(() => {
        setStudentsData(filteredStudentsData);
        setFilterLoading(false);
    }, [filteredStudentsData]);

    const handleFilteredStudentSelect = (id) => {
        const form_data = {
            student_id: id,
            request_type: "fetch_fee_installments",
        }

        getStudentFeeInstallments(form_data);
        closeModal();
    }


    // handle filter student start
    const handleFilterStudent = (e) => {
        e.preventDefault();

        setFilterLoading(true);

        data['request_type'] = "filter_student";
        data['student_id'] = selectedStudent?.id;

        router.post(route('fee.installment_payment'), data);
    }
    // handle filter student end


    // handle form and students data reset start
    const handleReset = () => {
        reset();
        setStudentsData([]);
    }
    // handle form and students data reset end



    // close modal and reset data start
    const closeModal = () => {
        handleReset();
        setModalSearchStudentOpen(false);
    };
    // close modal and reset data end

    const searchStudentFilterData = (e) => {
        e.preventDefault();

        // post(route("school.save"), {
        //     preserveScroll: true,
        //     onSuccess: () => reset(),
        //     onError: (errors) => {
        //         // if (errors.landmarks_id) {
        //         //     reset("landmarks_id");
        //         //     landmarksInput.current.focus();
        //         // }
        //     },
        // });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={modalSearchStudentOpen} onClose={closeModal} className="educare-xl-width-modal">
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                        <div className="educare-popup-form-header py-3 flex flex-wrap gap-2.5 justify-between">
                            <h5>Select student by search</h5>
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                {/* <div className="educare-admission-filtar-bar">
                                    <div className="educare-admission-filtar-bar-filter">
                                        <form onSubmit={searchStudentFilterData}>
                                            <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                                                <span className="educare-admission-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                                <div className="educare-admission-filtar-bar-filter-fields" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>

                                                </div>
                                                <span className="educare-admission-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                            </div>
                                            <div className="educare-admission-filtar-bar-filter-action">
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
                                            </ div>
                                        </form>
                                    </div>
                                </div> */}

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
                                                                    placeHolder="Admission No."
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.admission_no} className="mt-2" />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.student_name}
                                                                    onChange={(e) => setData("student_name", e.target.value)}
                                                                    placeHolder="Student Name"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.student_name} className="mt-2" />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.father_name}
                                                                    onChange={(e) => setData("father_name", e.target.value)}
                                                                    placeHolder="Father Name"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.father_name} className="mt-2" />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.father_mobile}
                                                                    onChange={(e) => setData("father_mobile", e.target.value)}
                                                                    placeHolder="Father Mobile"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.father_mobile} className="mt-2" />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.mother_name}
                                                                    onChange={(e) => setData("mother_name", e.target.value)}
                                                                    placeHolder="Mother Name"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.mother_name} className="mt-2" />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    value={data.mother_mobile}
                                                                    onChange={(e) => setData("mother_mobile", e.target.value)}
                                                                    placeHolder="Mother Mobile"
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError message={errors.mother_mobile} className="mt-2" />
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
                                            <th>Mobile No.</th>
                                            <th>Mother Name </th>
                                            <th>Mother Mobile</th>
                                        </tr>
                                    </thead>
                                    {filterLoading ?
                                        <Loader></Loader>
                                    :
                                        <tbody>
                                            {studentsData?.length > 0 ?
                                                studentsData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.admission_no ?? ""}</td>
                                                        <td>{item?.classroom_roll?.roll_no ?? ""}</td>
                                                        <td>{item?.classroom?.title ?? ""}</td>
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
                                                                        handleFilteredStudentSelect(item?.id)
                                                                    }}
                                                                >
                                                                    {`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}
                                                                </button>
                                                            </Tooltip>
                                                        </td>
                                                        <td>{`${item?.father?.first_name ?? ""} ${item?.father?.middle_name ?? ""} ${item?.father?.last_name ?? ""}`}</td>
                                                        <td>{item?.father?.phone ?? ""}</td>
                                                        <td>{`${item?.mother?.first_name ?? ""} ${item?.mother?.middle_name ?? ""} ${item?.mother?.last_name ?? ""}`}</td>
                                                        <td>{item?.mother?.phone ?? ""}</td>
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
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

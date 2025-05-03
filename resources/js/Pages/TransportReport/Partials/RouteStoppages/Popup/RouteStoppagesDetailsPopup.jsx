import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RouteStoppagesDetailsPopup({
    stoppageDetailsPopup,
    setStoppageDetailsPopup,
    studentTeacherData = []
}) {

    const [data, setData] = useState(studentTeacherData);

    const closeModal = () => {
        setStoppageDetailsPopup(false);
    };

    useEffect(() => {
        setData(studentTeacherData);
    }, [studentTeacherData]);

    console.log(studentTeacherData);

    return (
        <>
            <section className='educare-admission-follow-up-area space-y-6'>
                <Modal show={stoppageDetailsPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3 flex gap-2.5 justify-between items-center">
                                <h5>Stoppage Details</h5>
                                <div className="educare-filter-action-btn inline-flex gap-2">
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                        >
                                            <button type='button'
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-5">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Student List
                                        </h5>
                                    </div>
                                    <table className='bg-supportingA/10'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Admission Number</th>
                                                <th>Class</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.studentData?.length > 0 ? (
                                                data?.studentData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.student_name}</td>
                                                        <td>{item?.admission_no}</td>
                                                        <td>{item?.classroom_title}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="12">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Teacher List
                                        </h5>
                                    </div>
                                    <table className='bg-supportingA/10'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.teacherData?.length > 0 ? (
                                                data?.teacherData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.teacher_name}</td>
                                                        <td>{item?.teacher_phone}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="12">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}

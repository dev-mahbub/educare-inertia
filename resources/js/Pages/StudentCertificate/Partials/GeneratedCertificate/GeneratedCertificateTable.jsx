import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from 'moment';
import { useEffect, useState } from "react";

const GeneratedCertificateTable = ({ classroomStudents = [], certificateStudents = [] }) => {

    const [selectedItem, setSelectedItem] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClassroom = (e, classroomId) => {
        e.preventDefault();
        router.post(route('student_certificate.generated_certificate'), { 'classroom_id': classroomId });
        setLoading(false);
        setSelectedItem(classroomId);
    }

    useEffect(() => {
        setLoading(false);
    }, [certificateStudents]);

    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Generated Certificate
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomStudents?.length > 0 ? (
                                    classroomStudents?.map((item, index) => (
                                        <tr className={`cursor-pointer ${selectedItem === item?.id ? 'educare-table-row-active' : ''}`} key={index} onClick={(e) => handleClassroom(e, item?.id)}>
                                            <td>{item?.title}</td>
                                            <td>{item?.certificate_count}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="5">
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Student Details
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Student's Name</th>
                                        <th>Roll No.</th>
                                        <th>Cert. Type</th>
                                        <th>Cert. Id</th>
                                        <th>Generated</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {certificateStudents?.length > 0 ? (
                                            certificateStudents?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{concatName(item?.student_data?.first_name, item?.student_data?.middle_name, item?.student_data?.last_name)}</td>
                                                    <td>{item?.student_data?.classroom_roll?.roll_no ?? ""}</td>
                                                    <td>{item?.certificate_type}</td>
                                                    <td>{item?.certificate_no}</td>
                                                    <td>{moment(item?.generated_date_at).format("DD MMM, YYYY")}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="View"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button type="button"
                                                                        className="educare-tertiary-btn-sm-fill"
                                                                    >

                                                                        {item?.certificate_type === 'Bonafide certificate' && <a target="_blank" href={route('bonafide_certificate_generator', item?.student_data?.id)}>
                                                                            <i className="icon-eye"></i>
                                                                        </a>}

                                                                        {item?.certificate_type === 'Character Certificate' && <a target="_blank" href={route('character_certificate_generator', item?.student_data?.id)}>
                                                                            <i className="icon-eye"></i>
                                                                        </a>}

                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
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
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedCertificateTable;

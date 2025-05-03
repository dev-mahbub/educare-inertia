import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import AdmitCardCertificatePopup from "../../../StudentCertificate/Partials/StudentCertificate/AdmitCardCertificatePopup";
import BonafideCertificatePopup from "../../../StudentCertificate/Partials/StudentCertificate/BonafideCertificatePopup";
import CharacterCertificatePopup from "../../../StudentCertificate/Partials/StudentCertificate/CharacterCertificatePopup";
import FeeCertificatePopup from "../../../StudentCertificate/Partials/StudentCertificate/FeeCertificatePopup";
import StudentIdCertificatePopup from "../../../StudentCertificate/Partials/StudentCertificate/StudentIdCertificatePopup";
import TeacherCertificatePopupTable from "../../../StudentCertificate/Partials/TeacherCertificate/TeacherCertificatePopupTable";
import TeacherExperiencePopupTable from "../../../StudentCertificate/Partials/TeacherCertificate/TeacherExperiencePopupTable";
import CreateTemplatePopup from './CreateTemplatePopup';

const CreateTemplateTableList = ({
    viewNames,
    certificates,
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    teacherNames,
    classroomWithExam
}) => {
    const [singlePopup, setSinglePopup] = useState(false);
    const handleSinglePopupClick = () => {
        setSinglePopup(!singlePopup);
    };

    // bonafide certificate
    const [bonafidePopupOpen, setBonafidePopupOpen] = useState(false);
    const [bonafideData, setBonafideData] = useState([]);

    const handleBonafidePopup = (bonafideData) => {
        setBonafideData(bonafideData);
        setBonafidePopupOpen(!bonafidePopupOpen);
    };

    // character certificate
    const [characterPopupOpen, setCharacterPopupOpen] = useState(false);
    const [characterData, setCharacterData] = useState([]);

    const handleCharacterPopup = (characterData) => {
        setCharacterData(characterData);
        setCharacterPopupOpen(!characterPopupOpen);
    };

    // admit card certificate
    const [admitCardPopupOpen, setAdmitCardPopupOpen] = useState(false);
    const [admitCardData, setAdmitCardData] = useState([]);

    const handleAdmitCardPopup = (admitCardData) => {
        setAdmitCardData(admitCardData);
        setAdmitCardPopupOpen(!admitCardPopupOpen);
    };

    // fee certificate
    const [feePopupOpen, setFeePopupOpen] = useState(false);
    const [feeData, setFeeData] = useState([]);

    const handleFeePopup = (feeData) => {
        setFeeData(feeData);
        setFeePopupOpen(!feePopupOpen);
    };

    // student id
    const [studentIdPopupOpen, setStudentIdPopupOpen] = useState(false);
    const handleStudentIdPopup = () => {
        setStudentIdPopupOpen(!studentIdPopupOpen);
    };

    // teacher id
    const [teacherIdPopupOpen, setTeacherIdPopupOpen] = useState(false);
    const handleTeacherIdPopup = () => {
        setTeacherIdPopupOpen(!teacherIdPopupOpen);
    };

    // teacher Experience
    const [teacherExperiencePopupOpen, setTeacherExperiencePopupOpen] = useState(false);
    const handleTeacherExperiencePopup = () => {
        setTeacherExperiencePopupOpen(!teacherIdPopupOpen);
    };


    const [certificateId, setCertificateId] = useState(null);

    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('certificate.delete_template', id));
            }
        });
    }

    // const admitCardViewNames = ['AdmitCard', 'SPT_AdmitCard', 'DPSSatna_StudentAdmitCard', 'Musab_StudentAdmitCard', 'Nageen_StudentAdmitCard'];

    return (
        <>
            <div>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Certificate Templates
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div>
                            <span className='min-h-[30px] inline-block border px-4 leading-7
                             border-supportingA whitespace-nowrap rounded-2xl text-[14px]
                              text-supportingA'>Total : {certificates?.length}</span>
                        </div>
                    </div>
                </div>
                <div className="educare-admission-list-area">
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Certificate Type</th>
                                            <th>ViewName</th>
                                            <th>Audience</th>
                                            <th>Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {certificates.length ?
                                            certificates.map((item, indx) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{++indx}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.certificate_type}</td>
                                                        <td>{item.view_name}</td>
                                                        <td>{item.audience_type}</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href={route('certificate.edit_template', item.id)}
                                                                            className="educare-warning-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            type="button"
                                                                            onClick={(e) => handleDelete(e,item.id)}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Generate Certificate"
                                                                        placement="top"
                                                                        arrow
                                                                    >

                                                                        {item.view_name === 'TransferCertificate' && (
                                                                            <Link
                                                                                href={route('student_certificate.generate_tc')}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </Link>
                                                                        )}

                                                                        {item.view_name === 'FeeCertificate' && (
                                                                            <button
                                                                                onClick={handleFeePopup}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}

                                                                        {item.view_name === 'BonafideCertificate' && (
                                                                            <button
                                                                                onClick={handleBonafidePopup}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}

                                                                        {item.view_name === 'CharacterCertificate' && (
                                                                            <button
                                                                                onClick={handleCharacterPopup}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}

                                                                        {item.certificate_type === 'Admit Card' && (
                                                                            <button
                                                                                onClick={() => {
                                                                                    handleAdmitCardPopup();
                                                                                    setCertificateId(item?.id)
                                                                                }}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}

                                                                        {item.view_name === 'TeacherIDCard' && (
                                                                            <button
                                                                                onClick={handleTeacherIdPopup}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}

                                                                        {item.view_name === 'ExperienceCertificate' && (
                                                                            <button
                                                                                onClick={handleTeacherExperiencePopup}
                                                                                className="educare-dark-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-ArrowSquareIn"></i>
                                                                            </button>
                                                                        )}
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }) :
                                            <tr className='text-center'>
                                                <td colSpan="12">No Certificate List!</td>
                                            </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTemplatePopup
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
            />
            <BonafideCertificatePopup
                bonafidePopupOpen={bonafidePopupOpen}
                setBonafidePopupOpen={setBonafidePopupOpen}
                bonafideData={bonafideData}
                classrooms={classrooms}
                studentNames={studentNames}
            />

            <CharacterCertificatePopup
                characterPopupOpen={characterPopupOpen}
                setCharacterPopupOpen={setCharacterPopupOpen}
                characterData={characterData}
                classrooms={classrooms}
                studentNames={studentNames}
            />

            <AdmitCardCertificatePopup
                admitCardPopupOpen={admitCardPopupOpen}
                setAdmitCardPopupOpen={setAdmitCardPopupOpen}
                admitCardData={admitCardData}
                classrooms={classrooms}
                studentNames={studentNames}
                students={students}
                classroomWthExam={classroomWithExam}
                certificateId={certificateId}
            />

            <FeeCertificatePopup
                feePopupOpen={feePopupOpen}
                setFeePopupOpen={setFeePopupOpen}
                feeData={feeData}
                classrooms={classrooms}
                studentNames={studentNames}
                students={students}
                academicSession={academicSession}
                feeTypes={feeTypes}
                feeTitles={feeTitles}
            />

            <StudentIdCertificatePopup
                studentIdPopupOpen={studentIdPopupOpen}
                setStudentIdPopupOpen={setStudentIdPopupOpen}
                classrooms={classrooms}
                studentNames={studentNames}
                students={students}
            />

            <TeacherCertificatePopupTable
                teacherNames={teacherNames}
                teacherIdPopupOpen={teacherIdPopupOpen}
                setTeacherIdPopupOpen={setTeacherIdPopupOpen}
            />
            <TeacherExperiencePopupTable
                teacherNames={teacherNames}
                teacherExperiencePopupOpen={teacherExperiencePopupOpen}
                setTeacherExperiencePopupOpen={setTeacherExperiencePopupOpen}
            />
        </>
    );
};

export default CreateTemplateTableList;

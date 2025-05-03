import { Link } from "@inertiajs/react";
import { useState } from "react";
import AdmitCardCertificatePopup from "./AdmitCardCertificatePopup";
import BonafideCertificatePopup from "./BonafideCertificatePopup";
import CharacterCertificatePopup from "./CharacterCertificatePopup";
import FeeCertificatePopup from "./FeeCertificatePopup";
import StudentIdCertificatePopup from "./StudentIdCertificatePopup";

export default function StudentCertificateList({
    classrooms,
    studentNames,
    students,
    academicSession,
    feeTypes,
    feeTitles,
    classroomWthExam,
    certificates,
    idCardCertificates
 }) {

    // bonafide certificate
    const [bonafidePopupOpen, setBonafidePopupOpen] = useState(false);
    const [bonafideData, setBonafideData] = useState([]);
    const [templateId, setTemplateId] = useState(null);

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
    const handleStudentIdPopup = (template_id) => {
        setTemplateId(template_id);
        setStudentIdPopupOpen(!studentIdPopupOpen);
    };

    const [certificateId, setCertificateId] = useState(null);


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Student Certificate
                                    <span>
                                        (Total : {certificates.length})
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>ViewName</th>
                                            <th>Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {certificates.length ?
                                        certificates.map((item, indx) => {
                                            {/* const viewNameObj = viewNames?.find((view) => view?.title === item.view_name);
                                            console.log('viewNameObj', viewNameObj) */}
                                            return (
                                                <tr key={item.id}>

                                                    <td>{++indx}</td>
                                                    <td>{item.title}</td>
                                                    <td>{item.view_name}</td>
                                                    <td>
                                                        {item.view_name === 'TransferCertificate' && (
                                                            <Link
                                                                href={route('student_certificate.generate_tc')}
                                                                className="badge primary"
                                                            >
                                                                Generate Certificate
                                                            </Link>
                                                        )}

                                                        {item.view_name === 'FeeCertificate' && (
                                                        <span className='badge primary' onClick={() => {
                                                            handleFeePopup()
                                                            setCertificateId(item?.id)
                                                        }}>
                                                            <button>
                                                                Generate Certificate
                                                            </button>
                                                        </span>
                                                        )}

                                                        {item.view_name === 'BonafideCertificate' && (
                                                        <span className='badge primary' onClick={() => {
                                                            handleBonafidePopup()
                                                            setCertificateId(item?.id)
                                                        }}>
                                                            <button>
                                                                Generate Certificate
                                                            </button>
                                                        </span>
                                                        )}

                                                        {item.view_name === 'CharacterCertificate' && (
                                                        <span className='badge primary' onClick={() => {
                                                            handleCharacterPopup()
                                                            setCertificateId(item?.id)
                                                        }}>
                                                            <button>
                                                                Generate Certificate
                                                            </button>
                                                        </span>
                                                        )}

                                                        {item?.certificate_type === 'Admit Card' && (
                                                        <span className='badge primary' onClick={() => {
                                                            handleAdmitCardPopup()
                                                            setCertificateId(item?.id)
                                                        }}>
                                                            <button>
                                                                Generate Certificate
                                                            </button>
                                                        </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr className='text-center'>
                                            <td colSpan="12">No Certificate List!</td>
                                        </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Id Card
                                    <span>
                                        (Total : {idCardCertificates?.length ?? 0})
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {idCardCertificates?.length > 0 ?
                                            idCardCertificates?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{item?.template_name}</td>
                                                    <td>
                                                        <span className='badge primary' onClick={() => {
                                                            handleStudentIdPopup(item?.id)
                                                        }}>
                                                            <button>
                                                                Generate Certificate
                                                            </button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">
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
            </div>

            <BonafideCertificatePopup
                bonafidePopupOpen={bonafidePopupOpen}
                setBonafidePopupOpen={setBonafidePopupOpen}
                bonafideData={bonafideData}
                classrooms={classrooms}
                studentNames={studentNames}
            />

            <CharacterCertificatePopup
                characterPopupOpen={characterPopupOpen}
                setCharacterPopupOpen ={setCharacterPopupOpen}
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
                feeTypes={feeTypes}
                feeTitles={feeTitles}
                classroomWthExam={classroomWthExam}
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
                templateId={templateId}
                setTemplateId={setTemplateId}
            />
        </>
    );
}

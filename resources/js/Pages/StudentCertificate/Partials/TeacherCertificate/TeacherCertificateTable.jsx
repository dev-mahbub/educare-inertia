import { Tooltip } from "@mui/material";
import { useState } from "react";
import TeacherCertificatePopupTable from "./TeacherCertificatePopupTable";
import TeacherExperiencePopupTable from "./TeacherExperiencePopupTable";

export default function TeacherCertificateTable({
    teacherNames,
    certificates,
    idCardCertificates
}) {
    const [templateId, setTemplateId] = useState(null);

    // teacher id
    const [teacherIdPopupOpen, setTeacherIdPopupOpen] = useState(false);
    const handleTeacherIdPopup = (template_id) => {
        setTemplateId(template_id);
        setTeacherIdPopupOpen(!teacherIdPopupOpen);
    };

    // teacher Experience
    const [teacherExperiencePopupOpen, setTeacherExperiencePopupOpen] = useState(false);
    const handleTeacherExperiencePopup = () => {
        setTeacherExperiencePopupOpen(!teacherIdPopupOpen);
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="flex justify-between">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Id Card
                                    </h5>
                                </div>
                                <div className="educare-header-filtar-bar-count">
                                    <span>Certificates: {idCardCertificates?.length ?? 0}</span>
                                </div>

                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            {/* <th>ViewName</th> */}
                                            <th>Tools</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {idCardCertificates.length ?
                                    idCardCertificates.map((item, indx) => {
                                        return (
                                            <tr key={item.id}>

                                            <td>{indx+1}</td>
                                            <td>{item.template_name}</td>
                                            {/* backup */}
                                            {/* <td>{item.view_name}</td> */}
                                            {/* <td>
                                                {item.view_name === 'TeacherIDCard' && (
                                                 <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Generate Certificate"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={handleTeacherIdPopup}
                                                                className="educare-warning-btn-sm-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                )}

                                                {item.view_name === 'ExperienceCertificate' && (
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Generate Certificate"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                onClick={handleTeacherExperiencePopup}
                                                                className="educare-warning-btn-sm-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                )}
                                            </td> */}
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Generate Certificate"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        handleTeacherIdPopup(item?.id)
                                                                    }}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                        </tr>
                                        );
                                    }) :
                                        <tr className='text-center'>
                                            <td colSpan="12">No Certificate List!</td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TeacherCertificatePopupTable
                teacherNames={teacherNames}
                teacherIdPopupOpen={teacherIdPopupOpen}
                setTeacherIdPopupOpen={setTeacherIdPopupOpen}
                templateId={templateId}
                setTemplateId={setTemplateId}
            />
            <TeacherExperiencePopupTable
                teacherNames={teacherNames}
                teacherExperiencePopupOpen={teacherExperiencePopupOpen}
                setTeacherExperiencePopupOpen={setTeacherExperiencePopupOpen}
            />
        </>
    );
}

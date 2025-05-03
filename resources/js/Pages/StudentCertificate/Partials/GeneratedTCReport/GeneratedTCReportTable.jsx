import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import StudentAdmissionEditPopup from "./StudentAdmissionEditPopup";

const GeneratedTCReportTable = ({
    generatedTc = [],
    loading,
    setLoading,
}) => {

    const [tcData, setTcData] = useState(generatedTc);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    // update
    const handleAdmissionPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    useEffect(() => {
        setTcData(generatedTc)
        setLoading(false);
    }, [generatedTc]);


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Roll no</th>
                                        <th>Adm No</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>TC No.</th>
                                        <th>TC Date</th>
                                        <th>TC Reason</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {tcData?.length > 0 ? (
                                            tcData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.roll_no}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    <td>{item?.classroom_title}</td>
                                                    <td>{concatName(item?.father_first_name, item?.father_middle_name, item?.father_last_name)}</td>
                                                    <td>{item?.father_phone}</td>
                                                    <td>{item?.certificate_no}</td>
                                                    <td>{item?.generated_date_at != null ? moment(item?.generated_date_at).format("DD MMM, YYYY") : ""}</td>
                                                    <td>{item?.tc_reason}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        onClick={(e) => handleAdmissionPopup(item)}
                                                                        className="educare-warning-btn-sm-fill">
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Printer"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <a className="educare-tertiary-btn-sm-fill" target="_blank" href={route('pdf_tc_generator.render_tc_form', item?.id)}>
                                                                        <i className="icon-printer"></i>
                                                                    </a>
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
            <StudentAdmissionEditPopup
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData} />
        </>
    );
};

export default GeneratedTCReportTable;

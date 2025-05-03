import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";

const CertificateListTable = ({ studentCertificate = [], loading, setLoading }) => {

    useEffect(() => {
        setLoading(false);
    }, [studentCertificate]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Certificate No.</th>
                                        <th>Student</th>
                                        <th>Class</th>
                                        <th>Certificate Type</th>
                                        <th>Issue date</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentCertificate?.length > 0 ? (
                                            studentCertificate?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.student_data?.admission_no}</td>
                                                    <td>{item?.certificate_no}</td>
                                                    <td>{concatName(item?.student_data?.first_name, item?.student_data?.middle_name, item?.student_data?.last_name)}</td>
                                                    <td>{item?.classroom_data?.title}</td>
                                                    <td>{item?.certificate_type}</td>
                                                    <td>{moment(item?.issue_date_at).format("DD MMM, YYYY")}</td>
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
        </>
    );
};

export default CertificateListTable;

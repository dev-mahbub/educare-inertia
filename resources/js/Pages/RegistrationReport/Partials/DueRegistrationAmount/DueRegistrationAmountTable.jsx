import { usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";



const DueRegistrationAmountTable = ({ selectedAcademicYear = [], enquiryRegAmountData }) => {

    const { flash } = usePage().props

    const [getAmountReg, setAmountReg] = useState([]);

    // console.log(enquiryRegAmountData);


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Reg. No.</th>
                                        <th>Reg. Date</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Father Name</th>
                                        <th>Mobile</th>
                                        <th>Payable Amt.</th>
                                        <th>Paid Amt.</th>
                                        <th>Due Amt.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {enquiryRegAmountData?.map((data, index) => (
                                <tr key={index}>
                                        <td>{data.registration_no}</td>
                                <td>{data.date_of_registration}</td>
                                <td>{`${data.first_name} ${data.middle_name} ${data.last_name}`}</td>
                                <td>{data.title}</td>
                                <td>{data.father_first_name}{data.father_middle_name}{data.father_last_name}</td>
                                <td>{data.father_mobile}</td>
                                <td>{data.academic_fee}</td>
                                <td>{data.fee_amount}</td>
                                <td>{data.academic_fee - data.fee_amount}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DueRegistrationAmountTable;

import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

const HostelStaffAllocationReportTableList = ({
    hostelStaffReport = [],
}) => {

    const [hostelStaffData, setHostelStaffData] = useState(hostelStaffReport);
    const [searchValue, setSearchValue] = useState('');

    const handleStudentSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = hostelStaffReport.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    item?.staff_name.toLowerCase().includes(term) ||
                    item?.hostel_staff_role.toLowerCase().includes(term) ||
                    item?.staff_phone.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setHostelStaffData(filteredData);
    }

    return (
        <>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Hostel Staff Allocation Report
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total : {hostelStaffData?.length}</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_staff"
                            value={searchValue}
                            onChange={(e) => handleStudentSearch(e.target.value)}
                            placeHolder="Search"
                            className="block"
                        />
                    </div>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Role</th>
                            <th>Mobile</th>
                            <th>Allocated On</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hostelStaffData?.length > 0 ? (
                            hostelStaffData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.staff_name}</td>
                                    <td>{item?.hostel_staff_role}</td>
                                    <td>{item?.staff_phone}</td>
                                    <td>{item?.joining_date_at}</td>
                                    <td><span className="badge success">{item?.location_path}</span></td>
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
        </>

    );
};

export default HostelStaffAllocationReportTableList;

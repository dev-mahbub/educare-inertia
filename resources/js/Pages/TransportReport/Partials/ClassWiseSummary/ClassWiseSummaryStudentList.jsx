import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from "@/Components/Loader";

const ClassWiseSummaryStudentList = ({
    areaName = '',
    studentData = [],
    loading,
    setLoading,
}) => {

    const [studentTwoData, setStudentTwoData] = useState(studentData);
    const [searchValue, setSearchValue] = useState('');

    const handleStudentSearch = (e, value) => {
        e.preventDefault();
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = studentData.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    item?.student_name.toLowerCase().includes(term) ||
                    item?.admission_no.toLowerCase().includes(term) ||
                    item?.classroom_title.toLowerCase().includes(term) ||
                    item?.father_name.toLowerCase().includes(term) ||
                    item?.father_phone.toLowerCase().includes(term) ||
                    item?.route_name.toLowerCase().includes(term) ||
                    item?.conductor_name.toLowerCase().includes(term) ||
                    item?.coordinator.toLowerCase().includes(term) ||
                    item?.stop_page_title.toLowerCase().includes(term) ||
                    item?.driver_name.toLowerCase().includes(term) ||
                    item?.transport_fee.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentTwoData(filteredData);
    }

    useEffect(() => {
        setStudentTwoData(studentData);
        setLoading(false);
    }, [studentData])


    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Students {areaName ? `/ ${areaName}` : ''}
                </h5>
            </div>
            <form>
                <div className='flex flex-wrap gap-2.5 justify-between mb-2.5 items-center'>
                    <div>
                        <span className='h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total: {studentTwoData?.length}</span>
                    </div>
                    <div className='inline-flex gap-2.5'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_route"
                                value={searchValue.search_route}
                                onChange={(e) => handleStudentSearch(e, e.target.value)}
                                placeHolder="Search"
                                className="block"
                            />
                        </div>
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
                            <div>
                                <Tooltip
                                    title="PDF"
                                    placement="top"
                                    arrow
                                >
                                    <button type='button'
                                        className="educare-warning-btn-md-fill"
                                    >
                                        <i className="icon-FilePdf"></i>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Adm No.</th>
                                <th>Class</th>
                                <th>Parent Name</th>
                                <th>Phone</th>
                                <th>Route</th>
                                <th>Stoppage</th>
                                <th>Vehicle No</th>
                                <th>Fee</th>
                                <th>Co-ordinator</th>
                                <th>Driver</th>
                                <th>Conductor</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {studentTwoData?.length > 0 ? (
                                    studentTwoData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.student_name}</td>
                                            <td>{item?.admission_no}</td>
                                            <td>{item?.classroom_title}</td>
                                            <td>{item?.father_name}</td>
                                            <td>{item?.father_phone}</td>
                                            <td>{item?.route_name}</td>
                                            <td>{item?.stop_page_title}</td>
                                            <td>{item?.vehicle_number}</td>
                                            <td>{item?.transport_fee}</td>
                                            <td>{item?.coordinator}</td>
                                            <td>{item?.driver_name}</td>
                                            <td>{item?.conductor_name}</td>
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
    );
};

export default ClassWiseSummaryStudentList;

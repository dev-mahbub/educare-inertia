import Loader from "@/Components/Loader";
import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const AreaWiseSummaryStudentList = ({
    areaName = '',
    studentData = [],
    loading,
    setLoading,
    selectedArea
}) => {

    const [studentTwoData, setStudentTwoData] = useState(studentData);
    const [searchValue, setSearchValue] = useState('');

    const handleStudentSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = studentData.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    item?.student_name.toLowerCase().includes(term) ||
                    item?.admission_no.toLowerCase().includes(term) ||
                    item?.classroom_title.toLowerCase().includes(term) ||
                    item?.father_name.toLowerCase().includes(term) ||
                    item?.route_name.toLowerCase().includes(term) ||
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
    }, [studentData]);

    console.log('selectedArea', selectedArea);



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
                        <span className='h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total: {studentData?.length}</span>
                    </div>
                    <div className='inline-flex gap-2.5'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_route"
                                value={searchValue.search_route}
                                onChange={(e) => handleStudentSearch(e.target.value)}
                                placeHolder="Search"
                                className="block"
                            />
                        </div>

                        {studentData?.length > 0 &&
                            <div className="educare-filter-action-btn inline-flex gap-2">
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                    >
                                        <a
                                            target='_blank'
                                            href={route('export_excel.transport.student_area_report', { transport_stoppage_id: selectedArea?.transport_stoppage_id, area_id: selectedArea?.area_id })}
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                            </div>
                        }
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
                                <th>Vehicle No</th>
                                <th>Route</th>
                                <th>Transport Fee</th>
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
                                            <td>{item?.vehicle_number}</td>
                                            <td>{item?.route_name}</td>
                                            <td>{item?.transport_fee}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">
                                            Data not found
                                        </td>
                                    </tr>
                                )}

                                    {studentData.length > 0 && <tr>
                                        <td colSpan={5}></td>
                                        <td>
                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                Total
                                            </h6>
                                        </td>
                                        <td>
                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                {studentData?.reduce((total, item) => total + parseFloat(item?.transport_fee ?? 0), 0)}
                                            </h6>
                                        </td>
                                    </tr>}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AreaWiseSummaryStudentList;

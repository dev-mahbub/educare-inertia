import Loader from "@/Components/Loader";
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const HostelAllocationReportTable = ({
    studentDetails = [],
    classroomNames = [],
    loading,
    setLoading,
}) => {

    const [studentData, setStudentData] = useState(studentDetails);
    const [searchValue, setSearchValue] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        classroom_id: "",
    });

    const handelSearch = (e) => {
        e.preventDefault();
        router.post(route('hostel_report.allocation'), { classroom_id: data?.classroom_id });
        setLoading(false);
    }

    const handelReset = (e) => {
        e.preventDefault();
        router.get(route('hostel_report.allocation'));
        setLoading(false);
    }

    const handleStudentSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = studentDetails.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    item?.student_name.toLowerCase().includes(term) ||
                    item?.admission_no.toLowerCase().includes(term) ||
                    item?.classroom_title.toLowerCase().includes(term) ||
                    item?.father_name.toLowerCase().includes(term) ||
                    item?.father_phone.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentData(filteredData);
    }

    useEffect(() => {
        setStudentData(studentDetails);
        setLoading(false);
    }, [studentDetails]);

    return (
        <>
            <form>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap
                    rounded-2xl text-[14px] text-supportingA'>Total : {studentData?.length}</span>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="classroom_id"
                                data_label="Classes"
                                data={classroomNames}
                                value={
                                    data.classroom_id
                                }
                                onChange={(e) =>
                                    setData(
                                        "classroom_id",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                        </div>

                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_student"
                                value={searchValue}
                                onChange={(e) => handleStudentSearch(e.target.value)}
                                placeHolder="Search"
                                className="block"
                            />
                        </div>
                        <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                        onClick={(e) => handelSearch(e)}
                                        type="button"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"

                                >
                                    <Link
                                        href="#"
                                        className="educare-gray-btn-md-fill"
                                        onClick={(e) => handelReset(e)}
                                        type="button"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Admission No</th>
                                        <th>Father Name</th>
                                        <th>Mobile No.</th>
                                        <th>Class</th>
                                        <th>Roll No</th>
                                        <th>Allocated On</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentData?.length > 0 ? (
                                            studentData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.student_name}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{item?.father_name}</td>
                                                    <td>{item?.father_phone}</td>
                                                    <td>{item?.classroom_title}</td>
                                                    <td>{item?.roll_no}</td>
                                                    <td>{item?.joining_date_at}</td>
                                                    <td>
                                                        <span className={`badge ${item?.is_allocated === 'Yes' ? 'success' : 'danger'}`}>{item?.location_path}</span>
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
        </>
    );
};

export default HostelAllocationReportTable;

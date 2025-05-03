import Loader from "@/Components/Loader";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const HostelClassSummaryReportTables = ({
    classroomData = [],
    studentDetails = [],
}) => {
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(studentDetails);
    const [activeItem, setActiveItem] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleAllocation = (id) => {
        setActiveItem(id);
        router.post(route('hostel_report.class_summary'), { classroom_id: id });
        setLoading(false);
    }

    const totalStudent = classroomData.reduce((total, currentClass) => {
        return total + currentClass.students_count;
    }, 0);

    const handleStudentSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value.toLowerCase().split(" ").filter(term => term.trim() !== "");
        const filteredData = studentDetails?.filter(item => {
            for (const term of searchTerms) {
                if (!(
                    item?.student_name.toLowerCase().includes(term) ||
                    item?.father_name?.toLowerCase().includes(term) ||
                    item?.father_phone?.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentData(filteredData);
    }

    useEffect(() => {
        setLoading(false);
        setStudentData(studentDetails);
    }, [studentDetails])

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    {/* left table */}
                    <div className="educare-card-title mr-auto pb-none mb-5">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Class Summary
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Total = {totalStudent}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomData?.length > 0 ?
                                    classroomData?.map((item, index) => (
                                        <tr className={`${activeItem === item?.id ? 'educare-table-row-active' : ''}`} key={index}>
                                            <td>{item?.title}</td>
                                            <td>
                                                <button
                                                    onClick={(e) => handleAllocation(item?.id)}
                                                    className="font-semibold text-primary"
                                                >
                                                    {item?.students_count}
                                                </button>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    {/* right table */}

                    {/* form */}
                    <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                        <div className="educare-card-title mr-auto pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Students
                            </h5>
                        </div>
                        <div className="flex flex-wrap gap-2.5 items-center">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="gate_pass"
                                    value={searchValue}
                                    onChange={(e) =>
                                        handleStudentSearch(e.target.value)
                                    }
                                    placeHolder="Search here"
                                    className="block"
                                />
                            </div>
                        </div>
                    </div>
                    {/* form */}

                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm.No.</th>
                                        <th>Student Name</th>
                                        <th>Parent Name</th>
                                        <th>Phone</th>
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
                                                    <td>{item?.admission_no}</td>
                                                    <td>{item?.student_name}</td>
                                                    <td>{item?.father_name}</td>
                                                    <td>{item?.father_phone}</td>
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

export default HostelClassSummaryReportTables;

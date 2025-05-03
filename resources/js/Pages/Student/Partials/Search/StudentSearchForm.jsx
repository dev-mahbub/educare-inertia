import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const StudentSearchForm = ({ students = [] }) => {

    const [studentData, setStudentData] = useState(students);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedRow, setSelectedRow] = useState('');

    const {
        data,
        setData
    } = useForm({
        search_all_session: "",
        admission_number: "",
        student_name: "",
        father_name: "",
        father_number: "",
        mother_name: "",
    });
    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student.search'), data);
        }
    }

    const handleReset = () => {
        router.get(route('student.search'));
    }

    useEffect(() => {
        setStudentData(students);
    }, [students]);

    const handleStudent = (item) => {
        setSelectedStudent(item);
        setSelectedRow(item?.id);
    }

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="max3Xl:col-span-12 col-span-6">
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title flex-wrap gap-2.5">
                            <h5>
                                <i className="icon-search-interface-symbol"></i>
                                Search Students
                            </h5>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="search_all_session"
                                        name="search_all_session"
                                        checked={
                                            data.search_all_session
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "search_all_session",
                                                e.target
                                                    .checked
                                            )
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="search_all_session"
                                        value="Search for all session"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="admission_number"
                                            value="Admission Number"
                                        />
                                        <TextInput
                                            id="admission_number"
                                            value={
                                                data.admission_number
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "admission_number",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="student_name"
                                            value="Student Name"
                                        />
                                        <TextInput
                                            id="student_name"
                                            value={
                                                data.student_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "student_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="father_name"
                                            value="Father Name"
                                        />
                                        <TextInput
                                            id="father_name"
                                            value={
                                                data.father_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "father_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="father_number"
                                            value="Father Number"
                                        />
                                        <TextInput
                                            id="father_number"
                                            value={
                                                data.father_number
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "father_number",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="mother_name"
                                            value="Mother Name"
                                        />
                                        <TextInput
                                            id="mother_name"
                                            value={
                                                data.mother_name
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "mother_name",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                    <div className='flex flex-wrap gap-2.5 h-full items-end'>
                                        <PrimaryButton
                                            className="educare-gray-btn-md-stroke"
                                            onClick={handleReset}
                                            type="button"
                                        >
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill"
                                            onClick={handleSearch}
                                            type="button"
                                        >
                                            Search
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-admission-list-area">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-info"></i>
                            Student Details
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Student Name</th>
                                            <th>Adm No.</th>
                                            <th>Class</th>
                                            <th>Father Name</th>
                                            <th>Mother Name</th>
                                            <th>Session</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {studentData?.length > 0 ? (
                                                studentData?.map((item, index) => (
                                                    <tr className={`cursor-pointer ${selectedRow === item?.id ? 'educare-table-row-active' : ''}`} key={index} onClick={() => handleStudent(item)}>
                                                        <td>{++index}</td>
                                                        <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                        <td>{item?.admission_no}</td>
                                                        <td>{item?.classroom_title}</td>
                                                        <td>{concatName(item?.father_first_name, item?.father_middle_name, item?.father_last_name)}</td>
                                                        <td>{concatName(item?.mother_first_name, item?.mother_middle_name, item?.mother_last_name)}</td>
                                                        <td>{item?.academic_year?.academic_session ? item?.academic_year?.academic_session : item?.academic_session}</td>
                                                        {/* <td>{item?.promoted_academic_year?.academic_session ? item?.promoted_academic_year?.academic_session : item?.academic_session}</td> */}
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
                        </div>
                    </div>
                </div>
            </div>

            {selectedStudent !== null &&
                <div className="max3Xl:col-span-12 col-span-6">
                    <div className="educare-admission-list-area mb-5">
                        <div className="educare-common-card-title">
                            <h5>
                                <i className="icon-ClockAfternoon"></i>
                                Student History
                            </h5>
                        </div>
                        <ul className='student-search-list-menus mb-5'>
                            <li><Link href='#' className='badge primary'>Demographic Details</Link></li>
                            <li><Link href={route('classroom_attendance_report.today_attendance')} className='badge primary'>Attendance Report</Link></li>
                            <li><Link href='#' className='badge primary'>Subject Marks</Link></li>
                            <li><Link href='#' className='badge primary'>Subject Wise Parentage</Link></li>
                            <li><Link href='#' className='badge primary'>Student Fees</Link></li>
                        </ul>

                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table table-width-full">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='w-[50%]'>
                                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Student Name:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{concatName(selectedStudent?.first_name, selectedStudent?.middle_name, selectedStudent?.last_name)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Adm. No:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.admission_no}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-[50%]'>
                                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Father Name:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{concatName(selectedStudent?.father_first_name, selectedStudent?.father_middle_name, selectedStudent?.father_last_name)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Father Mobile:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.father_phone}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-[50%]'>
                                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Mother Name:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{concatName(selectedStudent?.mother_first_name, selectedStudent?.mother_middle_name, selectedStudent?.mother_last_name)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Mother Mobile:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.mother_phone}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="educare-admission-list-area">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table table-width-full">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                {/* <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <span className='text-[16px] text-headingLight font-semibold'>Student Name:</span>
                                                    <span className='text-[15px] text-headingLight font-normal'>{concatName(selectedStudent?.first_name, selectedStudent?.middle_name, selectedStudent?.last_name)}</span>
                                                </div> */}
                                                <div className="text-center flex gap-2 justify-center">
                                                    <span className={`badge ${selectedStudent?.status === 'Active' ? 'success' : 'gray'}`}>
                                                        {selectedStudent?.status}
                                                    </span>
                                                    <span><b>Academic Year :</b> {selectedStudent?.promoted_academic_year?.academic_session ? selectedStudent?.promoted_academic_year?.academic_session : selectedStudent?.academic_session}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-[50%]'>
                                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Class:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.classroom_title}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Roll No:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.roll_no}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='w-[50%]'>
                                                <div className='flex flex-wrap gap-2.5 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>Student Status:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'>{selectedStudent?.student_status}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex flex-wrap gap-2.5 pl-4 leading-none items-center'>
                                                    <h5 className='text-[16px] text-headingLight font-semibold'>TC Status:</h5>
                                                    <span className='text-[15px] text-headingLight font-normal'></span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>}
        </div>
    );
};

export default StudentSearchForm;

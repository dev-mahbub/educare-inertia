import Checkbox from '@/Components/Checkbox';
import Loader from '@/Components/Loader';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { useEffect, useState } from 'react';
import TransportDetailPopup from "./SourceListPopup/TransportDetailPopup";

const UpgradeSourceList = ({
    data,
    setData,
    errors,
    students = [],
    classroomStudents,
    loading,
    setLoading,
    sessionValue = '',
    handelUpgradeStudent,
}) => {

    const [classroomStudentData, setClassroomStudentData] = useState(classroomStudents);
    const [studentData, setStudentData] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [transportDetailPopup, setTransportDetailPopup] = useState(false);
    const [transportDetailData, setTransportDetailData] = useState({});

    useEffect(() => {
        setStudentData(students);
        setLoading(false);
    }, [students])

    useEffect(() => {
        setClassroomStudentData(classroomStudents);
    }, [classroomStudents]);

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filteredStudents = students.filter(item => {
            const fullName = concatName(item?.first_name, item?.middle_name, item?.last_name).toLowerCase();
            const fatherFullName = concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name).toLowerCase();

            return (
                fullName.includes(value.toLowerCase()) ||
                fatherFullName.includes(value.toLowerCase())
            );
        });

        const filteredStudentsClassroom = classroomStudents.filter(item => {
            const fullName = concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name).toLowerCase();
            const fatherFullName = concatName(item?.student?.father?.first_name, item?.student?.father?.middle_name, item?.student?.father?.last_name).toLowerCase();

            return (
                fullName.includes(value.toLowerCase()) ||
                fatherFullName.includes(value.toLowerCase())
            );
        });

        setStudentData(filteredStudents);
        setClassroomStudentData(filteredStudentsClassroom);
    };

    const handleStudent = (id) => {
        const isSelected = data.selected_student.some((studentId) => studentId.student_id === id);
        const updatedSelectedStudent = isSelected
            ? data.selected_student.filter((studentId) => studentId.student_id !== id)
            : [...data.selected_student, { student_id: id }];

        setData({ ...data, 'selected_student': updatedSelectedStudent, 'student_all': false });
    }

    const handleAllStudent = (isChecked) => {
        if (isChecked) {
            const allStudentIds = students.map((item) => item.id);
            const updatedSelectedStudent = allStudentIds.map((student_id) => ({ student_id }));
            setData({ ...data, 'selected_student': updatedSelectedStudent, 'student_all': true });
        } else {
            setData({ ...data, 'selected_student': [], 'student_all': false });
        }
    };

    useEffect(() => {
        setData({
            ...data,
            selected_student: [],
            student_all: false,
        })
    }, [students]);

    // handle view transport details start
    const handleViewTransportDetails = (e, transport_data) => {
        e.preventDefault();

        setTransportDetailPopup(true);

        setTransportDetailData(transport_data)
    }
    // handle view transport details end

    return (
        <>
            <div className="educare-card-title mr-auto pb-none flex flex-wrap items-center gap-2">
                <h5>
                    <i className="icon-ListBullets"></i>
                    {sessionValue.title} Source Students
                </h5>
            </div>
            <div className='flex flex-wrap gap-2 items-end my-2'>
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Total: {classroomStudents?.length + studentData?.length}</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="block"
                            placeHolder="Search here"
                        />
                    </div>
                    <PrimaryButton
                        // disabled={processing}
                        className="educare-primary-btn-md-fill"
                        onClick={(e) => handelUpgradeStudent(e)}
                    >
                        Upgrade Student
                    </PrimaryButton>
                </div>
            </div>

            <div className="educare-admission-list-area mb-5">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>

                                            {/* <div className="educare-create-school-settings-list-check width-full">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_all"
                                                        name="student_all"
                                                        onChange={(e) => handleAllStudent(e.target.checked)}
                                                        checked={data.student_all}
                                                    />
                                                </div>
                                            </div> */}

                                        </th>
                                        <th>Adm No.</th>
                                        <th>Student Name</th>
                                        <th>Father Name</th>
                                        <th>Upgraded Class</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {classroomStudentData?.length > 0 &&
                                            classroomStudentData?.map((item, index) => (
                                                <tr key={index} style={{backgroundColor: 'rgb(22 171 64 / 27%)'}}>
                                                    <td>&nbsp;</td>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>
                                                        <div
                                                            className='flex justify-between'
                                                        >
                                                            <span>
                                                                {concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}
                                                            </span>
                                                            {item?.student?.is_transport_allocated == true &&
                                                                <button
                                                                    type='button'
                                                                    className="text-info text-xl"
                                                                    onClick={(e) => {
                                                                        handleViewTransportDetails(e, item?.student)
                                                                    }}
                                                                >
                                                                    <i className="icon-Car"></i>
                                                                </button>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{concatName(item?.student?.father?.first_name, item?.student?.father?.middle_name, item?.student?.father?.last_name)}</td>
                                                    <td>({item?.academic_year?.academic_session}) {item?.classroom?.title}</td>
                                                </tr>
                                            ))
                                        }

                                        {studentData?.length > 0  &&
                                            studentData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`type_${index}`}
                                                                name={`type_${index}`}
                                                                onChange={(e) => handleStudent(item?.id)}
                                                                checked={data.selected_student.some(studentId => studentId.student_id === item.id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>
                                                        <div
                                                            className='flex justify-between'
                                                        >
                                                            <span>
                                                                {concatName(item?.first_name, item?.middle_name, item?.last_name)}
                                                            </span>
                                                            {item?.is_transport_allocated == true &&
                                                                <button
                                                                    type='button'
                                                                    className="text-info text-xl"
                                                                    onClick={(e) => {
                                                                        handleViewTransportDetails(e, item)
                                                                    }}
                                                                >
                                                                    <i className="icon-Car"></i>
                                                                </button>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{concatName(item?.father?.first_name, item?.father?.middle_name, item?.father?.last_name)}</td>
                                                    {/* <td>{item?.classroom_student?.classroom?.title}</td> */}
                                                    <td></td>
                                                </tr>
                                            ))
                                        }

                                        {studentData?.length == 0 && classroomStudents?.length == 0 &&
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <TransportDetailPopup
                setTransportDetailPopup={setTransportDetailPopup}
                transportDetailPopup={transportDetailPopup}
                transportDetailData={transportDetailData}
                setTransportDetailData={setTransportDetailData}
            />
        </>
    );
};

export default UpgradeSourceList;

import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

const SummaryForm = ({
    classNames = [],
    classrooms = [],
    students = [],
    maleStudents,
    femaleStudents,
    otherStudents,
    newStudents,
    promotedStudents,
    classTotalStudent,
    classroomTotalStudent
}) => {

    const [studentData, setStudentData] = useState(students);
    const [classroomData, setClassroomData] = useState(classrooms);
    const [classActiveRow, setClassActiveRow] = useState('');
    const [classroomActiveRow, setClassroomActiveRow] = useState('');

    const types = [
        {id: 'Active', title: 'Active'},
        {id: 'Inactive', title: 'Inactive'},
        {id: 'Tc', title: 'TC'}
    ]

    const {
        data,
        setData,
    } = useForm({
        class_name_id: "",
        classroom_id: "",
        search_value: "",
        type: "",
    });

    const handleClass = (classNameId) => {
        setData({
            ...data,
            class_name_id: classNameId,
        });
        if (data) {
            const data2 = {
                class_name_id: classNameId,
                type: data?.type ?? ""
            };

            router.post(route('student.summary'), data2);
            setClassActiveRow(classNameId);
            setClassroomActiveRow('');
        }
    }

    const handleClassroom = (classroomId) => {
        setData({
            ...data,
            classroom_id: classroomId,
        });

        if (data) {
            const data3 = {
                class_name_id: data?.class_name_id,
                classroom_id: classroomId,
                type: data?.type ?? ""
            };

            router.post(route('student.summary'), data3);
            setClassroomActiveRow(classroomId);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            const data4 = {
                class_name_id: data?.class_name_id,
                classroom_id: data?.classroom_id,
                search_value: data.search_value ,
                type: data?.type ?? ""
            };
            router.post(route('student.summary'), data4);
        }
    }

    const handleReset = () => {
        router.get(route('student.summary'));
    }

    const handleType = (value) => {
        router.post(route('student.summary'), {type: value, filter_type: 'class_summary'});
    };

    useEffect(() => {
        setStudentData(students?.sort(customSort));
        setClassroomData(classrooms);
    }, [students, classrooms])


    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // sort students by classroom roll start
    function customSort(a, b) {
        // Check if roll_no is not null for both a and b
        if ((a.roll_no != "" && a.roll_no != null) && (b.roll_no != "" && b.roll_no != null)) {
            return a.roll_no - b.roll_no;
        }
        else if (a.roll_no == "" || a.roll_no == null) {
            // Handle null values for a
            return 1; // Move a to the end of the sorted array
        } else {
            // Handle null values for b
            return -1; // Move b to the start of the sorted array
        }
    }
    // sort students by classroom roll end

    return (
        <form>
            <div className="grid grid-cols-12 gap-5">
                <div className="xl:col-span-2 sm:col-span-6 col-span-12">
                    <div className="educare-admission-list-area">
                        <div className="flex flex-wrap gap-2.5 justify-between mb-2.5">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="type"
                                    data_label="All"
                                    data={types}
                                    value={data.type}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            "type": e.target.value
                                        })
                                        handleType(e.target.value);
                                    }
                                    }
                                    className="block"
                                />
                            </div>
                            <div className="educare-filter-action-btn">
                                <Tooltip title="Download Excel" placement="top" arrow>
                                    <a
                                        target="_blank"
                                        href={route('export_excel.class_wise_student_summary_report', {type: data?.type ?? ""})}
                                        className="educare-success-btn-md-fill"
                                        as="button"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list table-width-full without-action-last-child pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>
                                                    <Tooltip
                                                        title="Total"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <span>{classTotalStudent}</span>
                                                    </Tooltip>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(classNames)?.length ?
                                                Object.values(classNames)?.map((className, index) => (
                                                    <tr className={`cursor-pointer ${classActiveRow === className?.id ? 'educare-table-row-active' : ''}`} key={index} onClick={() => handleClass(className?.id)}>
                                                        <td>{className?.title}</td>
                                                        <td>{className?.student_count} </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 sm:col-span-6 col-span-12">
                    <div className="educare-admission-list-area">
                        <div className="flex flex-wrap gap-2.5 items-center justify-between mb-2.5">
                            <h5 className="text-[18px] font-semibold font-primary text-headingLight">
                                Section{" "}
                            </h5>
                            <div className="educare-filter-action-btn flex gap-1">
                                <div>
                                    <Tooltip title="Download Excel" placement="top" arrow>
                                        <a
                                            target="_blank"
                                            href={route('export_excel.classroom_wise_student_summary_report', { type: data?.type ?? "" })}
                                            className="educare-success-btn-md-fill"
                                            as="button"
                                        >
                                            <i className="icon-FileX"></i>
                                        </a>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="Reset" placement="top" arrow>
                                        <Link href="#" onClick={handleReset} className="educare-gray-btn-md-fill">
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list table-width-full without-action-last-child pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Section</th>
                                                <th>
                                                    <Tooltip
                                                        title="Total"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <span>{classroomTotalStudent}</span>
                                                    </Tooltip>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classroomData?.length ?
                                                classroomData?.map((classroom, index2) => (
                                                    <tr className={`cursor-pointer ${classroomActiveRow === classroom?.id ? 'educare-table-row-active' : ''}`} key={index2} onClick={() => handleClassroom(classroom?.id)}>
                                                        <td>{classroom?.title}</td>
                                                        <td>{classroom?.student_count}</td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8 col-span-12">
                    {/* <SummarySearchBar /> */}
                    <div className='educare-admission-filtar-bar-area z-[4] relative'>
                        <div className="py-3 educare-admission-filtar-bar">
                            <div className="educare-admission-filtar-bar-filter maxXs:flex-wrap">
                                <div className="educare-admission-filtar-bar-count">
                                    <span>Total: {studentData?.length}</span>
                                </div>
                                <div className="educare-admission-filtar-bar-filter-fields-wrap 4xl:w-[75%] relative">
                                    <span className="educare-admission-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-admission-filtar-bar-filter-fields" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-filter-attendances">
                                            <ul>
                                                <li>
                                                    <Tooltip
                                                        title="Total Male Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>M</button>
                                                            <span>{maleStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Female Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>F</button>
                                                            <span>{femaleStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Other Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>O</button>
                                                            <span>{otherStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total New Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>N</button>
                                                            <span>{newStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                                <li>
                                                    <Tooltip
                                                        title="Total Promoted Students"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <div className='flex items-center'>
                                                            <button type='button'>P</button>
                                                            <span>{promotedStudents}</span>
                                                        </div>
                                                    </Tooltip>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search_value"
                                                value={data?.search}
                                                onChange={(e) => setData("search_value", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className='md:hidden'></div>
                                    </div>
                                    <span className="educare-admission-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                                <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn">
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
                                                onClick={(e) => handleSearch(e)}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    {studentData?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('export_excel.class_wise_student_list_report', {
                                                        class_name_id: data?.class_name_id ?? "",
                                                        classroom_id: data?.classroom_id ?? "",
                                                        search_value: data.search_value ?? "",
                                                        type: data?.type ?? ""
                                                    })}
                                                    className="educare-success-btn-md-fill"
                                                    as='button'
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }

                                    {studentData?.length > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download PDF"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('pdf_student.class_wise_student_list', {
                                                        class_name_id: data?.class_name_id ?? "",
                                                        classroom_id: data?.classroom_id ?? "",
                                                        search_value: data.search_value ?? "",
                                                        type: data?.type ?? ""
                                                    })}
                                                    className="educare-warning-btn-md-fill"
                                                    as='button'
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list without-action-last-child pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* <th>Id</th> */}
                                                <th>Roll No.</th>
                                                <th>Status</th>
                                                <th>Name</th>
                                                <th>Class</th>
                                                <th>Adm. No.</th>
                                                <th>Father Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentData?.length > 0 ? (
                                                studentData?.map((item, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{++index}</td> */}
                                                        <td>{item?.roll_no}</td>
                                                        <td>
                                                            <Tooltip
                                                                title={item?.student_status === 'N' ? 'New Student' : 'Promoted Student'}
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <span className={`badge ${item?.student_status === 'N' ? 'success' : 'warning'}`}>
                                                                    {item?.student_status}
                                                                </span>
                                                            </Tooltip>
                                                        </td>
                                                        <td>
                                                            <a
                                                                target="_blank"
                                                                href={route('student.edit', item?.id)}
                                                            >
                                                                {item?.name}
                                                            </a>

                                                            {(item?.has_tc == true && item?.status == 'inactive')&&
                                                                <span className="block text-primary">
                                                                    (Tc Generated)
                                                                </span>
                                                            }

                                                            {(item?.has_tc == false && item?.status == 'inactive')&&
                                                                <span className="block text-danger">
                                                                    (InActive)
                                                                </span>
                                                            }
                                                        </td>
                                                        <td>{item?.classroom_title}</td>
                                                        <td>{item?.admission_no}</td>
                                                        <td>{item?.father_name}</td>
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
            </div>
        </form>
    );
};

export default SummaryForm;

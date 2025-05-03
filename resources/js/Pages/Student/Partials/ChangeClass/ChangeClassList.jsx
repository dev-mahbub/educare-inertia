import Checkbox from '@/Components/Checkbox';
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";


export default function ChangeClassList({
    changeStudents = [],
    classrooms = [],
    session_year = '',
    classroom_id,
    selectedStudent = '',
    searchValue,
}) {

    const initialFormData = changeStudents?.map((item) => ({
        // student
        id: item.id || '',
        is_checked: false,
        first_name: item?.first_name || '',
        middle_name: item?.middle_name || '',
        last_name: item?.last_name || '',
        admission_no: item?.admission_no || '',
        // father
        father_first_name: item?.father_first_name || '',
        father_middle_name: item?.father_middle_name || '',
        father_last_name: item?.father_last_name || '',
    }));

    const selectedInitialFormData = selectedStudent?.map((item2) => ({
        // student
        id: item2.id || '',
        classroom_id: '',
    }));

    const [data, setData] = useState(initialFormData);
    const [selectedStudentData, setSelectedStudentData] = useState(selectedInitialFormData);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [classroomId, setClassroomId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setClassroomId(classroom_id);
    }, [classroom_id]);

    useEffect(() => {
        setSearchQuery(searchValue);
    }, [searchValue]);

    const handleSelectAllCheckboxChange = (checked) => {
        setSelectAllChecked(checked);
        setData((prevData) => prevData.map((item) => ({ ...item, is_checked: checked })));
    };

    const handleCheckboxSelect = (index, checked) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], is_checked: checked };
            return newData;
        });
        const allChecked = data.every((item) => item.is_checked);
        setSelectAllChecked(allChecked);
    };

    const handleInputChange = (index, id, field, value) => {
        setSelectedStudentData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], id: id, [field]: value };
            return newData;
        });
    };

    const concatName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    const handleClassRoom = (classRoomId, search = null) => {
        const classroom_id = classRoomId != "Select Class" ? classRoomId : "";

        const params ={
            class_room_id: classroom_id,
            search_query: searchQuery
        };

        setClassroomId(classroom_id);

        router.get(route('student.change_class',params));

        // if (classRoomId === 'Select Class') {
        //     router.get(route('student.change_class',params));
        // } else if (!isNaN(parseInt(classRoomId))) {
        //     router.get('/student/change-class?class_room_id=' + classRoomId);
        // }
    }

    const handleSearch = (value) => {
        const params = {
            class_room_id: classroomId,
            search_query: value
        };

        setSearchQuery(value);

        router.get(route('student.change_class', params));

        // if (value) {
        //     router.get('/student/change-class?search_query=' + value);
        // } else {
        //     router.get('/student/change-class');
        // }
    }

    const handleUpdateSelectedStudent = (e) => {
        e.preventDefault();
        const filteredContent = selectedStudentData.filter(notNullItem => notNullItem !== null);
        router.put(route('student.selected_student_update'), filteredContent);
    }

    const handleChangeClass = (e) => {
        e.preventDefault();
        router.put(route('student.change_class_update'), data);
    };

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className=" xl:col-span-7 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Students
                                </h5>
                            </div>
                            {/* class change filter */}
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <form>
                                            <div className=" educare-header-filtar-bar-inner-main minMaxXl:flex-wrap minMaxXl:justify-end minMax2Xl:flex-wrap minMax2Xl:justify-end minMax3Xl:flex-wrap minMax3Xl:justify-end">
                                                <div className="educare-admission-filtar-bar-count">
                                                    <span>Total: {changeStudents && changeStudents.length}</span>
                                                </div>
                                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                    <div className="educare-header-filtar-bar-fields-area relative">
                                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="classroom_id"
                                                                    data_label="Class"
                                                                    data={classrooms}
                                                                    // value={classrooms.classroom_id}
                                                                    value={classroomId}
                                                                    // selectedData={classroom_id}
                                                                    selectedData={classroomId}
                                                                    onChange={(e) =>
                                                                        handleClassRoom(e.target.value)
                                                                    }
                                                                    className="block"
                                                                />

                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="student_search"
                                                                    defaultValue={searchValue}
                                                                    onChange={(e) => handleSearch(e.target.value)}
                                                                    placeHolder="Search"
                                                                    type="text"
                                                                    className="block"
                                                                />

                                                            </div>
                                                        </div>
                                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                                    </div>
                                                </div>
                                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                                    <div className="educare-input-field-styles whitespace-nowrap">
                                                        <div
                                                            className="educare-secondary-btn-md-stroke"
                                                        >
                                                            {session_year}
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <PrimaryButton
                                                            onClick={handleChangeClass}
                                                            type="button"
                                                            className="educare-primary-btn-md-fill whitespace-nowrap"
                                                        >
                                                            Change class
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_student_id"
                                                        name="select_all_student_id"
                                                        checked={selectAllChecked}
                                                        onChange={(e) => handleSelectAllCheckboxChange(e.target.checked)}
                                                    />
                                                </div>
                                            </th>
                                            <th>Sl. No</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {changeStudents?.length > 0 ?
                                            changeStudents?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`is_checked_${index}`}
                                                                name={`is_checked_${index}`}
                                                                checked={data[index]?.is_checked || false}
                                                                onChange={(e) => handleCheckboxSelect(index, e.target.checked)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {index+1}
                                                    </td>
                                                    <td>
                                                        {concatName(item?.admission_no)}
                                                    </td>
                                                    <td>
                                                        {concatName(item?.first_name, item?.middle_name, item?.last_name)}
                                                    </td>
                                                    <td>
                                                        {concatName(item?.father_first_name, item?.father_middle_name, item?.father_last_name)}
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="11">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className=" xl:col-span-5 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Selected Students
                                </h5>
                            </div>
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-admission-filtar-bar">
                                    <div className="educare-admission-filtar-bar-filter educare-registration-filtar-bar-filter justify-start">
                                        <div className="educare-admission-filtar-bar-count">
                                            <span>Total: {selectedStudent && selectedStudent.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <form onSubmit={handleUpdateSelectedStudent}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>SL. No</th>
                                                <th>Class</th>
                                                <th>Admission No</th>
                                                <th>Student Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedStudent?.length > 0 ?
                                                selectedStudent?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {index+1}
                                                        </td>
                                                        <td>
                                                            <div className="educare-select-field-styles">
                                                                <SelectInput
                                                                    id="selected_classroom_id"
                                                                    data_label="class"
                                                                    data={classrooms}
                                                                    defaultValue={selectedStudentData[index]?.classroom_id || ''}
                                                                    onChange={(e) => handleInputChange(index, item?.id, 'classroom_id', e.target.value)}
                                                                    type="text"
                                                                    className="mt-1 block w-full"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {concatName(item?.admission_no)}
                                                        </td>
                                                        <td>
                                                            {concatName(item?.first_name, item?.middle_name, item?.last_name)}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="submit"
                                                                className="educare-create-school-settings-list-success"
                                                            // onClick={() => handleUpdateStudent('aa')}
                                                            >
                                                                <i className="inline-block icon-check-1"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="11">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

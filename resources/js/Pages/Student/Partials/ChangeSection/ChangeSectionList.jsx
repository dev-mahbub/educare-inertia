import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function ChangeSectionList({
    changeStudents = [],
    classrooms = [],
    session_year,
    classroom_id = '',
    selectedStudent = [],
    searchValue = '',
    sections = []
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

    const [data, setData] = useState(initialFormData);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [sectionId, setSectionId] = useState('');
    const [error, setError] = useState('');

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

    const concatName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    const handleClassRoom = (classRoomId) => {
        if (classRoomId === 'Select Class') {
            router.get(route('student.change_section'));
        } else if (!isNaN(parseInt(classRoomId))) {
            router.get('/student/change-section?class_room_id=' + classRoomId);
        }
    }

    const handleSearch = (value) => {
        if (value) {
            router.get('/student/change-section?search_query=' + value);
        } else {
            router.get('/student/change-section');
        }
    }

    const handleChangeSection = (e) => {
        if (sectionId) {
            router.put(`/student/change-section/edit?sectionId=${sectionId}`, data);
        } else {
            setError('Select section');
            return;
        }
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-7 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Students
                                </h5>
                            </div>
                            {/* class change filter */}
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-admission-filtar-bar">
                                    <div className="educare-admission-filtar-bar-filter educare-registration-filtar-bar-filter justify-between">
                                        <div className="educare-admission-filtar-bar-count">
                                            <span>Total: {changeStudents && changeStudents.length}</span>
                                        </div>
                                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                                            <div className="educare-admission-filtar-bar-filter-fields">
                                                <div className="educare-input-field-styles lg:hidden"></div>
                                                <div className="educare-select-field-styles">
                                                    <SelectInput2
                                                        id="classroom_id"
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={classrooms.classroom_id}
                                                        selectedData={classroom_id}
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
                                                <div className="educare-input-field-styles">
                                                    <div
                                                        className="educare-secondary-btn-md-stroke"
                                                    >
                                                        {session_year}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* class change filter */}
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
                    <div className="lg:col-span-6 xl:col-span-5 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-PaperPlaneTilt"></i>
                                    Sleeted students
                                </h5>
                            </div>

                            {/* class change section filter */}
                            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-admission-filtar-bar">
                                    <div className="educare-admission-filtar-bar-filter educare-registration-filtar-bar-filter justify-between">
                                        <div className="educare-admission-filtar-bar-count">
                                            <span>Total: {selectedStudent && selectedStudent.length}</span>
                                        </div>
                                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                                            <div className="educare-admission-filtar-bar-filter-fields">
                                                <div className="educare-input-field-styles lg:hidden"></div>
                                                <div className="educare-select-field-styles">
                                                    {error && <InputError
                                                        message={
                                                            error
                                                        }
                                                        className="mt-2"
                                                    />}

                                                    <SelectInput
                                                        id="section_id"
                                                        data_label="section"
                                                        data={sections}
                                                        onChange={(e) => setSectionId(e.target.value)}
                                                        className="block"
                                                    />

                                                </div>
                                                <div className="educare-input-field-styles">
                                                    <PrimaryButton
                                                        onClick={() => handleChangeSection()}
                                                        type="button"
                                                        className="educare-primary-btn-md-fill"
                                                    >
                                                        Change section
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* class change change filter */}

                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Class</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        {selectedStudent?.length > 0 ?
                                            selectedStudent?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {concatName(item?.id)}
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
                                    </tbody> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

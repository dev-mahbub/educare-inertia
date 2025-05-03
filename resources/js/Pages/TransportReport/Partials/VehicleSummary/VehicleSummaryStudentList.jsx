import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import VehicleSummaryPopup from './VehicleSummaryPopup/VehicleSummaryPopup';
import Checkbox from '@/Components/Checkbox';
import Loader from "@/Components/Loader";

const VehicleSummaryStudentList = ({
    studentData = [],
    loading = '',
    setLoading = '',
}) => {

    const {
        data,
        setData,
    } = useForm({
        all_student: false,
        selected_student: [],
    });

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
                    item?.stoppage_name.toLowerCase().includes(term) ||
                    item?.father_mobile.toLowerCase().includes(term)
                )) {
                    return false;
                }
            }
            return true;
        });
        setStudentTwoData(filteredData);
    }

    const handleSelectedStudent = (id) => {
        const isSelected = data.selected_student.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelected
            ? data.selected_student.filter((student) => student.student_id !== id)
            : [...data.selected_student, { student_id: id }];
        setData({
            all_student: false,
            selected_student: updatedSelectedStudents,
        });
    }

    const handleAllStudent = (isChecked) => {
        if (isChecked) {
            const allStudentIds = studentTwoData.map((item) => item.student_id);
            const updatedSelectedFees = allStudentIds.map((student_id) => ({ student_id }));
            setData({ ...data, 'selected_student': updatedSelectedFees, 'all_student': true });
        } else {
            setData({ ...data, 'selected_student': [], 'all_student': false });
        }
    };

    useEffect(() => {
        setStudentTwoData(studentData);
        setLoading(false);
    }, [studentData])

    const [vehiclePopup, setVehiclePopup] = useState(false);
    const handleVehiclePopupClick = () => {
        setVehiclePopup(!vehiclePopup);
    };

    console.log('studentData', studentData);
    console.log('data', data);

    return (
        <>
            <form>
                <div className="educare-classroom-table-wrapper">
                    <div className="educare-card-title">
                        {/* <h5>
                        <i className="icon-ListBullets"></i>
                        Vehicle / {vehicle ? `${vehicle}` : 'No Vehicle'}
                        {' > '} Route / {route ? `${route}` : 'No Class'}

                    </h5> */}
                    </div>
                    <div className='flex flex-wrap gap-2.5 justify-between mb-2.5 items-center'>
                        <div>
                            <span className='h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total: {studentTwoData?.length}</span>
                        </div>
                        <div className='inline-flex flex-wrap gap-2.5'>
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="search_route"
                                    value={searchValue.search_route}
                                    onChange={(e) => handleStudentSearch(e.target.value)}
                                    placeHolder="Search"
                                    className="block"
                                />
                            </div>
                            <div className="educare-filter-action-btn inline-flex gap-2">
                                <div className='transport-icon-button'>
                                    <PrimaryButton
                                        // disabled={processing}
                                        className="educare-primary-btn-md-fill"
                                        onClick={handleVehiclePopupClick}
                                    >
                                        <i className="icon-email mr-1"></i>
                                        Send
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="fee_all"
                                                        name="fee_all"
                                                        onChange={(e) => handleAllStudent(e.target.checked)}
                                                        checked={data?.all_student}
                                                    />
                                                </div>
                                            </div>
                                        </th>
                                        <th>Student</th>
                                        <th>Adm No.</th>
                                        <th>Class</th>
                                        <th>Father</th>
                                        <th>Mobile</th>
                                        <th>Stoppage</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentTwoData?.length > 0 ? (
                                            studentTwoData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`student_${index}`}
                                                                    name="student_name"
                                                                    onChange={(e) => handleSelectedStudent(item?.student_id)}
                                                                    checked={data.selected_student.some(student => student.student_id === item.student_id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item?.student_name}</td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{item?.classroom_title}</td>
                                                    <td>{item?.father_name}</td>
                                                    <td>{item?.father_mobile}</td>
                                                    <td>{item?.stoppage_name}</td>
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

                <VehicleSummaryPopup
                    vehiclePopup={vehiclePopup}
                    setVehiclePopup={setVehiclePopup}
                />
            </form>
        </>
    );
};

export default VehicleSummaryStudentList;

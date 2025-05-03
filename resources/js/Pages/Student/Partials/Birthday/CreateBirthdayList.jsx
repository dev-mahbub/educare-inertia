import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import BirthdayWishPopupForm from './BirthdayWishPopupForm';

const CreateBirthdayList = ({
    students = [],
    setBirthdayData,
}) => {
    const [studentIds, setStudentIds] = useState([]);
    
    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        select_all_student: "",
        student_one: false,
    });

    const CreateBirthdayListData = (e) => {
        e.preventDefault();
        // Form submission logic here
    };
    //form validation end

    //handle checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData = { ...data, [name]: value };

        if (name === 'select_all_student') {
            let newstudentIds = [];
            students.forEach(student => {
                newFormData[`student_${student.id}`] = value;
                if (value) {
                    newstudentIds.push(student.id);
                }
            });
            setStudentIds(value ? newstudentIds : []);
        } else {
            const studentId = parseInt(name.split('_')[1]);
            if (value) {
                setStudentIds([...studentIds, studentId]);
            } else {
                setStudentIds(studentIds.filter(id => id !== studentId));
            }
            newFormData.select_all_student = students.every(student => newFormData[`student_${student.id}`]);
        }

        setData(newFormData);
    };

    useEffect(() => {
        setBirthdayData('studentIds', studentIds);
    }, [studentIds]);

    return (
        <>
            <div className="educare-student-birthday-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={CreateBirthdayListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_student"
                                                            name="select_all_student"
                                                            checked={data.select_all_student}
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_student"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Father's Name</th>
                                            <th>Class</th>
                                            <th>Birthdate</th>
                                            <th>Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            students.length > 0 ? (
                                                students.map((student, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-checkbox-styles">
                                                                <label className="inline-block">
                                                                    <Checkbox
                                                                        name={`student_${student.id}`}
                                                                        checked={studentIds.includes(student.id)}
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(
                                                                                e.target.name,
                                                                                e.target.checked
                                                                            )
                                                                        }
                                                                    />
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>{student.name}</td>
                                                        <td>{student.father_name}</td>
                                                        <td>{student.class_title}</td>
                                                        <td>{student.birth_date}</td>
                                                        <td>{student.father_phone}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className='text-center'>Student not found</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateBirthdayList;

import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const CreateBirthdayList = ({
    teachers = [],
    setBirthdayData,
}) => {
    const [teacherIds, setTeacherIds] = useState([]);

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        select_all_teacher: "",
        teacher_id: false,
    });

    const CreateBirthdayListData = (e) => {
        e.preventDefault();

    };
    //form validation end

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData = { ...data, [name]: value };

        if (name === 'select_all_teacher') {
            let newteacherIds = [];
            teachers.forEach(student => {
                newFormData[`student_${student.id}`] = value;
                if (value) {
                    newteacherIds.push(student.id);
                }
            });
            setTeacherIds(value ? newteacherIds : []);
        } else {
            const studentId = parseInt(name.split('_')[1]);
            if (value) {
                setTeacherIds([...teacherIds, studentId]);
            } else {
                setTeacherIds(teacherIds.filter(id => id !== studentId));
            }
            newFormData.select_all_student = teachers.every(student => newFormData[`student_${student.id}`]);
        }

        setData(newFormData);
    };

    //handle Checkbox end
    useEffect(() => {
        setBirthdayData('teacherIds', teacherIds);
    }, [teacherIds]);

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
                                                            id="select_all_teacher"
                                                            name="select_all_teacher"
                                                            checked={
                                                                data.select_all_teacher
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_teacher"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Birthdate</th>
                                            <th>Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            teachers.length > 0 ? (
                                                teachers.map((teacher, index) => <tr key={index}>
                                                    <td>
                                                        <div className="educare-checkbox-styles">
                                                            <label className="inline-block">
                                                                <Checkbox
                                                                    name={`teacher_${teacher.id}`}
                                                                    checked={
                                                                        teacherIds.includes(teacher.id)
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleCheckboxSelect(
                                                                            e.target
                                                                                .name,
                                                                            e.target
                                                                                .checked
                                                                        )
                                                                    }
                                                                />
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {teacher.name}
                                                    </td>
                                                    <td>{teacher.birth_date}</td>
                                                    <td>
                                                        {teacher.phone}
                                                    </td>
                                                </tr>)
                                            ) : <tr>
                                                <td colSpan={4} className='text-center'>Data not found</td>
                                            </tr>
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
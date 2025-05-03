import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Transition } from "@headlessui/react";
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { useState } from 'react';
import RadioInput from '@/Components/RadioInput';
import Checkbox from '@/Components/Checkbox';
import { Link, router, useForm } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import React from 'react';
import { useRef } from 'react';
import TextareaInput from '@/Components/TextareaInput';

const ComposeList = ({audienceTypes, classrooms, students, teachers, admins, classTeacher, subjectTeachers}) => {

    const fromSelectInput = useRef();
    const searchFromInput = useRef();
    const messageTitleInput = useRef();
    const eventCreateDetailsInput = useRef();
    const fileUploadFileInput = useRef();

    teachers = teachers.map((teacher) => ({
        id: teacher?.id,
        title: `${teacher?.first_name} ${teacher?.middle_name} ${teacher?.last_name}`,
    }));

    admins = admins.map((admin) => ({
        id: admin?.id,
        title: `${admin?.first_name} ${admin?.middle_name} ${admin?.last_name}`,
    }));

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        audience_type: "",
        classroom_id: "",
        search_from: "",
        subject: "",
        body: "",
        messageFile: "",
        // Radio
        assign_type: "",
        assign_type_b: "",
        enable_type: "",
        // Checkbox
        dummy_checkbox_1: "",
        dummy_checkbox_2: "",
        dummy_checkbox_3: "",
        select_assign_class_all: "",
        monday_assign_class_id: false,
        tuesday_assign_class_id: false,
        wednesday_assign_class_id: false,
        thursday_assign_class_id: false,
        friday_assign_class_id: false,
        saturday_assign_class_id: false,
        sunday_assign_class_id: false,
        // Checkbox Two
        select_assign_individual_all: "",
        monday_assign_individual_id: false,
        tuesday_assign_individual_id: false,
        wednesday_assign_individual_id: false,
        thursday_assign_individual_id: false,
        friday_assign_individual_id: false,
        saturday_assign_individual_id: false,
        sunday_assign_individual_id: false,
        classroom_ids: [],
        student_ids: [],
        teacher_ids: [],
        admin_ids: [],
        class_teacher_ids: [],
        subject_teacher_ids: [],
    });

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData = { ...data };

        // parent will check, all child will check
        if (name === "select_assign_class_all") {
            newFormData = {
                ...data,
                [name]: value,
            };

            if (value) {
                newFormData.classroom_ids = classrooms.map(classRoom => classRoom.id);
            } else {
                newFormData.classroom_ids = [];
            }
        } else {
            const allClassID = parseInt(name.split('_').pop(), 10)
           
            if (value) {
                newFormData.classroom_ids = [...new Set([...data.classroom_ids, allClassID])];
            } else {
                newFormData.classroom_ids = data.classroom_ids.filter(id => id !== allClassID);
            }

            const allChecked = classrooms.every(classRoom => newFormData.classroom_ids.includes(classRoom.id));
            newFormData.allow_all_home_id = allChecked;
        }

        setData(newFormData);
    };
    
    
    //handle Checkbox end

    //handle Two Checkbox start
    const handleStudentCheckboxSelect = (name, value) => {
        let newFormData = { ...data };

        // parent will check, all child will check
        if (name === "select_all_student_id") {
            newFormData = {
                ...data,
                [name]: value
            };

            if (value) {
                newFormData.student_ids = students.map(student => student.id);
            }else {
                newFormData.student_ids = [];
            }
        } else {
            const allStudentID = parseInt(name.split('_').pop(), 10)
          
            if (value) {
                newFormData.student_ids = [...new Set([...data.student_ids, allStudentID])];
            } else {
                newFormData.student_ids = data.student_ids.filter(id => id !== allStudentID);
            }

            const allChecked = students.every(student => newFormData.student_ids.includes(student.id));
            newFormData.select_all_student_id = allChecked;
        }

        setData(newFormData);
    };

    //handle Teacher Checkbox
    const handleTeacherCheckboxSelect = (name, value) => {
        let newFormData = { ...data };

        // parent will check, all child will check
        if (name === "select_all_teacher_id") {
            newFormData = {
                ...data,
                [name]: value
            };

            if (value) {
                newFormData.teacher_ids = teachers.map(teacher => teacher.id);
            }else {
                newFormData.teacher_ids = [];
            }
        } else {
            const allTeacherID = parseInt(name.split('_').pop(), 10)

            if (value) {
                newFormData.teacher_ids = [...new Set([...data.teacher_ids, allTeacherID])];
            } else {
                newFormData.teacher_ids = data.teacher_ids.filter(id => id !== allTeacherID);
            }

            const allChecked = teachers.every(teacher => newFormData.teacher_ids.includes(teacher.id));
            newFormData.select_all_teacher_id = allChecked;
        }

        setData(newFormData);
    };
    //handle handleAdminCheckboxSelect

    const handleAdminCheckboxSelect = (name, value) => {
        let newFormData = { ...data };

        // parent will check, all child will check
        if (name === "select_all_admin_id") {
            newFormData = {
                ...data,
                [name]: value
            };

            if (value) {
                newFormData.admin_ids = admins.map(admin => admin.id);
            }else {
                newFormData.admin_ids = [];
            }
        } else {
            const allAdminID = parseInt(name.split('_').pop(), 10)

            if (value) {
                newFormData.admin_ids = [...new Set([...data.admin_ids, allAdminID])];
            } else {
                newFormData.admin_ids = data.admin_ids.filter(id => id !== allAdminID);
            }

            const allChecked = admins.every(admin => newFormData.admin_ids.includes(admin.id));
            newFormData.select_all_admin_id = allChecked;
        }

        setData(newFormData);
    };

    //handle handleSubjectTeacherCheckboxSelect
    const handleSubjectTeacherCheckboxSelect = (name, value) => {
        let newFormData = { ...data };

        // parent will check, all child will check
        if (name === "select_all_subject_teacher_id") {
            newFormData = {
                ...data,
                [name]: value
            };

            if (value) {
                newFormData.subject_teacher_ids = subjectTeachers.map(subjectTeacher => subjectTeacher.id);
            }else {
                newFormData.subject_teacher_ids = [];
            }
        } else {
            const allSubjectTeacherID = parseInt(name.split('_').pop(), 10)

            if (value) {
                newFormData.subject_teacher_ids = [...new Set([...data.subject_teacher_ids, allSubjectTeacherID])];
            } else {
                newFormData.subject_teacher_ids = data.subject_teacher_ids.filter(id => id !== allSubjectTeacherID);
            }

            const allChecked = subjectTeachers.every(subjectTeacher => newFormData.subject_teacher_ids.includes(subjectTeacher.id));
            newFormData.select_all_subject_teacher_id = allChecked;

        }

        setData(newFormData);
    };
    const handleComposeForm = (e) => {
        e.preventDefault();

        post(route("webmessage.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    const handleClassTeacherCheckboxSelect = (name, value) => {
        let newFormData = { ...data };
    
        // Handle "Select All" checkbox
        if (name === "select_all_class_teacher_id") {
            newFormData = {
                ...data,
                [name]: value
            };
    
            if (value) {
                // Handle both array and single teacher cases
                if (Array.isArray(classTeacher?.class_teacher)) {
                    newFormData.class_teacher_ids = classTeacher.class_teacher.map(teacher => teacher.id);
                } else if (classTeacher?.class_teacher) {
                    newFormData.class_teacher_ids = [classTeacher.class_teacher.id];
                }
            } else {
                newFormData.class_teacher_ids = [];
            }
        } else {
            // Handle individual teacher checkbox
            const teacherId = parseInt(name.split('_').pop(), 10);
    
            if (value) {
                newFormData.class_teacher_ids = [...new Set([...data.class_teacher_ids, teacherId])];
            } else {
                newFormData.class_teacher_ids = data.class_teacher_ids.filter(id => id !== teacherId);
            }
    
            // Update "Select All" checkbox state
            if (Array.isArray(classTeacher?.class_teacher)) {
                const allChecked = classTeacher.class_teacher.every(teacher => 
                    newFormData.class_teacher_ids.includes(teacher.id)
                );
                newFormData.select_all_class_teacher_id = allChecked;
            } else if (classTeacher?.class_teacher) {
                // For single teacher case
                newFormData.select_all_class_teacher_id = 
                    newFormData.class_teacher_ids.includes(classTeacher.class_teacher.id);
            }
        }
    
        setData(newFormData);
    };

    // handle change class start
    const handleChangeAudience = (value) => {
        const updatedData = {
            ...data,
            audience_type: value
        };
        
        setData(updatedData);
        router.post(route('webmessage.compose'), updatedData);
    }
    
    const handleChangeClassrooms = (value) => {
        // setData((prevData) => ({
        //     ...prevData,
        //     classroom_id: value
        // }));
        const updatedData = {
            ...data,
            classroom_id: value
        };

        setData(updatedData);
        router.post(route('webmessage.compose'), updatedData);
    }

    return (
        <div className="educare-web-message-compose-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form>
                <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="audience_type"
                                    value="Form Select"
                                />
                                <SelectInput
                                    id="audience_type"
                                    data_label="Audience"
                                    data={audienceTypes}
                                    ref={
                                        fromSelectInput
                                    }
                                    value={
                                        data.audience_type
                                    }
                                    onChange={(e) => handleChangeAudience(e.target.value) }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.audience_type
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="search_from"
                                    value="Search From"
                                />
                                <TextInput
                                    id="search_from"
                                    ref={
                                        searchFromInput
                                    }
                                    value={
                                        data.search_from
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search_from",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.search_from
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {/* Parents */}
                        {data.audience_type === 'Parents' && classrooms && students && (
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                            <RadioInput
                                                name="enable_type"
                                                value="Assign To Classes Wise"
                                                checked={data.enable_type === "Assign To Classes Wise"}
                                                onChange={(e) => setData("enable_type", e.target.value)}
                                            />
                                        </div>
                                        {data?.audience_type === 'Parents' && data?.enable_type === 'Assign To Classes Wise' && (
                                            <div className="educare-radio-select-item">
                                                <div className="flex flex-wrap gap-3">
                                                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                                        <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id="select_assign_class_all"
                                                                        name="select_assign_class_all"
                                                                        checked={
                                                                            data.select_assign_class_all
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(e.target.name,e.target.checked)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <InputLabel
                                                                        htmlFor="select_assign_class_all"
                                                                        value="Select All"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        { classrooms && classrooms.map((classroom, index) => (
                                                            <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id={"class_room_" + classroom.id}
                                                                            name={"class_room_" + classroom.id}
                                                                            checked = {data.classroom_ids.includes(classroom.id)}
                                                                            onChange={(e) =>
                                                                                handleCheckboxSelect(e.target.name,e.target.checked)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor={"class_room_" + classroom.id}
                                                                            value={classroom.title}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                            <RadioInput
                                                 name="enable_type"
                                                 value="Assign To Individual"
                                                 checked={data.enable_type === "Assign To Individual"}
                                                 onChange={(e) => setData("enable_type", e.target.value)}
                                            />
                                        </div>
                                    
                                        {data?.audience_type === 'Parents' && data?.enable_type === 'Assign To Individual' && (
                                            <>
                                                <div className="col-span-12 lg:col-span-6 mb-5">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="classroom_id"
                                                            value="Select Class"
                                                        />
                                                        <SelectInput
                                                            id="classroom_id"
                                                            data_label="Classroom"
                                                            data={classrooms}
                                                            ref={
                                                                fromSelectInput
                                                            }
                                                            value={
                                                                data.classroom_id
                                                            }
                                                            onChange={(e) => handleChangeClassrooms(e.target.value) }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.classroom_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="educare-radio-select-item">
                                                    <div className="flex flex-wrap gap-3">
                                                        <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                                            <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    <div className="educare-create-school-settings-list-check width-full">
                                                                        <Checkbox
                                                                            id="select_all_student_id"
                                                                            name="select_all_student_id"
                                                                            checked={
                                                                                data.select_all_student_id
                                                                            }
                                                                            onChange={(e) =>
                                                                                handleStudentCheckboxSelect(e.target.name,e.target.checked)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor="select_all_student_id"
                                                                            value="Select All"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {students && students.map((student, index) => (
                                                                <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                            <Checkbox
                                                                                id={"student_data_" + student.id}
                                                                                name={"student_data_" + student.id}
                                                                                checked={data.student_ids.includes(student.id)}
                                                                                onChange={(e) =>
                                                                                    handleStudentCheckboxSelect(e.target.name,e.target.checked)
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="educare-create-school-settings-list-title width-full">
                                                                            <InputLabel
                                                                                htmlFor={"student_data_" + student.id}
                                                                                value={student.title}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Teachers */}
                        {data.audience_type === 'Teachers' && teachers && (
                            <div className="col-span-12 lg:col-span-12">
                                <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                    <RadioInput
                                         name="enable_type"
                                         value="Assign To Teachers"
                                         checked={data.enable_type === "Assign To Teachers"}
                                         onChange={(e) => setData("enable_type", e.target.value)}
                                    />
                                </div>
                                <div className="educare-radio-select-item">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                            <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_teacher_id"
                                                            name="select_all_teacher_id"
                                                            checked={
                                                                data.select_all_teacher_id
                                                            }
                                                            onChange={(e) =>
                                                                handleTeacherCheckboxSelect(e.target.name,e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_teacher_id"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            { teachers && teachers?.map((teacher, index) => (
                                                <div className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={"teacher_data_" + teacher.id}
                                                                name={"teacher_data_" + teacher.id}
                                                                checked = {data.teacher_ids.includes(teacher.id)}
                                                                onChange={(e) =>
                                                                    handleTeacherCheckboxSelect(e.target.name,e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={"teacher_data_" + teacher.id}
                                                                value={teacher.title}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Admins */}
                        {data.audience_type === 'Admin' && admins && (
                            <div className="col-span-12 lg:col-span-12">
                                <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                    <RadioInput
                                         name="enable_type"
                                         value="Assign To Admins"
                                         checked={data.enable_type === "Assign To Admins"}
                                         onChange={(e) => setData("enable_type", e.target.value)}
                                    />
                                </div>
                                <div className="educare-radio-select-item">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                            <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_admin_id"
                                                            name="select_all_admin_id"
                                                            checked={
                                                                data.select_all_admin_id
                                                            }
                                                            onChange={(e) =>
                                                                handleAdminCheckboxSelect(e.target.name,e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_admin_id"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            { admins && admins?.map((admin, index) => (
                                                <div key={admin.id} className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={"admin_data_" + admin.id}
                                                                name={"admin_data_" + admin.id}
                                                                checked = {data.admin_ids.includes(admin.id)}
                                                                onChange={(e) =>
                                                                    handleAdminCheckboxSelect(e.target.name,e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={"admin_data_" + admin.id}
                                                                value={admin.title}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Class Teachers */}
                        {data.audience_type === 'Class Teachers' && classTeacher?.class_teacher && (
                            <div className="col-span-12 lg:col-span-12">
                                <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                    <RadioInput
                                        name="enable_type"
                                        value="Assign To Class Teachers"
                                        checked={data.enable_type === "Assign To Class Teachers"}
                                        onChange={(e) => setData("enable_type", e.target.value)}
                                    />
                                </div>
                                <div className="educare-radio-select-item">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                            <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_class_teacher_id"
                                                            name="select_all_class_teacher_id"
                                                            checked={data.select_all_class_teacher_id}
                                                            onChange={(e) =>
                                                                handleClassTeacherCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_class_teacher_id"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Handle both single object and array cases */}
                                            {Array.isArray(classTeacher?.class_teacher) ? (
                                                // If it's an array, map through it
                                                classTeacher.class_teacher.map((teacher) => (
                                                    <div key={teacher.id} className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`class_teacher_data_${teacher.id}`}
                                                                    name={`class_teacher_data_${teacher.id}`}
                                                                    checked={data.class_teacher_ids.includes(teacher.id)}
                                                                    onChange={(e) =>
                                                                        handleClassTeacherCheckboxSelect(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={`class_teacher_data_${teacher.id}`}
                                                                    value={teacher.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div key={classTeacher.class_teacher.id} className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`class_teacher_data_${classTeacher.class_teacher.id}`}
                                                                name={`class_teacher_data_${classTeacher.class_teacher.id}`}
                                                                checked={data.class_teacher_ids.includes(classTeacher.class_teacher.id)}
                                                                onChange={(e) =>
                                                                    handleClassTeacherCheckboxSelect(e.target.name, e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`class_teacher_data_${classTeacher.class_teacher.id}`}
                                                                value={`${classTeacher.class_teacher.first_name} ${classTeacher.class_teacher.middle_name} ${classTeacher.class_teacher.last_name}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                         
                        {/* Admins */}
                        {data.audience_type === 'Subject Teachers' && subjectTeachers && (
                            <div className="col-span-12 lg:col-span-12">
                                <div className="educare-radio-field-styles flex gap-3 mb-4 border-b pb-2 border-border/50">
                                    <RadioInput
                                            name="enable_type"
                                            value="Assign To Subject Teachers"
                                            checked={data.enable_type === "Assign To Subject Teachers"}
                                            onChange={(e) => setData("enable_type", e.target.value)}
                                    />
                                </div>

                                <div className="educare-radio-select-item">
                                    <div className="flex flex-wrap gap-3">
                                        <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                                            <div className="col-span-12 minMax2Xl:col-span-12 maxXl:col-span-12 maxMd:col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_subject_teacher_id"
                                                            name="select_all_subject_teacher_id"
                                                            checked={data.select_all_subject_teacher_id}
                                                            onChange={(e) =>
                                                                handleSubjectTeacherCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_subject_teacher_id"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            { subjectTeachers && subjectTeachers?.map((teacher, index) => (
                                                <div key={teacher.id} className="col-span-6 minMax2Xl:col-span-6 maxXl:col-span-6 maxMd:col-span-12">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`subject_teacher_data_${teacher.id}`}
                                                                name={`subject_teacher_data_${teacher.id}`}
                                                                checked={data.subject_teacher_ids.includes(teacher.id)}
                                                                onChange={(e) =>
                                                                    handleSubjectTeacherCheckboxSelect(e.target.name, e.target.checked)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`subject_teacher_data_${teacher.id}`}
                                                                value={teacher.title}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="subject"
                                    value="Message Title"
                                />
                                <TextInput
                                    id="subject"
                                    ref={
                                        messageTitleInput
                                    }
                                    value={
                                        data.subject
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "subject",
                                            e.target.value
                                        )
                                    }
                                    placeHolder="Write User Name"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.subject
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <InputLabel value="Input Type File" />
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="messageFile"
                                        ref={
                                            fileUploadFileInput
                                        }
                                        type="file"
                                        name="messageFile"
                                        onChange={(e) =>
                                            setData(
                                                "messageFile",
                                                e.target
                                                    .files[0]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="body"
                                            value="Write Message"
                                        />
                                    </div>
                                </div>
                                <TextareaInput
                                    id="body"
                                    ref={
                                        eventCreateDetailsInput
                                    }
                                    value={
                                        data.body
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "body",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.body
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 text-end">
                    <div className="educare-button-field-styles flex flex-wrap gap-4 justify-end  border-grayLight/20">
                        <PrimaryButton
                            type="submit"
                            onClick={handleComposeForm}
                            className="educare-primary-btn-lg-fill"
                        >
                            Sent
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ComposeList;
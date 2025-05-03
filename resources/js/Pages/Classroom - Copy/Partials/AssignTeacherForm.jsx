import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

export default function ClassForm({ classrooms, teachers, selectedTeachers = [] }) {
    const [teacherSelectOptions, setTeacherSelectOptions] = useState(Array(teachers.length).fill(null));

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        teacher_ids: [],
        classroom_ids: [],
    });

    const handleSelectChange = (index, value, classroom_id) => {
        const newOptions = [...teacherSelectOptions];
        newOptions[index] = value || '';
        setTeacherSelectOptions(newOptions);
        setData('teacher_ids', newOptions.filter(option => option !== null));
        value['classroom_id'] = classroom_id;


    };

    const handleRemoveOption = (index) => {
        const newOptions = [...teacherSelectOptions];
        newOptions[index] = null;
        setTeacherSelectOptions(newOptions);
    };

    const assignTeacherData = (e) => {
        e.preventDefault();
        post(route("classroom.assign_teacher_save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    useEffect(() => {
        classrooms.filter(teacherFilter);
    }, [classrooms])

    const teacherFilter = (classroom) => {

        
        if( selectedTeachers.includes(classroom.class_teacher_id) ) {
            let index = teachers.findIndex( x => x.id === classroom.class_teacher_id );
            const newOptions = [...teacherSelectOptions];
            newOptions[index] = teachers[index] || '';
            setTeacherSelectOptions(newOptions);
            setData('teacher_ids', newOptions.filter(option => option !== null));
        }
    };

    return (
        <div className="educare-master-create-shift-area">

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-UsersThree"></i>
                            Assign Teacher
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-create-school-details-form-wrap">
                                <form onSubmit={assignTeacherData}>
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <div className="educare-custom-table">
                                            <div className="educare-custom-table-body">
                                                <div className="grid grid-cols-12 gap-2.5">
                                                    {classrooms.map(
                                                        (item, index) => (
                                                            <div
                                                                className="col-span-12 minMax3Xl:col-span-3 lg:col-span-4 md:col-span-6"
                                                                key={index}
                                                            >
                                                                <div className="educare-custom-table-row bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)]">
                                                                    <div className="educare-custom-table-column border-b border-border/20">
                                                                        <h6 className="text-[16px] mb-[3px]">
                                                                            {item.title}
                                                                        </h6>
                                                                    </div>
                                                                    <div className="educare-custom-table-column">
                                                                        <div className="educare-time-table-select min-h-[100px]">
                                                                            <div className="educare-input-field-styles mb-1">
                                                                                <div className="educare-input-type-file-styles" data-class_teacher_id={item.class_teacher_id}>
                                                                                    <Autocomplete
                                                                                        disablePortal
                                                                                        id={`combo-box-demo-${index}`}
                                                                                        options={teachers}
                                                                                        getOptionLabel={(option) => option.title}
                                                                                        value={teachers.filter(x => x.id === item.class_teacher_id)[0] ?? 0 }
                                                                                        onChange={(_,value) => handleSelectChange(index, value, item.id)}
                                                                                        renderInput={(
                                                                                            params
                                                                                        ) => (
                                                                                            <TextField
                                                                                                {...params}
                                                                                                placeholder="Select Teacher"
                                                                                            />
                                                                                        )}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="educare-multiple-check-item">
                                                                                <ul>
                                                                                    {teacherSelectOptions[
                                                                                        index
                                                                                    ] && (
                                                                                            <li>
                                                                                                <span>
                                                                                                    {
                                                                                                        teacherSelectOptions[
                                                                                                            index
                                                                                                        ]
                                                                                                            .title
                                                                                                    }
                                                                                                </span>
                                                                                                <div>
                                                                                                    <Tooltip
                                                                                                        title="Delete"
                                                                                                        placement="top"
                                                                                                        arrow
                                                                                                    >
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            className="educare-danger-btn-sm-fill"
                                                                                                            onClick={() =>
                                                                                                                handleRemoveOption(
                                                                                                                    index
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <i className="icon-TrashSimple"></i>
                                                                                                        </button>
                                                                                                    </Tooltip>
                                                                                                </div>
                                                                                            </li>
                                                                                        )}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <PrimaryButton
                                            disabled={processing}
                                            type="submit"
                                            className="mt-5 educare-primary-btn-md-fill"
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

export default function AssignTeacherForm({ subjects, teachers, selectedTeachers, id }) {

    const [teacherSelectOptions, setTeacherSelectOptions] = useState(Array(teachers.length).fill({id: null, title: null, subject_id: null}));
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        teacher_ids: selectedTeachers
    });

    const handleSelectChange = (index, values, subject_id) => {
        const newOptions = [...teacherSelectOptions];
        console.log(values);
        values.map( (value, indx) => {
            let insertIndex = newOptions.findIndex( x => x.id === null );
            let alreadyExist = newOptions.findIndex( x => x.id === value.id );
            if(insertIndex >= 0 && (alreadyExist == -1) ) {
                newOptions[insertIndex] = value || '';
                newOptions[insertIndex].subject_id = subject_id;
                console.log(newOptions);
                setTeacherSelectOptions(newOptions);
                setData('teacher_ids', newOptions.filter(option => option.id !== null));
            }
        })
    };

    const handleRemoveOption = (option, index) => {
        const newOptions = [...teacherSelectOptions];
        let realIndex = newOptions.findIndex( x => x.id === option.id );
        newOptions[realIndex] = {id: null, title: null, subject_id: null};
        console.log(newOptions);
        setTeacherSelectOptions(newOptions);
    };

    const assignTeacherData = (e) => {
        e.preventDefault();
        post(route("subject.assign_teacher_save", id), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    useEffect(() => {
        const newOptions = [...teacherSelectOptions];
        selectedTeachers.map( (value, indx) => {
            newOptions[indx] = value || '';
            setTeacherSelectOptions(newOptions);
            setData('teacher_ids', newOptions.filter(option => option.id !== null));
        })
        console.log(newOptions);
        console.log(subjects, "h111");
    }, [selectedTeachers]);

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
                                {subjects.length > 0 ? (
                                <form onSubmit={assignTeacherData}>
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <div className="educare-custom-table">
                                            <div className="educare-custom-table-body">
                                                <div className="grid grid-cols-12 gap-2.5">
                                                    {subjects && subjects.map(
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
                                                                                <div className="educare-input-type-file-styles multi1">
                                                                                    <Autocomplete
                                                                                        multiple
                                                                                        id={`combo-box-demo-${index}`}
                                                                                        options={teachers}
                                                                                        getOptionLabel={(option) => option.title}
                                                                                        value={teachers.filter(x => x.id === item.teacher_id)}
                                                                                        onChange={(_,value) => handleSelectChange(index, value, item.subject_id)}
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
                                                                                    {teacherSelectOptions && teacherSelectOptions.map((option, optionIndex) => (
                                                                                        //let realIndex = newOptions.findIndex( x => x.id === value.id );
                                                                                        option?.title && (option?.subject_id == item.subject_id) ? (
                                                                                        <li key={optionIndex} className={`${(option?.subject_id == item.subject_id) ? 'hidden' : ''}`}>
                                                                                            <span>{option && option?.title} </span>
                                                                                            <div>
                                                                                                <Tooltip title="delete" placement="top" arrow>
                                                                                                    <button type='button' className="educare-danger-btn-sm-fill" onClick={() => handleRemoveOption(option, optionIndex)}>
                                                                                                        <i className="icon-TrashSimple"></i>
                                                                                                    </button>
                                                                                                </Tooltip>
                                                                                            </div>
                                                                                        </li>
                                                                                        ):''
                                                                                    ))}
                                                                            
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
                                ): (
                                    <p>Currently you have no subjects in class. You need to add subjects in class. Please click on the following link: <br />
                                        <Link href={route('subject.assign_to_class')}>Assign Subjects to Class</Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

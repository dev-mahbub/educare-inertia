import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import UpgradeTargetList from "./UpgradeTargetList"
import { Tooltip } from '@mui/material';


const UpgradeTarget = ({
    academicYearId,
    academicSession = [],
    classrooms = [],
    data,
    setData,
    errors,
    handleSearch2,
    classroomUpgradeStudents,
    loading2,
    setLoading2,
    user,
}) => {

    const [filterClassroom, setFilterClassroom] = useState([]);
    const [filterAcademicYears, setFilterAcademicYears] = useState([]);
    const [sessionValue, setSessionValue] = useState('');

    const handleAcademicYear = (yearId) => {
        setData('target_academic_year_id', yearId);

        // filter classroom
        const filteredClassrooms = classrooms?.filter(classroom => {
            return classroom.academic_year_id == yearId;
        });
        setFilterClassroom(filteredClassrooms);

        // session data
        const sessionData = academicSession?.find((item) => (item?.id == yearId));
        if (sessionData) {
            setSessionValue(sessionData);
        }

        console.log('yearId', yearId);
    }

    useEffect(() => {
        setFilterAcademicYears(academicSession?.filter(item => item?.id != academicYearId));
    }, [academicSession]);

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-wrap-border">
                        <div className='grid grid-cols-12 gap-5'>
                            <div className="col-span-12 md:col-span-5">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Target Academic year"
                                            />
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="target academic year"
                                        data={filterAcademicYears}
                                        value={data?.target_academic_year_id}
                                        onChange={(e) => handleAcademicYear(e.target.value)}
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors?.target_academic_year_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Select class"
                                            />
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label=" target class"
                                        data={filterClassroom}
                                        onChange={(e) =>
                                            setData("target_classroom_id", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors?.target_classroom_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <div className="educare-filter-action-btn min-h-full flex items-end">
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
                                                onClick={(e) => handleSearch2(e)}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpgradeTargetList
                sessionValue={sessionValue}
                classroomUpgradeStudents={classroomUpgradeStudents}
                loading2={loading2}
                setLoading2={setLoading2}
                user={user}
            />
        </>
    );
};

export default UpgradeTarget;

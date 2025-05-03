import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { Link } from '@inertiajs/react';
import React from 'react';
import UpgradeSourceList from './UpgradeSourceList';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

const UpgradeSource = ({
    academicYearId,
    academicSession = [],
    classrooms = [],
    data,
    setData,
    errors,
    handleSearch,
    classroomStudents,
    students,
    loading,
    setLoading,
    handelUpgradeStudent,
}) => {

    const [filterClassroom, setFilterClassroom] = useState([]);
    const [sessionValue, setSessionValue] = useState('');

    const handleAcademicYear = (yearId) => {
        setData('academic_year_id', yearId);

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
    }

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
                                                value="Academic year"
                                            />
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="academic year"
                                        data={academicSession}
                                        value={data?.academic_year_id}
                                        onChange={(e) => handleAcademicYear(e.target.value)}
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors?.academic_year_id
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
                                        data_label="class"
                                        data={filterClassroom}
                                        value={data?.classroom_id}
                                        onChange={(e) =>
                                            setData("classroom_id", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors?.classroom_id
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
                                                onClick={(e) => handleSearch(e)}
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
            <UpgradeSourceList
                data={data}
                setData={setData}
                errors={errors}
                classroomStudents={classroomStudents}
                students={students}
                loading={loading}
                setLoading={setLoading}
                sessionValue={sessionValue}
                handelUpgradeStudent={handelUpgradeStudent}
            />
        </>
    );
};

export default UpgradeSource;

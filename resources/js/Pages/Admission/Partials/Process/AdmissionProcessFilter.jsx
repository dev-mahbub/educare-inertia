import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const AdmissionProcessFilter = ({ academicYears }) => {

    // const {
    //     data,
    //     setData,
    //     errors,
    //     post,
    //     reset,
    //     processing,
    //     recentlySuccessful,
    // } = useForm({
    //     academic_year: "",
    // });

    // const admissionProcessFilterData = (e) => {
    //     e.preventDefault();

    //     post(route('school.save'), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //         onError: (errors) => {

    //         },
    //     });
    // };

    const handleAcademicYear = (id) => {
        console.log(id);
        router.post(route('get_classroom_by_acy'), { 'id': id });
    }

    return (
        <div className='mb-5'>
            <div className='flex flex-wrap gap-2.5'>
                <div className="educare-input-field-styles">
                    <SelectInput
                        id="academic_year_id"
                        data_label="Academic Year"
                        data={academicYears}
                        // value={
                        //     data.academic_year_id
                        // }
                        onChange={(e) => handleAcademicYear(e.target.value)}
                        className="block"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdmissionProcessFilter;

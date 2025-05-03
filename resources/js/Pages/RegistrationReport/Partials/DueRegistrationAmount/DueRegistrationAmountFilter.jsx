import React from 'react';
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { useForm, router, usePage } from "@inertiajs/react";
import useScrollableFilterBar from '@/Utils/FilterArrow';
import { useState } from "react";
import { useEffect } from "react";


const DueRegistrationAmountFilter = ({ academicYear, onSelectAcademicYear , setEnquiryRegAmountData}) => {

    
    const { flash } = usePage().props

    const [getAmountReg, setAmountReg] = useState([]);

    const handleAcademicYearChange = (e) => {
        handlerAcademicYear(e);
    };

    useEffect(() => {
        if(flash.enquiryRegAmountData){
            setEnquiryRegAmountData(flash.enquiryRegAmountData)
            setAmountReg(flash.enquiryRegAmountData)
        }
    },[flash])

    console.log(getAmountReg);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_year: "",
        academic_year_id: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
               
            },
        });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    const handlerAcademicYear = (e) => {
        e.preventDefault();
        setData({
            academic_year_id: e.target.value
        })

        router.post(route('get_reg_amount_by_ac_id'), {academic_year_id : e.target.value})
    }


    return (
        <form onSubmit={CommonHeaderFilterData}>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Registration Due Report
                </h5>
            </div>
            <div className='flex justify-between flex-wrap items-center mb-2.5'>
                <div className="educare-header-filtar-bar-count mb-2.5">
                <span>Total: {getAmountReg.length}</span>
                </div>
                <div className="educare-select-field-styles">
                    <SelectInput
                        id="select_year"
                        data_label="Academic Year"
                        data={academicYear}
                        onChange={handleAcademicYearChange}
                    />
                    <InputError
                        message={errors.select_year}
                        className="mt-2"
                    />
                </div>
            </div>
        </form>
    );
};

export default DueRegistrationAmountFilter;
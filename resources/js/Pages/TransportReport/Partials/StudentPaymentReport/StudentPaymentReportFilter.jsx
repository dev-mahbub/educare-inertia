import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const multipleSelectorData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
];

const StudentPaymentReportFilter = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
      setSelectedOptions(value);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        select_route: "",
    });

    const handleStudentReportData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };
    
    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Route Stoppages
                </h5>
            </div>
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div>
                    <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total Count: 30</span>
                </div>
                <form onSubmit={handleStudentReportData}>
                    <div className='inline-flex gap-2.5'>
                        <div className='min-w-[200px] max-w-[200px]'>
                            <div className="educare-input-field-styles w-full">
                                <div className="educare-input-type-file-styles">
                                    <Autocomplete
                                        multiple
                                        options={multipleSelectorData}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        value={selectedOptions}
                                        onChange={handleSelectChange}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label=""
                                            placeholder="Select Class"
                                        />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="educare-filter-action-btn inline-flex gap-2">
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                >
                                    <button type='button'
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                >
                                    <button type='button'
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default StudentPaymentReportFilter;
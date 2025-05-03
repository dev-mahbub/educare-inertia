import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const RouteStoppagesFilter = () => {

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

    const handleRouteSelectData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };
    
    return (
        <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
            <div className="educare-card-title pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Route Stoppages
                </h5>
            </div>
            <form onSubmit={handleRouteSelectData}>
                <div className='flex gap-2.5'>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_route"
                            data_label="Route"
                            data={[]}
                            value={
                                data.select_route
                            }
                            onChange={(e) =>
                                setData(
                                    "select_route",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_route
                            }
                            className="mt-2"
                        />
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
    );
};

export default RouteStoppagesFilter;
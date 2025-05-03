import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const StaffOnLeaveTodayFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_field: "",
    });
    const headerTopData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Today's Staffs On Leave Report
                </h5>
            </div>
            <form onSubmit={headerTopData}>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div className="educare-header-filtar-bar-count mr-auto">
                        <span>Total: 3</span>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_field"
                                value={
                                    data.search_field
                                }
                                onChange={(e) =>
                                    setData(
                                        "search_field",
                                        e.target.value
                                    )
                                }
                                placeHolder="Search here"
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.search_field
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StaffOnLeaveTodayFilter;
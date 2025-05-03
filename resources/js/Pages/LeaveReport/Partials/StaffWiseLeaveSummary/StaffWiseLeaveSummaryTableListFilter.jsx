import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const StaffWiseLeaveSummaryTableListFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_leave: "",
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
        <form onSubmit={headerTopData}>
            <div className='flex flex-wrap gap-2.5 justify-end mt-5 items-center mb-2.5'>
                <div className='flex flex-wrap  gap-2.5 items-center'>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="select_leave"
                            data_label="Leave"
                            data={[]}
                            value={
                                data.select_leave
                            }
                            onChange={(e) =>
                                setData(
                                    "select_leave",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_leave
                            }
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StaffWiseLeaveSummaryTableListFilter;
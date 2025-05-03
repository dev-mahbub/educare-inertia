import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import React from 'react';
import { useForm } from '@inertiajs/react';

const TeamManageTableListFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_team: "",
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
            <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        School teams
                    </h5>
                </div>
                <div className='flex flex-wrap gap-2.5 items-center'>
                    <div>
                        <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>Total : 1 Teams</span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search_team"
                            value={
                                data.search_team
                            }
                            onChange={(e) =>
                                setData(
                                    "search_team",
                                    e.target.value
                                )
                            }
                            placeHolder="Enter team name"
                            className="block"
                        />
                        <InputError
                            message={
                                errors.search_team
                            }
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TeamManageTableListFilter;
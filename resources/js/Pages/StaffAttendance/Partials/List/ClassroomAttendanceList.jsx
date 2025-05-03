import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import React from 'react';

const ClassroomAttendanceList = () => {

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({});

    const attendanceListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    //form validation end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={attendanceListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Roll No.</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>101</td>
                                            <td>Andrew</td>
                                            <td>
                                                <div className="educare-list-stroke-btns flex flex-nowrap gap-2">
                                                    <div className="secondary-stroke-small-btn">
                                                        <PrimaryButton className="inline-block">
                                                            Present
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="danger-stroke-small-btn">
                                                        <SecondaryButton className="inline-block">
                                                            Absent
                                                        </SecondaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>102</td>
                                            <td>Peter</td>
                                            <td>
                                                <div className="educare-list-stroke-btns flex flex-nowrap gap-2">
                                                    <div className="secondary-stroke-small-btn">
                                                        <SecondaryButton className="inline-block">
                                                            Present
                                                        </SecondaryButton>
                                                    </div>
                                                    <div className="danger-stroke-small-btn">
                                                        <SecondaryButton className="inline-block">
                                                            Absent
                                                        </SecondaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClassroomAttendanceList;
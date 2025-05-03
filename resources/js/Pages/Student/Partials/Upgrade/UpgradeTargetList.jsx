import { useForm } from '@inertiajs/react';
import React from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import { concatName } from '@/Hooks/GlobalFunction';
import Loader from '@/Components/Loader';
import { useEffect } from 'react';
import moment from 'moment/moment';

const UpgradeTargetList = ({
    sessionValue,
    classroomUpgradeStudents = [],
    loading2,
    setLoading2,
    user,
}) => {

    const [upgradeStudentData, setUpgradeStudentData] = useState(classroomUpgradeStudents);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setUpgradeStudentData(classroomUpgradeStudents);
        setLoading2(false);
    }, [classroomUpgradeStudents])

    const handleSearch = (value) => {
        setSearchQuery(value);
        const filteredStudents = classroomUpgradeStudents.filter(item => {
            const fullName = concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name).toLowerCase();
            const fatherFullName = concatName(item?.student?.father?.first_name, item?.student?.father?.middle_name, item?.student?.father?.last_name).toLowerCase();

            return (
                fullName.includes(value.toLowerCase()) ||
                fatherFullName.includes(value.toLowerCase())
            );
        });
        setUpgradeStudentData(filteredStudents);
    };

    return (
        <>
            <div className="educare-card-title mr-auto pb-none flex flex-wrap items-center gap-2">
                <h5>
                    <i className="icon-ListBullets"></i>
                    {sessionValue?.title} Target Students
                </h5>

            </div>
            <div className='flex flex-wrap gap-2 items-end my-2'>
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Total: {upgradeStudentData?.length}</span>
                </div>
                <div className='flex flex-wrap gap-2'>
                    <div className="educare-input-field-styles">
                        <TextInput
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="block"
                            placeHolder="Search here"
                        />
                    </div>
                </div>
            </div>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Student Name</th>
                                        <th>Father Name</th>
                                        <th>Upgrade Details</th>
                                    </tr>
                                </thead>
                                {loading2 ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {upgradeStudentData?.length > 0 ? (
                                            upgradeStudentData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.student?.admission_no}</td>
                                                    <td>{concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}</td>
                                                    <td>{concatName(item?.student?.father?.first_name, item?.student?.father?.middle_name, item?.student?.father?.last_name)}</td>
                                                    <td>
                                                        <span className="block"><span className="font-bold">Promoted Date -</span> {moment(item?.promoted_date_at).format("MMM DD, YYYY")}</span>
                                                        <span className="block"><span className="font-bold">Promoted By -</span> {item?.user?.username}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpgradeTargetList;

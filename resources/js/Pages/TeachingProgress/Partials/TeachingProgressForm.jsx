import React from "react";
import TeachingProgressHeader from "./TeachingProgressHeader";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import TextareaInput from '@/Components/TextareaInput';



const TeachingProgressForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_month: "",
        select_student: "",
        select_status: "",
        description: "",
    });

    return (

        <>
            <TeachingProgressHeader />
            <div>
                <div className="flex justify-between items-start flex-wrap">
                    <div className="educare-card-title mb-2 md:mb-0">
                        <h5>Find Progress of Teaching</h5>
                    </div>
                    <Link
                        href="#"
                        // disabled={processing}
                        className="educare-primary-btn-md-fill"
                    >
                        <i className='icon-info'></i> Details
                    </Link>
                </div>
                <div className="flex justify-between flex-wrap items-end gap-4">
                    <h4 className="text-heading text-[22px] font-[500] mt-7">Teaching Progress</h4>
                    <div className="educare-input-field-styles">
                        <SelectInput
                            data_label="Month"
                            data={[]}
                            value={
                                data.select_month
                            }
                            onChange={(e) =>
                                setData(
                                    "select_month",
                                    e.target.value
                                )
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.select_month
                            }
                            className="mt-2"
                        />
                    </div>
                </div>
                <div className="educare-default-table xs:overflow-x-auto mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>No. Of Classes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>English</td>
                                <td>213</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div>
                    <h4 className="text-heading text-[22px] font-[500] mt-7">Assessment</h4>
                </div>
                <div className="educare-default-table xs:overflow-x-auto mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Date</th>
                                <th>Pass/Full Marks</th>
                                <th>Pass/Fail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>test exam</td>
                                <td>2024-06-25 15:35:00</td>
                                <td>5/16</td>
                                <td>0/0</td>
                            </tr>
                            <tr>
                                <td>karoli test</td>
                                <td>2024-06-26 16:35:00</td>
                                <td>3/8</td>
                                <td>1/0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div>
                <div className="flex justify-between items-end flex-wrap gap-4  mt-7 mb-2">
                    <h4 className="text-heading text-[22px] font-[500] mt-7">Improvement Discussison</h4>
                    <div className="flex items-center flex-wrap gap-5">
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Student"
                                data={[]}
                                value={
                                    data.select_student
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_student",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_student
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Status"
                                data={[]}
                                value={
                                    data.select_status
                                }
                                onChange={(e) =>
                                    setData(
                                        "select_status",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.select_status
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="educare-input-field-styles">
                    <TextareaInput
                        value={
                            data.description
                        }
                        onChange={(e) =>
                            setData(
                                "description",
                                e.target.value
                            )
                        }
                        className="block"
                        placeholder="Enter Your Comment..."
                    />
                    <InputError
                        message={
                            errors.description
                        }
                        className="mt-2"
                    />
                </div>
            </div>
            <div className="col-span-12">
                <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                    <PrimaryButton
                        className="educare-gray-btn-lg-stroke"
                    >
                        Reset
                    </PrimaryButton>
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                    >
                        Post
                    </PrimaryButton>
                </div>
            </div>
        </>
    );
};

export default TeachingProgressForm;

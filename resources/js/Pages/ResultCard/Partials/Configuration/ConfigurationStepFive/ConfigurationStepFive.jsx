import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";

const ConfigurationStepFive = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        dummy_1: "",
        dummy_2: "",
    });

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="educare-card-title mb-2">
                    <h5>
                        Result Card Summary
                    </h5>
                </div>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="xxl:col-span-4  col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="flex flex-wrap gap-5">
                                            <h5 className="text-headingLight font-semibold">Board : </h5>
                                            <div>
                                                <span className='badge primary'>CBSE</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Class : </span>IV</h5>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Class Rule : </span>Attendance</h5>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Exam : </span>Annual Exam</h5>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Exam Rule : </span>No Cheating</h5>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Subject : </span>Mathmatics</h5>
                                    </div>
                                    <div className="col-span-12">
                                        <h5><span className="text-headingLight font-semibold">Subject Rule : </span>Study More</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xxl:col-span-8 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="mb-2.5">
                                <span className='badge info'>1 To 5th</span>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-center">CLASSES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">I</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="educare-classroom-table-wrapper">
                            <div className="mt-5 mb-2.5">
                                <span className='badge info'>1 To 5th</span>
                            </div>
                            <div className="educare-admission-list-inner-wrapper bg-supportingA/10">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>DISPLAY NAME</th>
                                                <th>SCHEDULED TEST</th>
                                                <th>PERCENTAGE(%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Final Exam</td>
                                                <td>Half Yearly Exam + Annual Exam</td>
                                                <td>Half Yearly Exam-50 %  Annual Exam-50 %</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="educare-classroom-table-wrapper">
                            <div className="mt-5 mb-2.5">
                                <span className='badge info'>1 To 5th</span>
                            </div>
                            <div className="educare-admission-list-inner-wrapper bg-supportingA/10">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>DISPLAY NAME</th>
                                                <th>SUBJECT</th>
                                                <th>WEIGHTAGE(%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Science</td>
                                                <td>Chemistry + Computer Science + </td>
                                                <td>Chemistry-50 % Computer Science-50 % </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigurationStepFive;
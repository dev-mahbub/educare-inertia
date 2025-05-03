import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import Swal from "sweetalert2";

export default function EditTermWiseReportCard({ termExams = '', termExam = '' }) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        term_name: termExam?.term_name,
    });

    const handleTermExamData = (e) => {
        e.preventDefault();
        put(route("exam.term_wise.update", termExam.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('exam.term_wise.delete', id));
            }
        });
    }

    const handleReset = (e) => {
        e.preventDefault();
        setData({
            term_name: ""
        })
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Term Wise Exams
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Term Wise Exam Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {termExams?.length > 0 ?
                                            termExams?.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.term_name}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route('exam.term_wise.edit', item.id)}
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Edit Term Wise Report Card
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleTermExamData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 xl:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="term_name"
                                                                value="Term Exam Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data.term_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "term_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.term_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        onClick={(e) => handleReset(e)}
                                                    >
                                                        Reset
                                                    </PrimaryButton>

                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

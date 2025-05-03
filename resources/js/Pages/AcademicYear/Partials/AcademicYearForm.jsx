import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ContactEditPopupForm from "./AcademicYearEditPopupForm";
import DatePicker from "react-datepicker";
import Checkbox from "@/Components/Checkbox";
import moment from "moment";
import AcademicYearEditPopupForm from "./AcademicYearEditPopupForm";
import { useEffect } from "react";

export default function AcademicYearForm({ academicYears }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const nextYearDate = new Date();
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
        return nextYearDate;
      });

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        start_date_at: "",
        end_date_at: "",
        academic_session: "",
        display_order: "",
        is_copy_class: "",
        is_copy_admission_criteria: "",
    });

    useEffect(() => {
        if (startDate && endDate) {
            const startYear = moment(startDate).format("YYYY");
            const endYear = moment(endDate).format("YYYY");
            const academicSession = `${startYear}-${endYear}`;
            setData("academic_session", academicSession);
        }
    }, [startDate, endDate]);

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    const handleFormData = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        post(route("academic_year.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(new Date());
                setEndDate(new Date());
            }
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
                router.delete(route('academic_year.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Academic years
                                </h5>
                            </div>

                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Academic year</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Display order</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {academicYears?.length > 0 ?
                                            academicYears?.map((item, indx) => (
                                                <tr key={item?.id}>
                                                    <td>{indx + 1}</td>
                                                    <td>{item?.academic_session}</td>
                                                    <td>{moment(item?.start_date_at).format("DD-MMM-YYYY")}</td>
                                                    <td>{moment(item?.end_date_at).format("DD-MMM-YYYY")}</td>
                                                    <td>{item?.display_order}</td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleEditPopup(item)}
                                                                    className="bg-warning/80 "
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="bg-danger/80 "
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
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
                                        Add academic year
                                    </h5>
                                </div>
                                <form onSubmit={handleFormData}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="start_date_at"
                                                        value="Start Date*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <DatePicker
                                                        selected={startDate}
                                                        name="start_date_at"
                                                        onChange={(date) => setStartDate(date)}
                                                        isClearable
                                                        placeholderText="Start date"
                                                        dateFormat="dd-MMM-yyyy"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.start_date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="end_date_at"
                                                        value="End Date*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <DatePicker
                                                        selected={endDate}
                                                        name="end_date_at"
                                                        onChange={(date) => setEndDate(date)}
                                                        isClearable
                                                        placeholderText="End date"
                                                        dateFormat="dd-MMM-yyyy" />

                                                    <InputError
                                                        message={
                                                            errors.end_date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="academic_session"
                                                        value="Academic session*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="academic_session"
                                                        value={data?.academic_session}
                                                        onChange={(e) =>
                                                            setData(
                                                                "academic_session",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                        disabled={true}
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.academic_session
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="display_order"
                                                        value="Display order"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="display_order"
                                                        value={data?.display_order}
                                                        onChange={(e) =>
                                                            setData(
                                                                "display_order",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="number"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.display_order
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Copy from current Academic session"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="flex justify-between">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="is_copy_class"
                                                                name="is_copy_class"
                                                                checked={
                                                                    data.is_copy_class
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "is_copy_class",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="is_copy_class"
                                                                value="Is copy class"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="is_copy_admission_criteria"
                                                                name="is_copy_admission_criteria"
                                                                checked={
                                                                    data.is_copy_admission_criteria
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "is_copy_admission_criteria",
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="is_copy_admission_criteria"
                                                                value="Is copy admission criteria"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end gap-[15px]">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Add academic year
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
            <AcademicYearEditPopupForm editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} editData={editData}></AcademicYearEditPopupForm>
        </>
    );
}

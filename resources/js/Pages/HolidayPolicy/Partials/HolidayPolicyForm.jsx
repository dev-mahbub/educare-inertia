import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";
import HolidayPolicyEditPopupForm from "./HolidayPolicyEditPopupForm";

export default function HolidayPolicyForm({ holiday_policy_days, holiday_policy_days_rule, holiday_polices }) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);
    const [days, setDays] = useState([]);

    const handleCheckboxChange = (value) => {
        if (days.includes(value)) {
            setDays(days.filter((item) => item !== value));
        } else {
            setDays([...days, value]);
        }
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        name: "",
        rule_title: "",
    });

    const handleHolidayPolicyInsert = (e) => {
        e.preventDefault();
        data.rule_title = days;
        post(route("holiday_policy.save"), {
            preserveScroll: true,
            onSuccess: () => {
                setData('');
                setDays('');
                reset()
            }
        });
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    // delete 
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
                router.delete(route('holiday_policy.destroy', id));
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
                                    School Weekend Policy
                                    <span>
                                        (Total : {holiday_polices?.length})
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Title</th>
                                            <th>Rule title</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holiday_polices?.length > 0 ?
                                            holiday_polices?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.rule_title}</td>
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
                                                <td className="text-center text-red-500" colSpan="7">Holiday policy not found</td>
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
                                        Add holiday policy
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleHolidayPolicyInsert}>
                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="day"
                                                        value="Day*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-select-field-styles">
                                                    <SelectInput
                                                        id="name"
                                                        data_label="day"
                                                        data={holiday_policy_days}
                                                        value={
                                                            data.name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target
                                                                    .value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.name
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
                                                        htmlFor="add_class"
                                                        value="Rule*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-radio-field-styles flex flex-col gap-y-4">

                                                    {holiday_policy_days_rule.length && holiday_policy_days_rule.map((item) => (
                                                        <div key={item.id}>
                                                            <input
                                                                type="checkbox"
                                                                id={item.id}
                                                                name={`rule_title[${item.id}]`}
                                                                data-select-all="b-check"
                                                                className="checkme mr-2"
                                                                checked={days.includes(item.title)}
                                                                onChange={() => handleCheckboxChange(item.title)}
                                                            />
                                                            <InputLabel
                                                                htmlFor={item.id}
                                                                value={item.title}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex gap-[15px]">
                                                <PrimaryButton
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Add policy
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HolidayPolicyEditPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData}
                holiday_policy_days={holiday_policy_days}
                holiday_policy_days_rule={holiday_policy_days_rule}
            >

            </HolidayPolicyEditPopupForm>
        </>
    );
}

import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import SelectInput from '@/Components/SelectInput';

export default function VoucherDueForm({
    transportFeeStructureSetting = [],
    academicYearData,
    currentAcademicYear,
    classNames,
}) {
    const [filterClassNameData, setFilterClassNameData] = useState([]);
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        academic_year_id: "",
        selected_class: [],
        class_all: false,
    });

    const handleVoucherData = (e) => {
        e.preventDefault();
        post(route("transport.voucher_due_setting_save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleClassNames = (acyId) => {
        const filterClass = classNames?.filter(item => item?.academic_year_id == acyId);
        setFilterClassNameData(filterClass);
    }

    const handleClass = (id) => {
        const isSelected = data.selected_class.some((classId) => classId.class_name_id === id);
        const updatedSelectedClasses = isSelected
            ? data.selected_class.filter((classId) => classId.class_name_id !== id)
            : [...data.selected_class, { class_name_id: id }];

        setData({ ...data, 'selected_class': updatedSelectedClasses, 'class_all': false });
    }

    const handleAllFee = (isChecked) => {
        if (isChecked) {
            const allClassIds = filterClassNameData.map((item) => item.id);
            const updatedSelectedClasses = allClassIds.map((class_name_id) => ({ class_name_id }));
            setData({ ...data, 'selected_class': updatedSelectedClasses, 'class_all': true });
        } else {
            setData({ ...data, 'selected_class': [], 'class_all': false });
        }
    };

    console.log(filterClassNameData);
    console.log('data', data);

    return (
        <>
            <form onSubmit={handleVoucherData}>
                <div className='flex flex-wrap gap-2.5 mb-5 items-center justify-between'>
                    <div className="educare-card-title pb-none leading-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Transfer Transport Voucher Due
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-2.5'>
                        <div className='inline-flex flex-wrap gap-2.5 items-center leading-none'>
                            <h6 className='text-[15px] font-semibold text-headingLight'>Current Session :</h6>
                            <span className='text-[15px] font-medium text-headingLight'>{currentAcademicYear?.academic_session}</span>
                        </div>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="academic_year_id"
                                data_label="Due Academic Year"
                                data={academicYearData}
                                value={
                                    data.academic_year_id
                                }
                                onChange={(e) => {
                                    setData(
                                        "academic_year_id",
                                        e.target.value
                                    )
                                    handleClassNames(e.target.value);
                                }

                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.academic_year_id
                                }
                                className="mt-2"
                            />
                        </div>
                        {
                            transportFeeStructureSetting
                                ? <div>
                                    <PrimaryButton
                                        className="educare-primary-btn-md-fill whitespace-nowrap"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Transfer Due
                                    </PrimaryButton>
                                </div>
                                :
                                ''
                        }

                    </div>
                </div>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document items-center">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="class_all"
                                                                name="class_all"
                                                                onChange={(e) => handleAllFee(e.target.checked)}
                                                                checked={data.class_all}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="class_all"
                                                                value="All class"
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>Class</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterClassNameData?.length > 0 ? (
                                                filterClassNameData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="educare-checkbox-field-styles">
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        id={`type_${index}`}
                                                                        name={`type_${index}`}
                                                                        onChange={(e) => handleClass(item?.id)}
                                                                        checked={data.selected_class.some(classId => classId.class_name_id === item.id)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item?.title}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="7"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            {
                                transportFeeStructureSetting == null && <div className="educare-input-field-notes mb-5">
                                    <p className="text-danger">Please change transport fee setting before transfer voucher due.</p>
                                </div>
                            }

                            <div className="educare-input-field-notes">
                                <h6>Note :</h6>
                                <ul>
                                    <li>
                                        1. This is one time process, once done it cannot be revert back.
                                    </li>
                                    <li>
                                        2. Make sure that all students has been upgraded into current session.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

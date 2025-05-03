import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import DatePicker from "react-datepicker";
import InputError from '@/Components/InputError';
import { useEffect } from 'react';


export default function BookEntryDamageLostPopup({
    singlePopup,
    setSinglePopup,
    bookTypeStatus = [],
    bookTypeUser = [],
    classrooms = [],
    students = [],
    teacherData = [],
    bookData = [],
}) {

    const {
        data,
        setData,
        post,
        errors,
        processing,
        reset,
    } = useForm({
        id: "",
        book_type_status: "",
        book_user_type: "",
        classroom_id: "",
        student_id: "",
        staff_id: "",
        damage_lost_date_at: "",
        damage_lost_note: "",
    });

    const handleInsetDamageLostData = (e) => {
        e.preventDefault();
        post(route("book.damage_lost_book_save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
    };

    useEffect(() => {
        setData(bookData.item);
    }, [bookData.item]);

    console.log('data', data);

    return (
        <>
            <section className="educare-admission-follow-up-area space-y-6">
                <Modal show={singlePopup} onClose={closeModal}>
                    <form onSubmit={handleInsetDamageLostData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Book Entry Damage/Lost</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <ul>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Book Title : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookData?.book_title}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Book Author : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookData?.author}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Publisher  : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookData?.publisher_name}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='educare-common-card'>
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[30px] pb-7 pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className='grid grid-cols-12 gap-5'>
                                            <div className="col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Select Book Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Book Type"
                                                        data={bookTypeStatus}
                                                        value={
                                                            data?.book_type_status
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "book_type_status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.book_type_status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Select User"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="User Type"
                                                        data={bookTypeUser}
                                                        value={
                                                            data?.book_user_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "book_user_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.book_user_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {
                                                data?.book_user_type === 'Student'
                                                    ?
                                                    <>
                                                        <div className="col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            value="Select Class"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    data_label="Class"
                                                                    data={classrooms}
                                                                    value={
                                                                        data?.classroom_id
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "classroom_id",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.classroom_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            value="Student"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    data_label="Student"
                                                                    data={students}
                                                                    value={
                                                                        data?.student_id
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "student_id",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    required
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.student_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    ''
                                            }

                                            {
                                                data?.book_user_type === 'Teacher'
                                                    ?
                                                    <div className="col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        value="Teacher"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                data_label="Teacher"
                                                                data={teacherData}
                                                                value={
                                                                    data?.staff_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "staff_id",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.staff_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    :
                                                    ''
                                            }
                                            <div className="col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Date" />
                                                    <DatePicker
                                                        selected={
                                                            data?.damage_lost_date_at && new Date(data?.damage_lost_date_at)
                                                        }
                                                        onChange={(date) =>
                                                            setData("damage_lost_date_at", date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="notes"
                                                                value="Notes"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="notes"
                                                        value={data?.damage_lost_note}
                                                        onChange={(e) =>
                                                            setData(
                                                                "damage_lost_note",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type="button" disabled={processing} className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton type="submit" disabled={processing} className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}

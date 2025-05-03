import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import TextareaInput from "@/Components/TextareaInput";

export default function MasterBookListChangeStatusPopUp({
    className = "",
    changeStatus,
    setChangeStatus,
    accNoData = [],
}) {

    const bookStatus = [
        { id: 'Active', title: 'Active' },
        { id: 'Inactive', title: 'Inactive' },
    ];

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        book_acc_no_id: "",
        status: "",
        date_at: new Date(),
        reason: "",
        current_status: "",
    });

    const handleInsetData = (e) => {
        e.preventDefault();
        post(route("book.book_status_update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const accTittle = [];
    if (accNoData?.book_acc_nos?.length > 0) {
        accNoData?.book_acc_nos?.forEach(element => {
            accTittle.push({
                id: element?.id,
                title: element?.acc_no,
                status: element?.status,
            });
        });
    }

    const handleAccNo = (id) => {
        const filteredItem = accNoData?.book_acc_nos?.find(item => item?.id == id);
        setData({
            ...data,
            book_acc_no_id: id,
            current_status: filteredItem?.status,
        });
    }

    const closeModal = () => {
        setChangeStatus(false);
        reset();
    };

    console.log('data', data);

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={changeStatus} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Update Book Status</h5>
                            </div>
                            <div className="mt-2.5 mb-2.5">
                                <p>
                                    <strong>Book Title : </strong>
                                    {accNoData?.book_title}
                                </p>
                                <p>
                                    <strong>Book Author : </strong>
                                    {accNoData?.author}
                                </p>
                                <p>
                                    <strong>Publisher : </strong>
                                    {accNoData?.publisher_name}
                                </p>
                            </div>
                            <form onSubmit={handleInsetData}>
                                <div className="educare-common-card">
                                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="acc_no"
                                                                value="Acc Number"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="book_acc_no_id"
                                                        data_label="acc no"
                                                        data={accTittle}
                                                        value={data.acc_no}
                                                        onChange={(e) => {
                                                            handleAccNo(e.target.value)
                                                        }
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.book_acc_no_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="status"
                                                                value="Set Status"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="status"
                                                        data_label="status"
                                                        data={bookStatus}
                                                        value={data.status}
                                                        onChange={(e) =>
                                                            setData(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.status}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="date"
                                                                value="Date"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={
                                                            data?.date_at
                                                            && new Date(
                                                                data?.date_at
                                                            )
                                                        }
                                                        onChange={(date) =>
                                                            setData(
                                                                "date_at",
                                                                date
                                                            )
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="End date"
                                                        className="w-full"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.date_at}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="reason"
                                                                value="Reason"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="reason"
                                                        value={data.reason}
                                                        onChange={(e) =>
                                                            setData(
                                                                "reason",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.reason}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {
                                                data?.current_status ?
                                                    <div className="col-span-12">
                                                        <p>Current Book Status. <span className={`badge ${data?.current_status === 'Active' ? 'success' : 'danger'}`}>{data?.current_status}</span>
                                                        </p>
                                                    </div> : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-end gap-2.5">
                                    <PrimaryButton
                                        disabled={processing}
                                        type="button"
                                        className="educare-gray-btn-md-stroke"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </PrimaryButton>
                                    <PrimaryButton
                                        disabled={processing}
                                        type="submit"
                                        className="educare-primary-btn-md-fill">
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}

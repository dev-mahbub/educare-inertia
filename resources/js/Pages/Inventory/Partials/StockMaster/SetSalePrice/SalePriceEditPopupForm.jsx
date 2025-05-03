import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';
import DatePicker from "react-datepicker";

export default function SalePriceEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('set_sale_price.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };

    return (
        <div className="educare-admission-follow-up-area space-y-6">
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update sale price</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <label htmlFor="sale_price">Sale Price</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="sale_price"
                                            value={data?.sale_price}
                                            onChange={(e) => setData({ ...data, sale_price: e.target.value })}
                                            type="text"
                                            className="block"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <label htmlFor="applied_date_at">Date</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.applied_date_at && new Date(data?.applied_date_at)}
                                            onChange={(date) => setData({ ...data, applied_date_at: date })}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Date"
                                            className="w-full"
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 max2Xl:col-span-12 minMaxMd:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="note"
                                            value="Note"
                                        />
                                        <TextareaInput
                                            id="note"
                                            value={data?.note}
                                            onChange={(e) => setData({ ...data, note: e.target.value })}
                                            type="text"
                                            className="block"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

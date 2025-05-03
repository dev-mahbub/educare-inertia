import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

export default function CostPriceEditPopupForm({ editPopupOpen2, setEditPopupOpen2, editData2 }) {

    const [data2, setData2] = useState(editData2);
    useEffect(() => {
        setData2(editData2);
    }, [editData2])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('set_cost_price.update', data2.id), data2);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen2(false);
    };

    return (
        <div className="educare-admission-follow-up-area space-y-6">
            <Modal show={editPopupOpen2} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update cost price</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <label htmlFor="rate_per_product">Cost Price</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="rate_per_product"
                                            value={data2?.rate_per_product}
                                            onChange={(e) => setData2({ ...data2, rate_per_product: e.target.value })}
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
                                                <label htmlFor="purchase_date_at">Date</label>
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data2?.purchase_date_at && new Date(data2?.purchase_date_at)}
                                            onChange={(date) => setData2({ ...data2, purchase_date_at: date })}
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
                                            value={data2?.note}
                                            onChange={(e) => setData2({ ...data2, note: e.target.value })}
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

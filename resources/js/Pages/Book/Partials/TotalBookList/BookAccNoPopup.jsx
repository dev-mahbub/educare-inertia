import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextareaInput from '@/Components/TextareaInput';
import SelectInput from '@/Components/SelectInput';
import DatePicker from "react-datepicker";
import InputError from '@/Components/InputError';
import { useEffect } from 'react';
import TextInput from "@/Components/TextInput";


export default function BookAccNoPopup({
    bookAccPopup,
    setBookAccPopup,
    bookAccData = [],
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
        acc_no: "",
        price: "",
    });

    const handleUpdateBookAccPrice = (e) => {
        e.preventDefault();
        post(route("book.update_book_acc_no_price"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const closeModal = () => {
        setBookAccPopup(false);
        reset();
    };

    useEffect(() => {
        setData({
            id: bookAccData?.id,
            acc_no: bookAccData?.acc_no,
            price: bookAccData?.price,
        });
    }, [bookAccData]);

    console.log('data', data);

    return (
        <>
            <section className="educare-admission-follow-up-area space-y-6">
                <Modal show={bookAccPopup} onClose={closeModal}>
                    <form onSubmit={handleUpdateBookAccPrice} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Update Book Accno and price</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <ul>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Book Title : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookAccData?.book_title}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Book Author : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookAccData?.author}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Publisher  : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{bookAccData?.publisher_name}</span>
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
                                                                value="Acc No"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="acc_no"
                                                        value={data.acc_no}
                                                        onChange={(e) =>
                                                            setData(
                                                                "acc_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.acc_no
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
                                                                value="Price"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="price"
                                                        value={data?.price}
                                                        onChange={(e) =>
                                                            setData(
                                                                "price",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.price
                                                        }
                                                        className="mt-2"
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
                            <PrimaryButton type="submit" disabled={processing} className="educare-primary-btn-md-fill">Update</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}

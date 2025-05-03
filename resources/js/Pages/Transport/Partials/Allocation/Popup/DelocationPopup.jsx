import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function DelocationPopup({
    vouchers,
    data,
    delocationPopup,
    setDelocationPopup
}) {
    const [dataTwo, setDataTwo] = useState({
        voucher_id: '',
        staff_id: data?.staff_id,
        student_id: data?.student_id,
        allocate_type_for: data?.allocate_type_for,
    });

    const handleDeallocate = (e) => {
        e.preventDefault();

        router.post(route('transport.deallocation_save'), dataTwo, {
            onSuccess: () => {
                let form_data = {};

                if(data?.allocate_type_for == 'Teacher') {
                    form_data = {
                        staff_id: data?.staff_id,
                        allocate_type_for: data?.allocate_type_for
                    };
                } else {
                    form_data = {
                        classroom_id: data?.classroom_id,
                        student_id: data?.student_id,
                        allocate_type_for: data?.allocate_type_for
                    };
                }

                router.post(route("transport.allocation"), form_data);
            }
        });

        setDelocationPopup(false);
    }

    const closeModal = () => {
        setDelocationPopup(false);
    };

    useEffect(() => {
        setDataTwo({
            ...dataTwo,
            staff_id: data?.staff_id,
            student_id: data?.student_id,
            allocate_type_for: data?.allocate_type_for,
        })
    }, [data])

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={delocationPopup} onClose={closeModal}>
                <form className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper">
                        <div className="educare-popup-form-header py-3">
                            <h5>Deallocate Transport</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="voucher_id"
                                    value="Deallocate From"
                                />
                                <SelectInput
                                    id="voucher_id"
                                    data_label="Installment"
                                    data={vouchers}
                                    value={
                                        dataTwo?.voucher_id
                                    }
                                    onChange={(e) => setDataTwo({ ...dataTwo, voucher_id: e.target.value })}
                                    className="block"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill" onClick={(e) => handleDeallocate(e)}>Update</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

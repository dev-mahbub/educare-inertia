import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function SelectStatusPopup({ className = '', statusPopup, setStatusPopup, cheque_all_status = [], sendDataToParent, cheque = {} }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        patch,
        errors,
    } = useForm({
        type: 'cheque_status',
        cheque_status: cheque?.cheque_status
    });

    useEffect(() => {
        setData('cheque_status', cheque?.cheque_status ?? "");
    }, [cheque]);

    const updateChequeStatus = (e) => {
        e.preventDefault();
        patch(route('cheque_data.update', cheque.id), {
            preserveScroll: true,
            onSuccess: () => {
                sendDataToParent(data.cheque_status);
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setStatusPopup(false);
    };



    const handleChange = (event) => {
        const data = selectedStatus;
        // setChildData(data);

        // // Call the function passed from the parent component
        // sendDataToParent(data);

        closeModal();
    };


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={statusPopup} onClose={closeModal}>
                    <form onSubmit={updateChequeStatus} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Change Status</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] body-bg maxSm:py-4 px-[30px] flex flex-col gap-3">
                                <div className="educare-admission-list table-width-full pb-none">
                                    <div>
                                        <ul>
                                            {cheque_all_status?.length > 0 ? (
                                                cheque_all_status?.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            <div className="educare-create-school-settings-list-checka width-full">
                                                                <RadioInput
                                                                    name="cheque_status"
                                                                    value={item.title}
                                                                    checked={data.cheque_status != null ? data.cheque_status === item.title : cheque?.cheque_status === item.title}
                                                                    onChange={() => setData("cheque_status", item.title)}
                                                                />
                                                            </div>
                                                        </li>
                                                    )
                                                )
                                            ) : (
                                                <li>
                                                    <span className="text-center text-red-500"
                                                        colSpan="7">
                                                        Data not
                                                        found
                                                    </span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                type="submit"
                            >
                                Update</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}

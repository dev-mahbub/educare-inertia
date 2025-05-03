import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function StudentListUpdatePopup({ admNoModalUpdateOpen, setAdmNoModalUpdateOpen, admNoModalData }) {

    const {
        data,
        setData,
        put
    } = useForm({
        id: admNoModalData?.id,
        student_name: admNoModalData?.student_name,
        admission_no: admNoModalData?.admission_no,
        new_admission_no: '',
    });

    useEffect((() => {
        setData(admNoModalData)
    }), [admNoModalData])

    const handleAdmNoUpdate = (e) => {
        e.preventDefault();
        put(route('student.update_adm_no', admNoModalData?.id), data);
        closeModal();
    };

    const closeModal = () => {
        setAdmNoModalUpdateOpen(false);
    };

    return (
        <div className="educare-admission-follow-up-area space-y-6">
            <Modal show={admNoModalUpdateOpen} onClose={closeModal}>
                <form onSubmit={handleAdmNoUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update Admission Number</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <ul>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.student_name}</span>
                                    </li>
                                    <li>
                                        <span className='text-[16px] font-normal text-headingLightest'>Current Adm No : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.admission_no}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="new_admission_no"
                                    value="Enter New Admission Number"
                                />
                                <TextInput
                                    id="new_admission_no"
                                    value={data?.new_admission_no}
                                    onChange={(e) => setData({ ...data, new_admission_no: e.target.value })}
                                    type="text"
                                    className="block"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton type="button" onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

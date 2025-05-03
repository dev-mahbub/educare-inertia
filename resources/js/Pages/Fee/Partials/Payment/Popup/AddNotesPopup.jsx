import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';

export default function AddNotesPopup({
    student = [],
    guardians = [],
    modalAddNotesOpen,
    setModalAddNotesOpen,
    getStudentFeeInstallments
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        student_id: student.id,
        context: "",
        notes: "",
    });

    const handleSuccess = () => {
        const form_data = {
            student_id: student?.id,
            request_type: "fetch_fee_installments",
        }

        getStudentFeeInstallments(form_data);
        closeModal();
    }



    const closeModal = () => {
        setModalAddNotesOpen(false);
        reset();

        errors.context = "";
        errors.notes = "";
    };

    const addNotesData = (e) => {
        e.preventDefault();

        post(route("fee.save_student_context"), {
            preserveScroll: true,
            onSuccess: ({ props }) => handleSuccess(),
        });
    };


    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={modalAddNotesOpen} onClose={closeModal}>
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <form onSubmit={addNotesData}>
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Add Notes</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <ul>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Student's Name : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{`${student?.first_name} ${student?.middle_name} ${student?.last_name}`}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{`${guardians['Father']?.[0]?.first_name ?? ""} ${guardians['Father']?.[0]?.middle_name ?? ""} ${guardians['Father']?.[0]?.last_name ?? ""}`}</span>
                                        </li>
                                        <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Mother's Name : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{`${guardians['Mother']?.[0]?.first_name ?? ""} ${guardians['Mother']?.[0]?.middle_name ?? ""} ${guardians['Mother']?.[0]?.last_name ?? ""}`}</span>
                                        </li>
                                        <li>
                                            <span className='text-[16px] font-normal text-headingLightest'>Phone Number : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{`${guardians['Father']?.[0]?.phone ?? ""}, ${guardians['Father']?.[0]?.sms_phone ?? ""}`}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="context"
                                                value="Context"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="context"
                                        value={
                                            data.context
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "context",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.context
                                        }
                                        className="mt-2"
                                    />
                                </div>
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="notes"
                                                value="Notes"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextareaInput
                                        id="notes"
                                        value={
                                            data.notes
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "notes",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.notes
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" type="button" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Save</PrimaryButton>
                        </div>
                    </form>
                    <div className="educare-classroom-table-wrapper bg-supportingA/10 mt-5">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Context</th>
                                        <th>Notes</th>
                                        <th>Added On</th>
                                        <th>Added By</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {student?.student_notes?.length > 0 ?(
                                        student?.student_notes.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item?.context}</td>
                                                <td>
                                                    <div className='max-w-[150px]'>{item?.notes}</div>
                                                </td>
                                                <td>{item?.added_on}</td>
                                                <td>{`${item?.created_by?.first_name ?? ""} ${item?.created_by?.middle_name ?? ""} ${item?.created_by?.last_name ?? ""}`}</td>
                                            </tr>
                                        ))
                                    ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNotePopup({
    modalNotesOpen,
    setModalNotesOpen,
    selectedStudent,
    setSelectedStudentId,
    formData
 }) {

    const {
        data,
        setData,
        post,
        reset
    } = useForm({
        student_id: selectedStudent?.id ?? "",
        context: "",
        notes: "",
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_id: selectedStudent?.id
        }));
    }, [selectedStudent]);


    const handleNotesUpdate = (e) => {
        e.preventDefault();

        if(data?.context == "" || data?.notes == "") {
            toast.error("Required fields cannot be empty.", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route('classroom_attendance.student_note.save'), {
                onSuccess: () => {
                    router.post(route('classroom_attendance.take_attendance'), formData);
                }
            })
        }
    };

    const closeModal = () => {
        setModalNotesOpen(false);
        setSelectedStudentId(null);
        reset();
    };


    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={modalNotesOpen} onClose={closeModal}>
                <form onSubmit={handleNotesUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Student Notes</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <ul>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Student's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudent?.first_name} {selectedStudent?.middle_name} {selectedStudent?.last_name}</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudent?.father?.first_name} {selectedStudent?.father?.middle_name} {selectedStudent?.father?.last_name}</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Mother's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudent?.mother?.first_name} {selectedStudent?.mother?.middle_name} {selectedStudent?.mother?.last_name}</span>
                                    </li>
                                    <li>
                                        <span className='text-[16px] font-normal text-headingLightest'>Phone Number : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{selectedStudent?.father?.phone}</span>
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
                                    value={data.context}
                                    onChange={(e) => setData( "context", e.target.value )}
                                    type="text"
                                    className="block"
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
                                    value={data.notes}
                                    onChange={(e) => setData("notes", e.target.value)}
                                    type="text"
                                    className="block"
                                />
                            </div>
                        </div>

                        <div className="educare-popup-form-wrapper mb-5 ">

                            <div className="educare-popup-form educare-admission-list-inner-wrapper pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-admission-list pb-none bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Context</th>
                                                <th>Notes</th>
                                                <th>Added On</th>
                                                <th>Added By</th>
                                                {/* <th>Status</th>
                                                <th>Status Modified Details</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedStudent?.student_notes && selectedStudent?.student_notes?.length > 0 ?
                                                selectedStudent?.student_notes?.map((item , index) => (
                                                    <tr key={index}>
                                                        <td>{item?.context}</td>
                                                        <td>{item?.notes}</td>
                                                        <td>{item?.added_on}</td>
                                                        <td>{item?.created_by?.first_name} {item?.created_by?.middle_name} {item?.created_by?.last_name}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="7"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton
                            type="submit"
                            className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

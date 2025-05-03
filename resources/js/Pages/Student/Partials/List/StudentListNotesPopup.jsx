import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import moment from "moment";

export default function StudentListNotesPopup({ modalNotesOpen, setModalNotesOpen, modelNotesData, formData }) {
    const {
        data,
        setData,
        post,
        reset
    } = useForm({
        student_id: modelNotesData?.id,
        student: modelNotesData?.student,
        father: modelNotesData?.father,
        mother: modelNotesData?.mother,
        phone: modelNotesData?.phone,
        context: "",
        notes: "",
        student_notes: modelNotesData.student_notes,
        note_status: ""
    });

    useEffect((() => {
        setData(modelNotesData)
    }), [modelNotesData])


    const handleNotesUpdate = (e) => {
        e.preventDefault();
        post(route('student.save_notes'), {
            preserveScroll: true,
            onSuccess: () => {
                refreshStudentList();
            },
            onError: () => {
                refreshStudentList();
            }
        });
    };

    const handleNoteStatusUpdate = (e, id) =>{
        const updatedNotes = data.student_notes.map(note => 
            note.id === id ? { ...note, note_status: e.target.value } : note
        );
        setData({ ...data, student_notes: updatedNotes });
        router.put(route('student.update_note_status', id), {note_status: e.target.value},{   
            onSuccess: () => {
                refreshStudentList();
            }
        })
    }

    const refreshStudentList = () => {
        router.post(route('student.list'), formData, {
            onSuccess: () =>{
                setData(prev => ({
                    ...prev,
                    context: '',
                    notes: ''
                }));
            }
        });
    }

    const closeModal = () => {
        setModalNotesOpen(false);
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
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.student}</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Father's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.father}</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Mother's Name : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.mother}</span>
                                    </li>
                                    <li>
                                        <span className='text-[16px] font-normal text-headingLightest'>Phone Number : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.phone}</span>
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
                                    value={data?.context}
                                    onChange={(e) => setData({ ...data, context: e.target.value })}
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
                                    value={data?.notes}
                                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                                    type="text"
                                    className="block"
                                />
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
                <div className="educare-classroom-table-wrapper bg-supportingA/10 mt-5">
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Context</th>
                                        <th>Notes</th>
                                        <th>Added By On</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {data?.student_notes?.length > 0 ?(
                                        data?.student_notes.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item?.context}</td>
                                                <td>
                                                    <div className='max-w-[150px]'>{item?.notes}</div>
                                                </td>
                                                <td>{`${item?.created_by?.first_name ?? ""} ${item?.created_by?.middle_name ?? ""} ${item?.created_by?.last_name ?? ""}, ${moment(item?.created_at).format("ll")}`}</td>
                                                <td>
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            data={modelNotesData.contextStatus}
                                                            value={item.note_status}
                                                            onChange={(e) => handleNoteStatusUpdate(e, item.id) }
                                                            className="block"
                                                        />
                                                    </div>
                                                </td>
                                                
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
            </Modal>
        </section>
    );
}

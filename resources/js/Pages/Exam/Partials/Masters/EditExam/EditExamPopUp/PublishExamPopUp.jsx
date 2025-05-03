import Modal from '@/Components/Modal';
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function PublishExamPopUp({ className = '', publishExamPopUp, setPublishExamPopUp }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const AddClassData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setPublishExamPopUp(false);
        reset();
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={publishExamPopUp} onClose={closeModal}>
                <form onSubmit={AddClassData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Publish Exam</h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10 mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Class
                                        </th>
                                        <th>Is Publish?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link>XI B</Link>
                                        </td>
                                        <td>
                                            <div className='flex flex-wrap gap-2.5'>
                                                <button type='button'
                                                    className="badge success"
                                                >
                                                    Published
                                                </button>
                                                <button type='button'
                                                    className="badge danger"
                                                >
                                                    Not Published
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link>XI</Link>
                                        </td>
                                        <td>
                                            <div className='flex flex-wrap gap-2.5'>
                                                <button type='button'
                                                    className="badge success"
                                                >
                                                    Published
                                                </button>
                                                <button type='button'
                                                    className="badge danger"
                                                >
                                                    Not Published
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

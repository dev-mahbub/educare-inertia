import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ShareLessonPopup({
    className = '',
    setShareLessonPopup,
    shareLessonPopup,
    teachers,
    sendTeacherIdsToParent,
    teacherIds,
    setTeacherIds
}) {
    // add checkbox value to array
    const setSelectedTeacherId = (id) => {
        if ([...teacherIds]?.includes(id)) {
            setTeacherIds([...teacherIds].filter((item) => item !== id));
        }
        else {
            setTeacherIds([
                ...teacherIds,
                id,
            ]);
        }
    };


    const shareLessonPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setShareLessonPopup(false);
    };


    const handleChange = (event) => {
        sendTeacherIdsToParent(teacherIds);
        closeModal();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={shareLessonPopup} onClose={closeModal}>
                    <form onSubmit={shareLessonPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Share with teachers</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] body-bg maxSm:py-4 px-[30px] flex flex-col gap-3">
                                <div className="educare-admission-list table-width-full pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='whitespace-nowrap'>
                                                </th>
                                                <th className='whitespace-nowrap'>Teacher</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teachers?.length > 0 ? (
                                                teachers?.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list-checka width-full">
                                                                    <Checkbox
                                                                        id="class_name_id"
                                                                        name="class_name_id"
                                                                        checked={teacherIds?.includes(item?.id)}
                                                                        onChange={(e) =>
                                                                            setSelectedTeacherId(item?.id)
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>{item?.first_name} {item?.middle_name} {item?.last_name}</td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500"
                                                        colSpan="7">
                                                        Data not
                                                        found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                onClick={handleChange}
                            >
                                Share
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}

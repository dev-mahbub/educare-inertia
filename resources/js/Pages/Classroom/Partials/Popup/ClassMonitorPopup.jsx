import React from 'react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from 'react';
import SelectInput2 from '@/Components/SelectInput2';
import SelectInput from '@/Components/SelectInput';

export default function ClassMonitorPopup({ classMonitorId, assignMonitorPopup, setAssignMonitorPopup, students, classRoomId = '' }) {

    const {
        data,
        setData
    } = useForm({
        class_monitor_id: classMonitorId,
    });

    useEffect(() => {
        setData('class_monitor_id', classMonitorId)
    }, [classMonitorId]);

    const assignClassMonitorData = (e) => {
        e.preventDefault();
        router.put(route('classroom.assign_class_monitor', classRoomId), data);
        closeModal();
    };

    const closeModal = () => {
        setAssignMonitorPopup(false);
    };

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={assignMonitorPopup} onClose={closeModal}>
                <form onSubmit={assignClassMonitorData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper">
                        <div className="educare-popup-form-header py-3">
                            <h5>Assign Class Monitor</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="class_monitor_id"
                                    data_label="Monitor"
                                    data={students}
                                    value={
                                        data.class_monitor_id
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "class_monitor_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-0 flex flex-wrap gap-2 justify-end">
                        <PrimaryButton type="button" className='educare-primary-btn-lg-stroke' onClick={closeModal}>Cancel</PrimaryButton>

                        <PrimaryButton
                            type="submit"
                            className="educare-primary-btn-lg-fill"
                            >
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

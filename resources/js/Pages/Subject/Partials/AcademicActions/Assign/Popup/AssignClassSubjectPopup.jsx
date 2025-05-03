import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AssignClassSubjectPopup({
    assignClassPopupOpen,
    setAssignClassPopupOpen,
    data,
    setData,
    subjects = [],
    classnames = [],
    reset,
}) {
    const [filterClassName, setFilterClassName] = useState([]);

    useEffect(() => {
        setFilterClassName(
            classnames?.filter((item) => item?.id != data?.class_name_id)
        );
    }, [data.class_name_id]);

    const closeModal = () => {
        setAssignClassPopupOpen(false);
        reset();
    };

    // handle subject start
    const handleSubject = (id) => {
        const isSelected = data.subject_ids.some(
            (subject) => subject.subject_id === id
        );
        const updatedSelectedFees = isSelected
            ? data.subject_ids.filter((subject) => subject.subject_id !== id)
            : [...data.subject_ids, { subject_id: id }];

        setData({
            ...data,
            subject_ids: updatedSelectedFees,
            subject_all: false,
        });
    };

    const handleAllSubject = (isChecked) => {
        if (isChecked) {
            const allSubjectIds = subjects.map((item) => item.id);
            const updatedSelectedFees = allSubjectIds.map((subject_id) => ({
                subject_id,
            }));
            setData({
                ...data,
                subject_ids: updatedSelectedFees,
                subject_all: true,
            });
        } else {
            setData({ ...data, subject_ids: [], subject_all: false });
        }
    };
    // handle subject end

    // handle class start
    const handleClassName = (id) => {
        const isSelected = data.class_name_ids.some(
            (class_name) => class_name.class_name_id === id
        );
        const updatedSelectedFees = isSelected
            ? data.class_name_ids.filter(
                  (class_name) => class_name.class_name_id !== id
              )
            : [...data.class_name_ids, { class_name_id: id }];

        setData({
            ...data,
            class_name_ids: updatedSelectedFees,
            class_name_all: false,
        });
    };

    const handleAllClassName = (isChecked) => {
        if (isChecked) {
            const allClassNameIds = filterClassName?.map((item) => item.id);
            const updatedSelectedFees = allClassNameIds.map(
                (class_name_id) => ({ class_name_id })
            );
            setData({
                ...data,
                class_name_ids: updatedSelectedFees,
                class_name_all: true,
            });
        } else {
            setData({ ...data, class_name_ids: [], class_name_all: false });
        }
    };
    // handle subject end

    const handleBulkClassSubject = (e) => {
        e.preventDefault();
        router.post(route("subject.assign_to_class_subject_bulk_save"), data, {
            onSuccess: () => reset()
        });
    };

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            closeModal();
        }
    }, [flash]);

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={assignClassPopupOpen} onClose={closeModal}>
                <form className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Sync subjects to other class</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-6">
                                    <div className="educare-create-school-settings-list-check min-width-full mb-4">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="subject_all"
                                                    name="subject_all"
                                                    onChange={(e) =>
                                                        handleAllSubject(
                                                            e.target.checked
                                                        )
                                                    }
                                                    checked={data.subject_all}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="subject_all"
                                                    value="All Subjects"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {subjects?.length ? (
                                        subjects?.map((item2, index2) => (
                                            <div
                                                key={index2}
                                                className="educare-create-school-settings-list-check min-width-full mb-2"
                                            >
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id={`type_${index2}`}
                                                            name={`type_${index2}`}
                                                            onChange={(e) =>
                                                                handleSubject(
                                                                    item2?.id
                                                                )
                                                            }
                                                            checked={data.subject_ids.some(
                                                                (subject) =>
                                                                    subject.subject_id ===
                                                                    item2.id
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor={`type_${index2}`}
                                                            value={item2?.title}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-center text-red-500">
                                            Data not found
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-6">
                                    <div className="educare-create-school-settings-list-check min-width-full mb-4">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="class_name_all"
                                                    name="class_name_all"
                                                    onChange={(e) =>
                                                        handleAllClassName(
                                                            e.target.checked
                                                        )
                                                    }
                                                    checked={
                                                        data.class_name_all
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="class_name_all"
                                                    value="All classes"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {filterClassName?.length ? (
                                        filterClassName?.map(
                                            (item2, index2) => (
                                                <div
                                                    key={index2}
                                                    className="educare-create-school-settings-list-check min-width-full mb-2"
                                                >
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`type_${index2}`}
                                                                name={`type_${index2}`}
                                                                onChange={(e) =>
                                                                    handleClassName(
                                                                        item2?.id
                                                                    )
                                                                }
                                                                checked={data.class_name_ids.some(
                                                                    (
                                                                        className
                                                                    ) =>
                                                                        className.class_name_id ===
                                                                        item2.id
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor={`type_${index2}`}
                                                                value={
                                                                    item2?.title
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <span className="text-center text-red-500">
                                            Data not found
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <PrimaryButton
                            onClick={(e) => handleBulkClassSubject(e)}
                            type="button"
                            className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Save
                        </PrimaryButton>
                        <SecondaryButton
                            type="button"
                            className="ml-3"
                            onClick={closeModal}
                        >
                            Cancel
                        </SecondaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

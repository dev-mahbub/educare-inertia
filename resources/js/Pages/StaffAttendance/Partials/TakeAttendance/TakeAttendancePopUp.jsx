import React from "react";

import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextareaInput from "@/Components/TextareaInput";
const TakeAttendancePopUp = ({ setModalNotesOpen, modalNotesOpen }) => {
    const { data, setData } = useForm({
        notes: "",
        context: "",
    });

    // const [modalNotesOpen, setModalNotesOpen] = useState(false);

    // const handleListPopupClick = () => {
    //     setModalNotesOpen(!modalNotesOpen);
    // };
    
 
    const handleNotesUpdate = (e) => {
        e.preventDefault();

        closeModal();
    };

    const closeModal = () => {
        setModalNotesOpen(false);
    };

    return (
        <>
            <section className="educare-admission-follow-up-area space-y-6">
                <Modal show={modalNotesOpen} onClose={closeModal}>
                    <form
                        onSubmit={handleNotesUpdate}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Student Notes</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <ul>
                                        <li className="mb-2">
                                            <span className="text-[16px] font-normal text-headingLightest">
                                                Student's Name :
                                            </span>
                                            <span className="text-[16px] font-semibold text-headingLight">
                                                {" "}
                                                Ganesh Roy{" "}
                                            </span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-[16px] font-normal text-headingLightest">
                                                Father's Name :
                                            </span>
                                            <span className="text-[16px] font-semibold text-headingLight">
                                                {" "}
                                                Rocky Roy{" "}
                                            </span>
                                        </li>
                                        <li className="mb-2">
                                            <span className="text-[16px] font-normal text-headingLightest">
                                                Mother's Name :
                                            </span>
                                            <span className="text-[16px] font-semibold text-headingLight">
                                                Guriya
                                            </span>
                                        </li>
                                        <li>
                                            <span className="text-[16px] font-normal text-headingLightest">
                                                Phone Number :
                                            </span>
                                            <span className="text-[16px] font-semibold text-headingLight">
                                                021425414254
                                            </span>
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
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                context: e.target.value,
                                            })
                                        }
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
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                notes: e.target.value,
                                            })
                                        }
                                        type="text"
                                        className="block"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mb-5">
                            <SecondaryButton type="button" onClick={closeModal}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                                type="submit"
                                className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Save
                            </PrimaryButton>
                        </div>
                        <div className="educare-popup-form   maxSm:py-4 flex flex-col gap-3 mb-5">
                            <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Context</th>
                                            <th> Notes</th>
                                            <th>Added By On</th>
                                            <th>Status</th>
                                            <th>Status Modified Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td>1</td>
                                            <td>Social Media</td>
                                            <td> Test Note.</td>
                                            <td> Rakesh Malhotra</td>
                                            <td> Test </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>

                       
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default TakeAttendancePopUp;

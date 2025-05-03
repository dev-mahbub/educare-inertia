import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function CreateTemplatePopup({ className = '', singlePopup, setSinglePopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        select_class: "",
        all_admission_no: "",
        certificateType: "class_wise",
        checkbox_one: "",
        checkbox_two: "",
    });


    const singlePopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
    };

    return (
        <>

            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={singlePopup} onClose={closeModal}>
                    <form onSubmit={singlePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="grid grid-cols-12 gap-5 mb-4">
                                <div className='col-span-12'>
                                    <div className="educare-popup-form-wrapper mb-5 ">
                                        <div className="educare-popup-form-header py-3">
                                            <h5>Generate Student Id Card Certificate</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8 max2Xl:col-span-12 minMaxMd:col-span-6">
                                    <div className="educare-create-school-settings-list-check min-width-full">
                                        <div className="educare-radio-field-styles flex flex-wrap gap-4">
                                            <RadioInput
                                                name="certificateType"
                                                value="Class wise"
                                                checked={data.certificateType === "class_wise"}
                                                onChange={() => setData("certificateType", "class_wise")}
                                            />
                                            <RadioInput
                                                name="certificateType"
                                                value="Individual"
                                                checked={data.certificateType === "individual"}
                                                onChange={() => setData("certificateType", "individual")}
                                            />
                                            <RadioInput
                                                name="certificateType"
                                                value="AdmissionNo"
                                                checked={data.certificateType === "admission_no"}
                                                onChange={() => setData("certificateType", "admission_no")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.certificateType === "class_wise" ? (
                                        <>
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={[]}
                                                        value={
                                                            data.select_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "select_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.select_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : ""
                                }
                                {
                                    data.certificateType === "individual" ? (
                                        <>
                                            <div className="col-span-4 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={[]}
                                                        value={
                                                            data.select_class
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "select_class",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.select_class
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-12'>
                                                <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Adm No.</th>
                                                                    <th>Roll No.</th>
                                                                    <th>Student Name</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                                    <Checkbox
                                                                                        name="checkbox_one"
                                                                                        checked={
                                                                                            data.checkbox_one
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            setData(
                                                                                                "checkbox_one",
                                                                                                e.target.checked
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>DM0001</td>
                                                                    <td>2</td>
                                                                    <td>Mick Roy</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                                    <Checkbox
                                                                                        name="checkbox_two"
                                                                                        checked={
                                                                                            data.checkbox_two
                                                                                        }
                                                                                        onChange={(e) =>
                                                                                            setData(
                                                                                                "checkbox_two",
                                                                                                e.target.checked
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>DM0002</td>
                                                                    <td>3</td>
                                                                    <td>Rimmi Raj</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : ""
                                }
                                {
                                    data.certificateType === "admission_no" ? (
                                        <>
                                            <div className='col-span-12'>
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Enter all admission No. in comma separated value to generate id card"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data.all_admission_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "all_admission_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.all_admission_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : ""
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">Generate</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}

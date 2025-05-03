import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';
import React from 'react';

const AddDocumentCategoryForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_doc: "",
        select_document: "",
        check_document: "",
        doc_description: ""
    });
    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-Files"></i>
                    Add Document Category
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 lg:col-span-12 md:col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            htmlFor="search_doc"
                                            value="Document category"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    id="search_doc"
                                    value={
                                        data.search_doc
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "search_doc",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.search_doc
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 lg:col-span-12 md:col-span-6">
                            <div className='grid grid-cols-12 gap-5'>
                                <div className="col-span-12 lg:col-span-6 md:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="select_document"
                                                    value="Document For"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            id="select_document"
                                            data_label="Type"
                                            data={[]}
                                            value={
                                                data.select_document
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "select_document",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.select_document
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6 md:col-span-6 lg:mt-8 md:mt-8 sm:mt-0">
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                id="check_document"
                                                name="check_document"
                                                checked={
                                                    data.check_document
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "check_document",
                                                        e.target
                                                            .checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="check_document"
                                                value="Is Publish"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-12 md:col-span-12">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="doc_description"
                                    value="Description"
                                />
                                <TextareaInput
                                    id="doc_description"
                                    value={
                                        data.doc_description
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "doc_description",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Document Description"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.doc_description
                                    }

                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6"></div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                >
                                    Save
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                >
                                    Reset
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDocumentCategoryForm;
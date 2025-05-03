import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const CreateEnquiryForm = ({
    classNames = [],
    subjects = [],
    bookCategory = [],
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        book_title: "",
        category_id: "",
        author: "",
        edition: "",
        class_name_id: "",
        subject_id: "",
        document: null
    });

    // insert
    const handleFromDataInsert = (e) => {
        e.preventDefault();
        post(route("ebook.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-Notebook"></i>
                    Add E-Book Detail
                </h5>
            </div>
            <form onSubmit={handleFromDataInsert}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="book_title"
                                                value="Book Title"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <TextInput
                                        id="book_title"
                                        value={
                                            data.book_title
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "book_title",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        required
                                    />
                                    <InputError
                                        message={
                                            errors.book_title
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="category_id"
                                        value="Book Category"
                                    />
                                    <SelectInput
                                        id="category_id"
                                        data_label="Book Category"
                                        data={bookCategory}
                                        value={
                                            data.category_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.category_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="author"
                                        value="Author"
                                    />
                                    <TextInput
                                        id="author"
                                        value={
                                            data.author
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "author",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.author
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="edition"
                                        value="Edition"
                                    />
                                    <TextInput
                                        id="edition"
                                        value={
                                            data.edition
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "edition",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.edition
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="class_name_id"
                                                value="Class"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="class_name_id"
                                        data_label="Class"
                                        data={classNames}
                                        value={
                                            data.class_name_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "class_name_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        required
                                    />
                                    <InputError
                                        message={
                                            errors.class_name_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                htmlFor="subject_id"
                                                value="Subject"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        id="subject_id"
                                        data_label="Subject"
                                        data={subjects}
                                        value={
                                            data.subject_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "subject_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                        required
                                    />
                                    <InputError
                                        message={
                                            errors.subject_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-8 xl:col-span-6">
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="student-import-data flex gap-5 items-end">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="book_title"
                                                        value="Upload Document"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="document"
                                                    type="file"
                                                    name="document"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "document",
                                                            e.target
                                                                .files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="text-end">
                                            <PrimaryButton
                                                disabled={processing}
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                Browse
                                            </PrimaryButton>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 mt-2.5">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-primary-btn-lg-fill"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Upload
                                </PrimaryButton>
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                    type="button"
                                    onClick={(e) => reset()}
                                    disabled={processing}
                                >
                                    Reset
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateEnquiryForm;

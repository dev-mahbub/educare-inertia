import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";

const IssueBookLeftForm = ({
    classNames = [],
    subjects = [],
    bookListData = [],
}) => {
    const [activeItem, setActiveItem] = useState('');
    const {
        data,
        setData,
    } = useForm({
        acc_no: "",
        book_title: "",
        author: "",
        publisher_name: "",
        class_name_id: "",
        subject_id: "",
        book_item_id: "",
    });

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('book.issue'));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('book.issue'), {data})
    }

    const handleAllBook = (e, book_item_id) => {
        e.preventDefault();
        setActiveItem(book_item_id);
        router.post(route('book.issue'), {data, book_item_id});
    }

    return (
        <>
            <div className="educare-common-card-title">
                <h5>
                    <i className="icon-Books"></i>
                    Issue
                </h5>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12  md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="acc_no"
                                    value="Acc no"
                                />
                                <TextInput
                                    id="acc_no"
                                    value={data?.acc_no}
                                    placeHolder="Enter AccNo"
                                    onChange={(e) =>
                                        setData(
                                            "acc_no",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12  md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="book_title"
                                    value="Book Title"
                                />
                                <TextInput
                                    id="book_title"
                                    value={data?.book_title}
                                    placeHolder="Enter Book Title"
                                    onChange={(e) =>
                                        setData(
                                            "book_title",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    htmlFor="author"
                                    value="Author"
                                />
                                <TextInput
                                    id="author"
                                    placeHolder="Author"
                                    value={data?.author}
                                    onChange={(e) =>
                                        setData(
                                            "author",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12  md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Publisher"
                                />
                                <TextInput
                                    placeHolder="Enter Publisher"
                                    value={data?.publisher_name}
                                    onChange={(e) =>
                                        setData(
                                            "publisher_name",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12  md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Class"
                                />
                                <SelectInput
                                    data_label="Class"
                                    data={classNames}
                                    value={data?.class_name_id}
                                    onChange={(e) =>
                                        setData(
                                            "class_name_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6 xl:col-span-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Subject"
                                />
                                <SelectInput
                                    data_label="Subject"
                                    data={subjects}
                                    value={data?.subject_id}
                                    onChange={(e) =>
                                        setData(
                                            "subject_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    onClick={(e) => handleReset(e)}
                                    type="button"
                                    className="educare-gray-btn-md-stroke"
                                >
                                    Reset
                                </PrimaryButton>

                                <PrimaryButton
                                    type="button"
                                    className="educare-primary-btn-md-fill"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    Search
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* small table */}

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Total Stock</th>
                            <th>Available Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookListData?.length > 0 ? (
                            bookListData?.map((item, index) => (
                                <tr className={activeItem === item?.id ? 'educare-table-row-active' : ''} key={index}>
                                    <td>{item?.book_title}</td>
                                    <td>{item?.total_stock}</td>
                                    <td>{item?.available_stock}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="View all book"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        className="educare-warning-btn-sm-fill"
                                                        type="button"
                                                        onClick={(e) => handleAllBook(e, item?.id)}
                                                    >
                                                        <i className="icon-ArrowsOutCardinal"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-red-500" colSpan="12">
                                    Data not found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* End Table */}
        </>
    );
};

export default IssueBookLeftForm;

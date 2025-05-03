import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import React from "react";
const AllocateBookToLocationLeftForm = ({data, setData, errors, bookStock, handleBookStock, handleRightTableShow}) => {

  

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-BookBookmark"></i>
                            Book Search Criteria
                        </h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="book_title"
                                            value="Book Title"
                                        />
                                        <TextInput
                                            id="book_title"
                                            value={data.book_title}
                                            onChange={(e) =>
                                                setData(
                                                    "book_title",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.book_title}
                                            className="mt-2"
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
                                            value={data.author}
                                            onChange={(e) =>
                                                setData("author", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.author}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="publisher"
                                            value="Publisher"
                                        />
                                        <TextInput
                                            id="publisher"
                                            value={data.publisher}
                                            onChange={(e) =>
                                                setData("publisher", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.publisher}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="acc_no"
                                            value="AccNo"
                                        />
                                        <TextInput
                                            id="acc_no"
                                            value={data.acc_no}
                                            onChange={(e) =>
                                                setData("acc_no", e.target.value)
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.acc_no}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="select_class"
                                            value="Select Class"
                                        />
                                        <SelectInput
                                            id="select_class"
                                            data_label="Class"
                                            data={[]}
                                            value={data.select_class}
                                            onChange={(e) =>
                                                setData(
                                                    "select_class",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.select_class}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="select_subject"
                                            value="Select Subject"
                                        />
                                        <SelectInput
                                            id="select_subject"
                                            data_label="Subject"
                                            data={[]}
                                            value={data.select_subject}
                                            onChange={(e) =>
                                                setData(
                                                    "select_subject",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.select_subject}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                        <PrimaryButton className="educare-gray-btn-md-stroke">
                                            Reset
                                        </PrimaryButton>
                                        <PrimaryButton
                                            onClick={handleBookStock}
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Save
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Total Stock</th>
                            <th> Available Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                bookStock ? (
                                    <>
                                        <td>ABC</td>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                <div>
                                                    <Tooltip
                                                        title="View Accno"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <button
                                                            className="educare-warning-btn-sm-fill"
                                                            type="button"
                                                            onClick={handleRightTableShow}
                                                        >
                                                            <i className="icon-ArrowsOutCardinal"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </>
                                )
                                    :
                                    <>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AllocateBookToLocationLeftForm;

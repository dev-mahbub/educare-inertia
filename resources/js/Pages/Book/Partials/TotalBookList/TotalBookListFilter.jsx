import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";

const TotalBookListFilter = ({
    totalBookCount = 0,
    classNameData = [],
    bookCategory = [],
    bookType = [],
    bookTypeStatus = [],
    setLoading,
}) => {
    const statusData = [
        {id: 'Active', title: 'Active'},
        {id: 'Inactive', title: 'Inactive'},
    ];
    const {
        data,
        setData
    } = useForm({
        acc_no: "",
        book_title: "",
        author: "",
        publisher_name: "",
        class_name_id: "",
        category_id: "",
        type_id: "",
        book_type_status: "",
        status: "",
        start_date_at: "",
        end_date_at: "",
    });

    const handleSearch = (e) => {
        router.post(route('book.total_book_list'), data);
        setLoading(false);
    }

    const handleReset = (e) => {
        router.get(route('book.total_book_list'));
        setLoading(false);
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Total Book List
                    </h5>
                </div>

                <div>
                    <div className="flex items-center">
                        <div className="educare-header-filtar-bar-count mr-1">
                            <span>Total: {totalBookCount}</span>
                        </div>
                        <div>
                            <Tooltip
                                title="Reset"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    type="button"
                                    className="educare-success-btn-md-fill"
                                >
                                    <i className="icon-FileX"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="acc_no"
                                    placeHolder="Acc No."
                                    value={data.acc_no}
                                    onChange={(e) =>
                                        setData("acc_no", e.target.value)
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="book_title"
                                    placeHolder="Title"
                                    value={data.book_title}
                                    onChange={(e) =>
                                        setData("book_title", e.target.value)
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="author"
                                    placeHolder="Author"
                                    value={data.author}
                                    onChange={(e) =>
                                        setData("author", e.target.value)
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="publisher_name"
                                    placeHolder="Publisher"
                                    value={data.publisher_name}
                                    onChange={(e) =>
                                        setData("publisher_name", e.target.value)
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="class_name_id"
                                    data_label="Class"
                                    data={classNameData}
                                    value={data.class_name_id}
                                    onChange={(e) =>
                                        setData("class_name_id", e.target.value)
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="category_id"
                                    data_label="Category"
                                    data={bookCategory}
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="type_id"
                                    data_label="type"
                                    data={bookType}
                                    value={data.type_id}
                                    onChange={(e) =>
                                        setData(
                                            "type_id",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="book_type_status"
                                    data_label="status type"
                                    data={bookTypeStatus}
                                    value={data.book_type_status}
                                    onChange={(e) =>
                                        setData(
                                            "book_type_status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="status"
                                    data_label="status"
                                    data={statusData}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles">
                                    <DatePicker
                                        selected={
                                            data.start_date_at &&
                                            new Date(data.start_date_at)
                                        }
                                        onChange={(date) =>
                                            setData("start_date_at", date)
                                        }
                                        showYearDropdown
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        showPopperArrow={false}
                                        peekNextMonth
                                        dropdownMode="select"
                                        isClearable
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Start date"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6">
                            <div className="educare-input-field-styles">
                                <DatePicker
                                    selected={
                                        data.end_date_at && new Date(data.end_date_at)
                                    }
                                    onChange={(date) =>
                                        setData("end_date_at", date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="End date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-2 lg:col-span-2 sm:col-span-6 educare-header-filtar-bar-action educare-filter-action-btn">
                            <div className="flex flex-wrap gap-2.5">
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handleSearch(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            onClick={(e) => handleReset(e)}
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TotalBookListFilter;

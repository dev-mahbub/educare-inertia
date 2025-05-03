import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const MasterBookListFilter = ({
    bookListCount = 0,
    bookCategory = [],
    classNames = [],
    setLoading,
}) => {
    const {
        data,
        setData,
    } = useForm({
        book_title: "",
        author: "",
        publisher_name: "",
        class_name_id: "",
        category_id: "",

    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('book.list'), data);
        setLoading(false);
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('book.list'));
        setLoading(false);
    }

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <div className=" educare-header-filtar-bar-inner-main">
                        <div className="educare-card-title mr-auto pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Master Book List
                            </h5>
                        </div>
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span>Total: {bookListCount}</span>
                        </div>
                        <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                            <div className="educare-header-filtar-bar-fields-area relative">
                                <span
                                    className="educare-header-filter-prev"
                                    onClick={handlePrevClick}
                                >
                                    <i className="icon-left-chevron"></i>
                                </span>
                                <div
                                    className="educare-header-filtar-bar-fields-wrap"
                                    ref={listRef}
                                    style={{
                                        transform: `translateX(-${currentIndex * 120
                                            }px)`,
                                    }}
                                >
                                    {/* Replace changeable inputs */}

                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="book_title"
                                            value={data.book_title}
                                            onChange={(e) =>
                                                setData(
                                                    "book_title",
                                                    e.target.value
                                                )
                                            }
                                            placeHolder="Title"
                                            type="text"
                                            className="block"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="author"
                                            value={data.author}
                                            onChange={(e) =>
                                                setData(
                                                    "author",
                                                    e.target.value
                                                )
                                            }
                                            placeHolder="Author"
                                            type="text"
                                            className="block"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="publisher_name"
                                            value={data.publisher_name}
                                            onChange={(e) =>
                                                setData(
                                                    "publisher_name",
                                                    e.target.value
                                                )
                                            }
                                            placeHolder="Publisher"
                                            type="text"
                                            className="block"
                                        />
                                    </div>

                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="class_name_id"
                                            data_label="class"
                                            data={classNames}
                                            value={data.class_name_id}
                                            onChange={(e) =>
                                                setData(
                                                    "class_name_id",
                                                    e.target.value
                                                )
                                            }
                                            type="text"
                                            className="block"
                                        />
                                    </div>
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            id="category_id"
                                            data_label="category"
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
                                            type="text"
                                            className="block"
                                        />
                                    </div>

                                    {/* Replace changeable inputs */}
                                </div>
                                <span
                                    className="educare-header-filter-next"
                                    onClick={handleNextClick}
                                >
                                    <i className="icon-chevron"></i>
                                </span>
                            </div>
                        </div>
                        <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                            {/* Replace changeable buttons */}
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        className="educare-secondary-btn-md-fill"
                                        onClick={(e) => handleSearch(e)}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <button
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
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
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            {/* Replace changeable buttons */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterBookListFilter;

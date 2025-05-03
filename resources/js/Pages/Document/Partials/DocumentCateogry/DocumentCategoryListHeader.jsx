import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const DocumentCategoryListHeader = ({
    audienceTypes,
    setDocumentCategoriesData,
    documentCategories,
    documentCategoriesData
}) => {

    const {
        data,
        setData,
        reset
    } = useForm({
        type: "",
        search: "",
    });

    // handle filter data start
    const handleFilterData = (e) => {
        e.preventDefault();

        const filteredData = documentCategories?.filter(item => {
            const filterText = data?.search?.trim()?.toLowerCase();
            const title = item?.title?.toLowerCase();

            if(data?.type) {
                return item?.type == data?.type && title && title?.includes(filterText);
            }

            return title && title?.includes(filterText);
        });

        setDocumentCategoriesData(filteredData);
    };
    // handle filter data end

    // handle reset start
    const handleReset = (e) => {
        e.preventDefault();

        reset();

        setDocumentCategoriesData(documentCategories);
    }
    // handle reset end

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={handleFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-count mr-auto">
                                <span>Total: {documentCategoriesData?.length}</span>
                            </div>
                            {/* delete count if don't need */}
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Type"
                                                data={audienceTypes}
                                                value={data.type}
                                                onChange={(e) =>
                                                    setData("type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <TextInput
                                                id="search"
                                                value={data.search}
                                                onChange={(e) => setData("search", e.target.value)}
                                                placeHolder="Search"
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                {/* Replace changable buttons */}
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="submit"
                                            className="educare-secondary-btn-md-fill"
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
                                            type="button"
                                            className="educare-gray-btn-md-fill"
                                            onClick={handleReset}
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DocumentCategoryListHeader;

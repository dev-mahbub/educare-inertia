import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";


export default function NewsListFilter({
    className = "",
    newsStatusArr,
    orderByTypes,
    audienceTypes,
    newsLists
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        news_status: "",
        order_by_date: "",
        audience_type: "",
    });

    // handle filter news list data start
    const handleFilterNewsListData = (e) => {
        e.preventDefault();

        const form_data = {
            news_status: data?.news_status,
            order_by_date: data?.order_by_date,
            audience_type: data?.audience_type,
        }

        router.post(route('news.list'), form_data)
    };
    // handle filter news list data end

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    }

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-admission-filtar-bar-count">
                                <span>Total: {newsLists?.length}</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="news_status"
                                                    data_label="All News"
                                                    data={newsStatusArr}
                                                    value={data.news_status}
                                                    onChange={(e) =>
                                                        setData("news_status", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.news_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="order_by_date"
                                                    data_label="Order By Date"
                                                    data={orderByTypes}
                                                    value={data.order_by_date}
                                                    onChange={(e) =>
                                                        setData("order_by_date", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.order_by_date}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="audience_type"
                                                    data_label="Audience"
                                                    data={audienceTypes}
                                                    value={data.audience_type}
                                                    onChange={(e) =>
                                                        setData("audience_type", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.audience_type}
                                                    className="mt-2"
                                                />
                                            </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                <div className="educare-button-field-styles">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-secondary-btn-md-fill"
                                        onClick={(e) => {
                                            handleFilterNewsListData(e)
                                        }}
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductSaleReportFilter = ({
    categories,
    products,
    partyTypes,
    setPartyType,
    setLedgerSummaryData,
    setLedgerSummaryItemData
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        category_id: "",
        product_id: "",
        party_type: "",
    });

    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // handle change group start
    const handleChangeGroup = (value) => {
        setData((prevData) => ({
            ...prevData,
            category_id: value,
            product_id: ""
        }));

        const form_data = {
            category_id: value
        }

        router.post(route('product_sale_report.list'), form_data);
    }
    // handle change group end

    // handle filter product sale report start
    const handleFilterProductSaleReport = (e) => {
        e.preventDefault();

        if(data.category_id == '') {
            toast.error('Please select group!', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(data.product_id == '') {
            toast.error('Please select product!', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data.party_type == '') {
            toast.error('Please select party type!', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            setLedgerSummaryData([]);
            setLedgerSummaryItemData([]);

            const form_data = {
                category_id: data.category_id,
                product_id: data.product_id,
                party_type: data.party_type
            }

            router.post(route('product_sale_report.list'), form_data, {
                onSuccess: () => {
                    setPartyType(data.party_type);
                }
            });
        }
    }
    // handle filter product sale report end


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative mb-2.5'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Sold Summary
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="category_id"
                                                data_label="Group"
                                                data={categories}
                                                value={data.category_id}
                                                onChange={(e) =>
                                                    handleChangeGroup(e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.category_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="product_id"
                                                data_label="Product"
                                                data={products}
                                                value={data.product_id}
                                                onChange={(e) =>
                                                    setData("product_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.product_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="party_type"
                                                data_label="Party Type"
                                                data={partyTypes}
                                                value={data.party_type}
                                                onChange={(e) =>
                                                    setData("party_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.party_type}
                                                className="mt-2"
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
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={handleFilterProductSaleReport}
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
                                        <Link
                                            href={route('product_sale_report.list')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
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

export default ProductSaleReportFilter;

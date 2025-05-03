import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const CancelledReportFilter = ({
    paymentMonths,
    staffs,
    cancelledStaffSalaryPayments
}) => {
    const {
        data,
        setData
    } = useForm({
        staff_id: "",
        payment_month_id: "",
    });

    // handle change form valuestart
    const handleChangeFormValue= (field, value) => {
        const updatedData = {
            ...data,
            [field]: value
        }

        setData(updatedData);

        router.post(route('salary_report.cancelledreport'), updatedData);
    }
    // handle change form valueend

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


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Salary Cancelled Report
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        {/* Replace changable inputs */}
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="staff_id"
                                                data_label="Staff"
                                                data={staffs}
                                                value={data.staff_id}
                                                onChange={(e) =>
                                                    handleChangeFormValue("staff_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="payment_month_id"
                                                data_label="Month"
                                                data={paymentMonths}
                                                value={data.payment_month_id}
                                                onChange={(e) =>
                                                    handleChangeFormValue("payment_month_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                        </div>
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>

                            {cancelledStaffSalaryPayments?.length >  0 &&
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.salary.canceled_report', data)}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CancelledReportFilter;

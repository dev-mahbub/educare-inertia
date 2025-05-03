import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useMemo } from 'react';

const CashBookSummaryReport = ({
    cashBookSummary
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
        search: "",
    });

    const headerTopData = (e) => {
        e.preventDefault();
    };

    const filteredCashBookSummary = useMemo(() => {
        const inputText = data?.search?.toLowerCase()?.trim();

        return cashBookSummary?.filter((item) => {
            const title = item?.title?.toLowerCase();
            const debit = String(item?.debit)?.toLowerCase();
            const credit = String(item?.credit)?.toLowerCase();

            return (title && title.includes(inputText)) ||
                (debit && debit.includes(inputText)) ||
                (credit && credit.includes(inputText))
        });
    }, [cashBookSummary, data.search]);


    return (
        <>
            <form onSubmit={headerTopData}>
                <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Summary
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search"
                                value={
                                    data.search
                                }
                                onChange={(e) =>
                                    setData(
                                        "search",
                                        e.target.value
                                    )
                                }
                                placeHolder="Search"
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.search
                                }
                                className="mt-2"
                            />
                        </div>
                        {/* <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                            <div>
                                <Tooltip
                                    title="Search"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href="#"
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-search-interface-symbol"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div> */}
                    </div>
                </div>
            </form>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Ledger Name</th>
                            <th>Debit</th>
                            <th>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCashBookSummary?.length > 0 ?
                            filteredCashBookSummary.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.title}</td>
                                    <td>{parseFloat(item.debit ?? 0)?.toFixed(2)}</td>
                                    <td>{parseFloat(item.credit ?? 0)?.toFixed(2)}</td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="3">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CashBookSummaryReport;

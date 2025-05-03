import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useMemo } from "react";

const GroupSummaryReportLeftDiv = ({
    accountGroups,
    setSelectedAccountGroup
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
        search_group: "",
    });

    const accountGroupsData = useMemo(() => {
        const inputText = data?.search_group?.toLowerCase()?.trim();

        return accountGroups?.filter((item) => {
            const title = item?.title?.toLowerCase()?.trim();

            return title && title?.includes(inputText);
        });
    }, [accountGroups, data?.search_group]);

    // handle select account group data start
    const handleSelectAccountGroup = (e, id) => {
        e.preventDefault();

        const accountGroup = accountGroupsData?.find((item) => item?.id == id);

        setSelectedAccountGroup(accountGroup ?? {});

        router.post(route('group_summary_report.list'), {account_group_id: id});
    }
    // handle select account group data end

    const headerTopData = (e) => {
        e.preventDefault();
    };


    return (
        <>
            <form onSubmit={headerTopData}>
                {/* <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5"> */}
                <div className="mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Account Group
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="educare-input-field-styles">
                            <TextInput
                                id="search_group"
                                value={data.search_group}
                                onChange={(e) =>
                                    setData("search_group", e.target.value)
                                }
                                placeHolder="Search Group"
                                className="block"
                            />
                            <InputError
                                message={errors.search_group}
                                className="mt-2"
                            />
                        </div>
                        {/* <div className="educare-filter-action-btn flex flex-wrap gap-2">
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
                    <tbody>
                        {accountGroupsData?.length > 0 ?
                            accountGroupsData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        {" "}
                                        <button
                                            type="button"
                                            className="font-semibold text-primary"
                                            onClick={(e) => handleSelectAccountGroup(e, item?.id)}
                                        >
                                            {item.title}
                                        </button>{" "}
                                    </td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td className="text-red-500" colSpan="1">
                                    Data not found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GroupSummaryReportLeftDiv;

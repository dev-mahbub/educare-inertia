import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const AllocateProductLocationFilterLeft = ({
    products,
    setFilterText
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

    useEffect(() => {
        setFilterText(data.search);
    }, [data.search]);

    const headerTopData = (e) => {
        e.preventDefault();
    };


    return (
        <form onSubmit={headerTopData}>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Item List
                    </h5>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div>
                        <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                            Total : {products?.length}
                        </span>
                    </div>
                    <div className="educare-input-field-styles">
                        <TextInput
                            id="search"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            placeHolder="Search here"
                            className="block"
                        />
                        <InputError message={errors.search} className="mt-2" />
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
    );
};

export default AllocateProductLocationFilterLeft;

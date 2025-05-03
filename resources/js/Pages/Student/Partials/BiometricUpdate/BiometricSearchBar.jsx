import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React from "react";
import { useRef } from "react";

const BiometricSearchBar = () => {
    const searchInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_id: "",
    });
    const searchData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    return (
        <div className="educare-header-search-bar-main">
            <div className="educare-header-search-bar-left flex items-center gap-2">
                <Link
                    href="#"
                    className="educare-primary-btn-md-fill leading-10"
                >
                    <i className="icon-PlusCircle"></i> Add Biometric
                </Link>
            </div>
            <div className="educare-header-search-bar-right maxXs:flex-grow">
                <div className="educare-header-search-bar-form educare-student-header-search-bar-form">
                    <form onSubmit={searchData}>
                        <TextInput
                            id="search_id"
                            ref={searchInput}
                            value={data.search}
                            onChange={(e) => setData("search_id", e.target.value)}
                            placeHolder="Search..."
                            type="text"
                            className="block"
                        />
                        <InputError message={errors.search_id} className="mt-2" />
                        <button type="submit">
                            <i className="icon-search-interface-symbol text-[18px] text-heading"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BiometricSearchBar;
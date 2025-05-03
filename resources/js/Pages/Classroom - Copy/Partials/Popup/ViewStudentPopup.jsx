import React, { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import { Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Tooltip } from "@mui/material";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function ViewStudentPopup({
    className = "",
    viewStudentPopup,
    setViewStudentPopup,
    students,
}) {
    const [searchValue, setSearchValue] = useState(null);
    const [searchData, setSearchData] = useState(students);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    useEffect(() => {
        setSearchData(students);
    }, [students]);

    const viewStudentData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setViewStudentPopup(false);
        reset();
    };

    const handleSearch = (value) => {
        setSearchValue(value);
        const searchTerms = value
            .toLowerCase()
            .split(" ")
            .filter((term) => term.trim() !== "");
        const filteredData = students.filter((item2) => {
            for (const item of item2) {
                for (const term of searchTerms) {
                    if (
                        !(
                            (typeof item.roll === "string" &&
                                item.roll.toString().includes(term)) ||
                            (typeof item.admission_no === "string" &&
                                item.admission_no.toString().includes(term)) ||
                            (typeof item.title === "string" &&
                                item.title.toLowerCase().includes(term)) ||
                            (typeof item.parent === "string" &&
                                item.parent.toLowerCase().includes(term))
                        )
                    ) {
                        return false;
                    }
                }
            }
            return true;
        });

        setSearchData(filteredData);
    };

    console.log(students);

    return (
        <section
            className={`educare-admission-follow-up-area space-y-6 ${className}`}
        >
            <Modal show={viewStudentPopup} onClose={closeModal}>
                <form onSubmit={viewStudentData} className="py-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper">
                        <div className="educare-popup-form-header flex flex-wrap gap-2 items-center px-[30px] py-3">
                            <h5>Students</h5>
                            <div className="educare-admission-filtar-bar-filter-action">
                                {/* <div className='educare-button-field-styles'>
                                    <Tooltip
                                        title="Excel Sheet"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button type='button'
                                            className="educare-success-btn-md-fill"
                                        >
                                            <i className="icon-FileX"></i>
                                        </button>
                                    </Tooltip>
                                </div> */}
                            </div>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] body-bg maxSm:py-4 px-[30px] flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-9">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="search_value"
                                            value={searchValue}
                                            onChange={(e) =>
                                                handleSearch(e.target.value)
                                            }
                                            className="block"
                                            placeHolder="Search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="educare-admission-list table-width-full pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="whitespace-nowrap">
                                                Roll No.
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Admission No.
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Name
                                            </th>
                                            <th className="whitespace-nowrap">
                                                Father Name
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchData?.length ? (
                                            searchData?.map((stdItem, stdInx) => (
                                                stdItem?.length && stdItem?.map((item) => (
                                                    <tr key={item?.id}>
                                                        <td className="whitespace-nowrap">
                                                            {item?.roll}
                                                        </td>
                                                        <td className="whitespace-nowrap">
                                                            {item?.admission_no}
                                                        </td>
                                                        <td className="whitespace-nowrap">
                                                            {item?.title}
                                                        </td>
                                                        <td className="whitespace-nowrap">
                                                            {item?.parent}
                                                        </td>
                                                    </tr>
                                                 ))

                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="4"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 px-[30px] justify-end">
                        <PrimaryButton
                            className="educare-gray-btn-lg-stroke"
                            onClick={closeModal}
                        >
                            Close
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

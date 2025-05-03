import React from 'react';
import AllocateBookToLocationLeftForm from './AllocateBookToLocationLeftForm';
import AllocateBookToLocationRightTable from './AllocateBookToLocationRightTable';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

const AllocateBookToLocationTables = () => {
    const [bookStock, setBookStock] = useState(false);
    const [accnoView, setAccnoView] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        book_title: "",
        author: "",
        publisher: "",
        acc_no: "",
        select_class: "I",
        author: "",
    });

    const handleBookStock = () => {
        if (data.select_class === "I") {
            setBookStock(true)
        }
    }
    const handleRightTableShow = () => {
        setAccnoView(true)
    }
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <AllocateBookToLocationLeftForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        bookStock={bookStock}
                        setBookStock={setBookStock}
                        handleBookStock={handleBookStock}
                        handleRightTableShow={handleRightTableShow}
                    />
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <AllocateBookToLocationRightTable
                        accnoView={accnoView}
                    />
                </div>
            </div>
        </>
    );
};

export default AllocateBookToLocationTables;
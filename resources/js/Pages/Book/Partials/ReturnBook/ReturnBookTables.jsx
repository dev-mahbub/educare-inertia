import React, { useEffect } from 'react';
import ReturnBookRight from './ReturnBookRight';
import ReturnBookLeftForm from './ReturnBookLeftForm';
import { useForm } from '@inertiajs/react';
import { concatName } from "@/Hooks/GlobalFunction";

const ReturnBookTables = ({
    bookData,
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        book_item_id: bookData?.book_item?.id,
        student_id: bookData?.book_issue?.student?.id,
        staff_id: bookData?.book_issue?.staff?.id,
        book_acc_no_id: bookData?.id,
        book_issue_id: bookData?.book_issue?.id,
        acc_no: bookData?.acc_no,
        issued_date_at: bookData?.book_issue?.issued_date_at,
        due_date_at: bookData?.book_issue?.due_date_at,
        return_date: "",
        book_title: bookData?.book_item?.book_title,
        author: bookData?.book_item?.author,
        publisher_name: bookData?.book_item?.publisher_name,
        description: bookData?.book_item?.description,
        student_name: concatName(bookData?.book_issue?.student?.first_name, bookData?.book_issue?.student?.middle_name, bookData?.book_issue?.student?.last_name),
        admission_no: bookData?.book_issue?.student?.admission_no,
        roll_no: bookData?.book_issue?.student?.classroom_roll?.roll_no,
        classroom_title: bookData?.book_issue?.student?.classroom?.title,
        late_by_day: 10,
        late_by_fine: 20,
        return_note: "",
        book_user_type: bookData?.book_issue?.book_user_type,
        staff_name: concatName(bookData?.book_issue?.staff?.first_name, bookData?.book_issue?.staff?.middle_name, bookData?.book_issue?.staff?.last_name),
    });

    useEffect(() => {
        reset();
        setData({
            book_item_id: bookData?.book_item?.id,
            student_id: bookData?.book_issue?.student?.id,
            staff_id: bookData?.book_issue?.staff?.id,
            book_issue_id: bookData?.book_issue?.id,
            book_acc_no_id: bookData?.id,
            acc_no: bookData?.acc_no,
            issued_date_at: bookData?.book_issue?.issued_date_at,
            due_date_at: bookData?.book_issue?.due_date_at,
            return_date: "",
            book_title: bookData?.book_item?.book_title,
            author: bookData?.book_item?.author,
            publisher_name: bookData?.book_item?.publisher_name,
            description: bookData?.book_item?.description,
            student_name: concatName(bookData?.book_issue?.student?.first_name, bookData?.book_issue?.student?.middle_name, bookData?.book_issue?.student?.last_name),
            admission_no: bookData?.book_issue?.student?.admission_no,
            roll_no: bookData?.book_issue?.student?.classroom_roll?.roll_no,
            classroom_title: bookData?.book_issue?.student?.classroom?.title,
            late_by_day: 10,
            late_by_fine: 20,
            return_note: "",
            book_user_type: bookData?.book_issue?.book_user_type,
            staff_name: concatName(bookData?.book_issue?.staff?.first_name, bookData?.book_issue?.staff?.middle_name, bookData?.book_issue?.staff?.last_name),
        });
    }, [bookData]);

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("book.return_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <>
            <form onSubmit={handleFormDataInsert}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <ReturnBookLeftForm
                            bookData={bookData}
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                        />
                    </div>
                    <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                        <ReturnBookRight
                            bookData={bookData}
                            data={data}
                            setData={setData}
                            processing={processing}
                            errors={errors}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default ReturnBookTables;

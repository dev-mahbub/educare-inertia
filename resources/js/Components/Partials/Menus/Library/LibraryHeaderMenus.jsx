import Dropdown from '@/Components/Dropdown';
import React, { useState } from 'react';
import LibraryMobileNavs from './LibraryMobileNavs'

const LibraryHeaderMenus = ({ title }) => {
    {/* Toggle Mobile Navs function Start */ }
    const [isMobileNavsShow, setIsMobileNavsShow] = useState(false);
    const toggleMobileNavsShow = () => {
        setIsMobileNavsShow(!isMobileNavsShow);
    };
    {/* Toggle Mobile Navs function End */ }
    return (
        <>
            <div className='educare-mis-report-menu-area'>
                <div className="educare-mis-report-menu">
                    <div className="educare-mis-report-menu-left">
                        <div className="educare-mis-report-menu-left-inner">
                            <i className='icon-cap'></i>
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <div className="educare-mis-report-menu-right">
                        <div className="educare-mis-report-category">
                            <div className="educare-mis-report-category-wrap hidden sm:inline-block">
                                <ul>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Master
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('library_shelf_level.shelf_level')}>
                                                    Shelf Level
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.book_category_list')}>
                                                    Book Categories
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('library_vendor.list')}>
                                                    Library Vendors
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('library.setting')}>
                                                    Library Setting
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Purchase
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('book.purchase')}>
                                                    New Purchase
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.inhouse')}>
                                                    Add InHouse Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.purchase_history')}>
                                                    Purchase History
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Books
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('book.list')}>
                                                    Master Book List
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.total_book_list')}>
                                                    Total Book List
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.book_search_by_location')}>
                                                    Book Search By Location
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.allocate_book_to_location')}>
                                                    Allocate Book To Location
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.inactive')}>
                                                    InActive Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.import')}>
                                                    Import Book
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Issue / Return
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('book.issue')}>
                                                    Issue Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.return')}>
                                                    Return Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book.multi_issues')}>
                                                    Multiple book Issue/Return
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    E-Book
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('ebook.create')}>
                                                    Add E-Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('ebook.list')}>
                                                    E-Book List
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Student Reports
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('book_report.student_issue_book')}>
                                                    Issued Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.student_wise_book')}>
                                                    Student Wise Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.student_transaction_book')}>
                                                    Student Book Transaction
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.student_due_book')}>
                                                    Student Due Books
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.student_book_wise')}>
                                                    Student Book wise
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div
                                                    type="button"
                                                    className="educare-dropdown-menu inline-flex items-center text-[14px] font-medium text-headingLight cursor-pointer gap-x-2"
                                                >
                                                    Teacher Reports
                                                    <i className='icon-CaretDown'></i>
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('book_report.teacher_issue_book')}>
                                                    Teacher Issued Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.teacher_wise_book')}>
                                                    Teacher Wise Book
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.teacher_transaction_book')}>
                                                    Teacher Book Transaction
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('book_report.teacher_due_book')}>
                                                    Teacher Due Books
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </div>
                            {/* Mobile Navs Activation Start */}
                            <div className="educare-sidebar-navs-btn sm:hidden inline-block">
                                <button type='button' onClick={toggleMobileNavsShow}>Menus <i className='icon-CaretDown'></i></button>
                            </div>
                            {/* Mobile Navs Activation End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Navs Component Start */}
            <LibraryMobileNavs isMobileNavsShow={isMobileNavsShow} onRemoveMobileNavs={() => setIsMobileNavsShow(false)} />
            {/* Mobile Navs Component End */}
        </>
    );
};

export default LibraryHeaderMenus;

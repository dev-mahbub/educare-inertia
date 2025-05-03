import DangerButton from '@/Components/DangerButton';
import DarkButton from '@/Components/DarkButton';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import TertiaryButton from '@/Components/TertiaryButton';
import WarningButton from '@/Components/WarningButton';
import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';

const ButtonElements = () => {
    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            {/* Lg Fill Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>LG Fill Buttons Style</h5>
            <div className='flex flex-wrap gap-4 mb-7'>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-lg-fill"
                >
                    Primary LG Fill
                </PrimaryButton>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-gray-btn-lg-fill"
                >
                    Gray LG Fill
                </PrimaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-secondary-btn-lg-fill"
                >
                    Secondary LG Fill
                </SuccessButton>
                <DarkButton
                    // disabled={processing}
                    className="educare-dark-btn-lg-fill"
                >
                    Dark LG Fill
                </DarkButton>
                <WarningButton
                    // disabled={processing}
                    className="educare-warning-btn-lg-fill"
                >
                    Warning LG Fill
                </WarningButton>
                <TertiaryButton
                    // disabled={processing}
                    className="educare-tertiary-btn-lg-fill"
                >
                    Tertiary LG Fill
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-lg-fill"
                >
                    Success LG Fill
                </SuccessButton>
                <DangerButton
                    // disabled={processing}
                    className="educare-danger-btn-lg-fill"
                >
                    Danger LG Fill
                </DangerButton>
            </div>
            {/* Lg Fill Btn End */}

            {/* Lg Fill Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>LG Stroke Buttons Style</h5>
            <div className='flex flex-wrap gap-4 mb-7'>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-lg-stroke"
                >
                    Primary LG Stroke
                </PrimaryButton>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-gray-btn-lg-stroke"
                >
                    Gray LG Stroke
                </PrimaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-secondary-btn-lg-stroke"
                >
                    Secondary LG Stroke
                </SuccessButton>
                <DarkButton
                    // disabled={processing}
                    className="educare-dark-btn-lg-stroke"
                >
                    Dark LG Stroke
                </DarkButton>
                <WarningButton
                    // disabled={processing}
                    className="educare-warning-btn-lg-stroke"
                >
                    Warning LG Stroke
                </WarningButton>
                <TertiaryButton
                    // disabled={processing}
                    className="educare-tertiary-btn-lg-stroke"
                >
                    Tertiary LG Stroke
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-lg-stroke"
                >
                    Success LG Stroke
                </SuccessButton>
                <DangerButton
                    // disabled={processing}
                    className="educare-danger-btn-lg-stroke"
                >
                    Danger LG Stroke
                </DangerButton>
            </div>
            {/* Lg Fill Btn End */}

            {/* Md Fill Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>MD Fill Buttons Style</h5>
            <div className='flex flex-wrap gap-4 mb-7'>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                >
                    Primary Md Fill
                </PrimaryButton>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-gray-btn-md-fill"
                >
                    Gray MD Fill
                </PrimaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-secondary-btn-md-fill"
                >
                    Secondary Md Fill
                </SuccessButton>
                <DarkButton
                    // disabled={processing}
                    className="educare-dark-btn-md-fill"
                >
                    Dark Md Fill
                </DarkButton>
                <WarningButton
                    // disabled={processing}
                    className="educare-warning-btn-md-fill"
                >
                    Warning Md Fill
                </WarningButton>
                <TertiaryButton
                    // disabled={processing}
                    className="educare-tertiary-btn-md-fill"
                >
                    Tertiary Md Fill
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-md-fill"
                >
                    Success Md Fill
                </SuccessButton>
                <DangerButton
                    // disabled={processing}
                    className="educare-danger-btn-md-fill"
                >
                    Danger Md Fill
                </DangerButton>
            </div>
            {/* Md Fill Btn End */}

            {/* Md Fill Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>MD Fill Button With Plus</h5>
            <div className='flex flex-wrap gap-4 mb-7'>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Primary Md Fill
                </PrimaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-secondary-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Secondary Md Fill
                </SuccessButton>
                <DarkButton
                    // disabled={processing}
                    className="educare-dark-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Dark Md Fill
                </DarkButton>
                <WarningButton
                    // disabled={processing}
                    className="educare-warning-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Warning Md Fill
                </WarningButton>
                <TertiaryButton
                    // disabled={processing}
                    className="educare-tertiary-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Tertiary Md Fill
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Success Md Fill
                </SuccessButton>
                <DangerButton
                    // disabled={processing}
                    className="educare-danger-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Danger Md Fill
                </DangerButton>
            </div>
            {/* Md Fill Btn End */}

            {/* Md Stroke Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>MD Stroke Buttons Style</h5>
            <div className='flex flex-wrap gap-4 mb-7'>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-stroke"
                >
                    Primary Md Stroke
                </PrimaryButton>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-gray-btn-md-stroke"
                >
                    Gray MD Stroke
                </PrimaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-secondary-btn-md-stroke"
                >
                    Secondary Md Stroke
                </SuccessButton>
                <DarkButton
                    // disabled={processing}
                    className="educare-dark-btn-md-stroke"
                >
                    Dark Md Stroke
                </DarkButton>
                <WarningButton
                    // disabled={processing}
                    className="educare-warning-btn-md-stroke"
                >
                    Warning Md Stroke
                </WarningButton>
                <TertiaryButton
                    // disabled={processing}
                    className="educare-tertiary-btn-md-stroke"
                >
                    Tertiary Md Stroke
                </TertiaryButton>
                <SuccessButton
                    // disabled={processing}
                    className="educare-success-btn-md-stroke"
                >
                    Success Md Stroke
                </SuccessButton>
                <DangerButton
                    // disabled={processing}
                    className="educare-danger-btn-md-stroke"
                >
                    Danger Md Stroke
                </DangerButton>
            </div>
            {/* Md Stroke Btn End */}

            {/* Md Fill Btn Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>MD Filter Bar Buttons Style</h5>
            <div className='flex flex-wrap gap-2 mb-7 educare-filter-action-btn'>
                <div>
                    <Tooltip
                        title="Create"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-primary-btn-md-fill"
                        >
                            <i className="icon-plus"></i>
                        </Link>
                    </Tooltip>
                </div>
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
                <div>
                    <Tooltip
                        title="Import"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-dark-btn-md-fill"
                        >
                            <i className="icon-upload"></i>
                        </Link>
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
                            href="#"
                            className="educare-gray-btn-md-fill"
                        >
                            <i className="icon-ArrowsClockwise"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Excel Sheet"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-success-btn-md-fill"
                        >
                            <i className="icon-FileX"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Delete"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-danger-btn-md-fill"
                        >
                            <i className="icon-TrashSimple"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Check"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-success-btn-md-fill"
                        >
                            <i className="icon-check-1"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Cancel"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-danger-btn-md-fill"
                        >
                            X
                        </Link>
                    </Tooltip>
                </div>
            </div>
            {/* Md Fill Btn End */}

            {/* SM List Action Buttons Style Start */}
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>SM List Action Buttons Style</h5>
            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                <div>
                    <Tooltip
                        title="Edit"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-warning-btn-sm-fill"
                        >
                            <i className="icon-editing"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="View"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-tertiary-btn-sm-fill"
                        >
                            <i className="icon-eye"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Delete"
                        placement="top"
                        arrow
                    >
                        <Link
                            href="#"
                            className="educare-danger-btn-sm-fill"
                        >
                            <i className="icon-TrashSimple"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div className='relative'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="educare-dropdown-menu">
                                <button type="button" className="educare-dark-btn-sm-fill">
                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                </button>
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href="#">
                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                Student Details
                            </Dropdown.Link>
                            <Dropdown.Link href="#">
                                <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                Print
                            </Dropdown.Link>
                            <button type="button">
                                <i className="icon-Notebook text-[20px] text-supportingA mr-1"></i>{" "}
                                Notes
                            </button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>                         
            </div>
            <div className='pb-5'></div>
            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                <div>
                    <Tooltip
                        title="Check"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-success-btn-sm-fill"
                        >
                            <i className="icon-check-1"></i>
                        </Link>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        title="Cancel"
                        placement="top"
                        arrow
                        as="button"
                    >
                        <Link
                            href="#"
                            className="educare-danger-btn-sm-fill"
                        >
                            X
                        </Link>
                    </Tooltip>
                </div>
            </div>
            {/* SM List Action Buttons Style End */}
        </div>
    );
};

export default ButtonElements;


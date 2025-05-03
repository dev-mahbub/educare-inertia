import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import { ColorPicker } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import HeaderCardBackgroundPopup from './CardBackgroundPopup/HeaderCardBackgroundPopup';

const CustomFromHeader = ({
    headerData,
    setHeaderData,
    data,
    setData,
    handleUploadBackgroundImage,
    fontSizeArray,
    handleDeleteBackgroundImage
}) => {
    const [schoolTitleColor, setSchoolTitleColor] = useState(headerData?.school_title?.color ?? "");
    const [titleTwoColor, setTitleTwoColor] = useState(headerData?.title_2?.color ?? "");
    const [titleThreeColor, setTitleThreeColor] = useState(headerData?.title_3?.color ?? "");
    const [headerColor, setHeaderColor] = useState(headerData?.background_color ?? "");
    const [activeSchoolBoldBtn, setActiveSchoolBoldBtn] = useState(false);
    const [activeSchoolItalicBtn, setActiveSchoolItalicBtn] = useState(false);
    const [activeSchoolUlBtn, setActiveSchoolUlBtn] = useState(false);
    const [activeSchoolLtBtn, setActiveSchoolLtBtn] = useState(false);
    const [activeTitleTwoBoldBtn, setActiveTitleTwoBoldBtn] = useState(false);
    const [activeTitleTwoItalicBtn, setActiveTitleTwoItalicBtn] = useState(false);
    const [activeTitleTwoUlBtn, setActiveTitleTwoUlBtn] = useState(false);
    const [activeTitleTwoLtBtn, setActiveTitleTwoLtBtn] = useState(false);
    const [activeTitleThreeBoldBtn, setActiveTitleThreeBoldBtn] = useState(false);
    const [activeTitleThreeItalicBtn, setActiveTitleThreeItalicBtn] = useState(false);
    const [activeTitleThreeUlBtn, setActiveTitleThreeUlBtn] = useState(false);
    const [activeTitleThreeLtBtn, setActiveTitleThreeLtBtn] = useState(false);
    const [activeSchoolAlignmentBtn, setActiveSchoolAlignmentBtn] = useState("");
    const [activeTitleTwoAlignmentBtn, setActiveTitleTwoAlignmentBtn] = useState("");
    const [activeTitleThreeAlignmentBtn, setActiveTitleThreeAlignmentBtn] = useState("");

    // handle color change start
    useEffect(() => {
        const updatedHeaderData = {...headerData}

        if (headerColor) {
            updatedHeaderData['background_color'] = headerColor;
        }

        if (schoolTitleColor) {
            updatedHeaderData['school_title']['color'] = schoolTitleColor;
        }

        if (titleTwoColor) {
            updatedHeaderData['title_2']['color'] = titleTwoColor;
        }

        if (titleThreeColor) {
            updatedHeaderData['title_3']['color'] = titleThreeColor;
        }

        setHeaderData(updatedHeaderData);
    }, [headerColor, schoolTitleColor, titleTwoColor, titleThreeColor]);
    // handle color change end

    // handle style change start
    useEffect(() => {
        const updatedHeaderData = {...headerData}

        updatedHeaderData['school_title']['font_weight_bold'] = activeSchoolBoldBtn;
        updatedHeaderData['title_2']['font_weight_bold'] = activeTitleTwoBoldBtn;
        updatedHeaderData['title_3']['font_weight_bold'] = activeTitleThreeBoldBtn;

        setHeaderData(updatedHeaderData);
    }, [activeSchoolBoldBtn, activeTitleTwoBoldBtn, activeTitleThreeBoldBtn]);

    useEffect(() => {
        const updatedHeaderData = {...headerData}

        updatedHeaderData['school_title']['font_style_italic'] = activeSchoolItalicBtn;
        updatedHeaderData['title_2']['font_style_italic'] = activeTitleTwoItalicBtn;
        updatedHeaderData['title_3']['font_style_italic'] = activeTitleThreeItalicBtn;

        setHeaderData(updatedHeaderData);
    }, [activeSchoolItalicBtn, activeTitleTwoItalicBtn, activeTitleThreeItalicBtn]);

    useEffect(() => {
        const updatedHeaderData = {...headerData}

        updatedHeaderData['school_title']['text_decoration_underline'] = activeSchoolUlBtn;
        updatedHeaderData['title_2']['text_decoration_underline'] = activeTitleTwoUlBtn;
        updatedHeaderData['title_3']['text_decoration_underline'] = activeTitleThreeUlBtn;

        setHeaderData(updatedHeaderData);
    }, [activeSchoolUlBtn, activeTitleTwoUlBtn, activeTitleThreeUlBtn]);

    useEffect(() => {
        const updatedHeaderData = {...headerData}

        updatedHeaderData['school_title']['text_decoration_linethrough'] = activeSchoolLtBtn;
        updatedHeaderData['title_2']['text_decoration_linethrough'] = activeTitleTwoLtBtn;
        updatedHeaderData['title_3']['text_decoration_linethrough'] = activeTitleThreeLtBtn;

        setHeaderData(updatedHeaderData);
    }, [activeSchoolLtBtn, activeTitleTwoLtBtn, activeTitleThreeLtBtn]);

    useEffect(() => {
        const updatedHeaderData = {...headerData}

        updatedHeaderData['school_title']['text_align'] = activeSchoolAlignmentBtn;
        updatedHeaderData['title_2']['text_align'] = activeTitleTwoAlignmentBtn;
        updatedHeaderData['title_3']['text_align'] = activeTitleThreeAlignmentBtn;

        setHeaderData(updatedHeaderData);
    }, [activeSchoolAlignmentBtn, activeTitleTwoAlignmentBtn, activeTitleThreeAlignmentBtn]);
    // handle style change end


    // handle header data change start
    const handleHeaderDataChange = (type, name, value) => {
        const updatedHeaderData = { ...headerData }

        updatedHeaderData[type][name] = value;

        setHeaderData(updatedHeaderData);
    }
    // handle header data change end

    //handle header color
    const handleHeaderColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setHeaderColor(colorValue)
    };

    //handle School title color
    const handleSchoolTitleColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setSchoolTitleColor(colorValue)
    };

    //handle title two color
    const handleTitleTwoColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleTwoColor(colorValue)
    };
    //handle title three color
    const handleTitleThreeColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleThreeColor(colorValue)
    };

    //handle school style btn start
    const handleStyleSchoolBoldBtn = () => {
        setActiveSchoolBoldBtn(!activeSchoolBoldBtn);
    }

    const handleStyleSchoolItalicBtn = () => {
        setActiveSchoolItalicBtn(!activeSchoolItalicBtn);
    }

    const handleStyleSchoolUlBtn = () => {
        setActiveSchoolUlBtn(!activeSchoolUlBtn);
    }

    const handleStyleSchoolLtBtn = () => {
        setActiveSchoolLtBtn(!activeSchoolLtBtn);
    }
    //handle school style btn end

    //handle title two style btn start
    const handleStyleTitleTwoBoldBtn = () => {
        setActiveTitleTwoBoldBtn(!activeTitleTwoBoldBtn);
    }

    const handleStyleTitleTwoItalicBtn = () => {
        setActiveTitleTwoItalicBtn(!activeTitleTwoItalicBtn);
    }

    const handleStyleTitleTwoUlBtn = () => {
        setActiveTitleTwoUlBtn(!activeTitleTwoUlBtn);
    }

    const handleStyleTitleTwoLtBtn = () => {
        setActiveTitleTwoLtBtn(!activeTitleTwoLtBtn);
    }
    //handle title two style btn end

    //handle title three style btn start
    const handleStyleTitleThreeBoldBtn = () => {
        setActiveTitleThreeBoldBtn(!activeTitleThreeBoldBtn);
    }

    const handleStyleTitleThreeItalicBtn = () => {
        setActiveTitleThreeItalicBtn(!activeTitleThreeItalicBtn);
    }

    const handleStyleTitleThreeUlBtn = () => {
        setActiveTitleThreeUlBtn(!activeTitleThreeUlBtn);
    }

    const handleStyleTitleThreeLtBtn = () => {
        setActiveTitleThreeLtBtn(!activeTitleThreeLtBtn);
    }
    //handle title three style btn end

    //handle school toggle button
    const handleSchoolAlignmentToggle = (align) => {
        setActiveSchoolAlignmentBtn(align);
    }

    //handle title two toggle button
    const handleTitleTwoAlignmentToggle = (align) => {
        setActiveTitleTwoAlignmentBtn(align);
    }

    //handle title three toggle button
    const handleTitleThreeAlignmentToggle = (align) => {
        setActiveTitleThreeAlignmentBtn(align);
    }

    //popup
    const [cardBgPopup, setCardBgPopup] = useState(false);
    const handleCardBgPopupClick = () => {
        setCardBgPopup(!cardBgPopup);
    };

    return (
        <>
            <div className="headerTwo custom-id-header pt-5">
                <h3 className="header-title">Header</h3>
                <div className="custom-id-header-wrapper">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Background</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="header_background_image"
                                        type="file"
                                        name="header_background_image"
                                        onChange={(e) =>
                                            setData(
                                                "header_background_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                {/* <small>select size(500X300)px</small> */}
                            </div>
                        </div>
                        <div className="file-button">
                            {/* <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleUploadBackgroundImage(e, 'header_background_image')
                                }}
                            >
                                <i className="icon-upload"></i> Upload
                            </PrimaryButton> */}
                            {/* <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-warning-btn-md-fill"
                                    onClick={handleCardBgPopupClick}
                                >
                                    <i className="icon-FolderNotchOpen"></i>
                                </button>
                            </div> */}
                            <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-danger-btn-md-fill"
                                    onClick={(e) => {
                                        handleDeleteBackgroundImage(e, 'header_background_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-color-picker">
                        <p className='header-label'>Background</p>
                        <ColorPicker className='color-picker' value={headerColor} onChange={(e) => handleHeaderColorChange(e.value)} />
                        <div className="color-input">
                            <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-secondary-btn-md-fill"
                                >
                                    <i className="icon-pen"></i>
                                </button>
                            </div>
                            <div className="educare-input-field-styles-small-width">
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        value={headerColor}
                                        onChange={(e) => handleHeaderColorChange(e.target.value)}
                                        className="block"
                                        placeHolder='#FFF000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>School Title</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                headerData?.school_title?.title
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('school_title', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='School Title'
                        />
                        {/* <InputError
                            message={
                                errors.school_title
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                headerData?.school_title?.font_size
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('school_title', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.school_title_font_size
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Style</h5>
                        <div className="title-style-btn flex">
                            <Tooltip
                                title="Bold"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleSchoolBoldBtn}
                                    className={`style-btn ${headerData?.school_title?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='font-bold'>B</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Italic"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleSchoolItalicBtn}
                                    className={`style-btn ${headerData?.school_title?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='italic'>I</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Underline"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleSchoolUlBtn}
                                    className={`style-btn ${headerData?.school_title?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='underline'>U</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Line Through"
                                placement="top"
                                arrow
                            >
                                <button
                                    className={`style-btn ${headerData?.school_title?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleStyleSchoolLtBtn}
                                >
                                    <span className='line-through'>S</span>
                                </button>
                            </Tooltip>

                        </div>
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Alignment</h5>
                        <div className="title-style-btn flex">
                            <div>
                                <button
                                    onClick={() => handleSchoolAlignmentToggle('center')}
                                    className={`style-btn ${headerData?.school_title?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleSchoolAlignmentToggle('left')}
                                    className={`style-btn ${headerData?.school_title?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleSchoolAlignmentToggle('right')}
                                    className={`style-btn ${headerData?.school_title?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${headerData?.school_title?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleSchoolAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={schoolTitleColor} onChange={(e) => handleSchoolTitleColorChange(e.value)} />
                            <div className="color-input">
                                <div className='educare-filter-action-btn'>
                                    <button
                                        type='button'
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-pen"></i>
                                    </button>
                                </div>
                                <div className="educare-input-field-styles-small-width">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={schoolTitleColor}
                                            onChange={(e) => handleSchoolTitleColorChange(e.target.value)}
                                            className="block"
                                            placeHolder='#FFF000'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title 2</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                headerData?.title_2?.title
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('title_2', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Title 2'
                        />
                        {/* <InputError
                            message={
                                errors.title_two_text_area
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                headerData?.title_2?.font_size
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('title_2', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.title_two_font_size
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Style</h5>
                        <div className="title-style-btn flex">
                            <Tooltip
                                title="Bold"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleTwoBoldBtn}
                                    className={`style-btn ${headerData?.title_2?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='font-bold'>B</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Italic"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleTwoItalicBtn}
                                    className={`style-btn ${headerData?.title_2?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='italic'>I</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Underline"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleTwoUlBtn}
                                    className={`style-btn ${headerData?.title_2?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='underline'>U</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Line Through"
                                placement="top"
                                arrow
                            >
                                <button
                                    className={`style-btn ${headerData?.title_2?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleStyleTitleTwoLtBtn}
                                >
                                    <span className='line-through'>S</span>
                                </button>
                            </Tooltip>

                        </div>
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Alignment</h5>
                        <div className="title-style-btn flex">
                            <div>
                                <button
                                    onClick={() => handleTitleTwoAlignmentToggle('center')}
                                    className={`style-btn ${headerData?.title_2?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleTitleTwoAlignmentToggle('left')}
                                    className={`style-btn ${headerData?.title_2?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleTitleTwoAlignmentToggle('right')}
                                    className={`style-btn ${headerData?.title_2?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${headerData?.title_2?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleTitleTwoAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={titleTwoColor} onChange={(e) => handleTitleTwoColorChange(e.value)} />
                            <div className="color-input">
                                <div className='educare-filter-action-btn'>
                                    <button
                                        type='button'
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-pen"></i>
                                    </button>
                                </div>
                                <div className="educare-input-field-styles-small-width">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={titleTwoColor}
                                            onChange={(e) => handleTitleTwoColorChange(e.target.value)}
                                            className="block"
                                            placeHolder='#FFF000'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title 3</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                headerData?.title_3?.title
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('title_3', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Title 2'
                        />
                        {/* <InputError
                            message={
                                errors.title_three_text_area
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                headerData?.title_3?.font_size
                            }
                            onChange={(e) =>
                                handleHeaderDataChange('title_3', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.title_three_font_size
                            }
                            className="mt-2"
                        /> */}
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Style</h5>
                        <div className="title-style-btn flex">
                            <Tooltip
                                title="Bold"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleThreeBoldBtn}
                                    className={`style-btn ${headerData?.title_3?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='font-bold'>B</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Italic"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleThreeItalicBtn}
                                    className={`style-btn ${headerData?.title_3?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='italic'>I</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Underline"
                                placement="top"
                                arrow
                            >
                                <button
                                    onClick={handleStyleTitleThreeUlBtn}
                                    className={`style-btn ${headerData?.title_3?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <span className='underline'>U</span>
                                </button>
                            </Tooltip>

                            <Tooltip
                                title="Line Through"
                                placement="top"
                                arrow
                            >
                                <button
                                    className={`style-btn ${headerData?.title_3?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleStyleTitleThreeLtBtn}
                                >
                                    <span className='line-through'>S</span>
                                </button>
                            </Tooltip>

                        </div>
                    </div>
                    <div className="title-style">
                        <h5 className='header-title'>Alignment</h5>
                        <div className="title-style-btn flex">
                            <div>
                                <button
                                    onClick={() => handleTitleThreeAlignmentToggle('center')}
                                    className={`style-btn ${headerData?.title_3?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleTitleThreeAlignmentToggle('left')}
                                    className={`style-btn ${headerData?.title_3?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleTitleThreeAlignmentToggle('right')}
                                    className={`style-btn ${headerData?.title_3?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${headerData?.title_3?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleTitleThreeAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={titleThreeColor} onChange={(e) => handleTitleThreeColorChange(e.value)} />
                            <div className="color-input">
                                <div className='educare-filter-action-btn'>
                                    <button
                                        type='button'
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        <i className="icon-pen"></i>
                                    </button>
                                </div>
                                <div className="educare-input-field-styles-small-width">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            value={titleThreeColor}
                                            onChange={(e) => handleTitleThreeColorChange(e.target.value)}
                                            className="block"
                                            placeHolder='#FFF000'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderCardBackgroundPopup
                cardBgPopup={cardBgPopup}
                setCardBgPopup={setCardBgPopup}
            />
        </>
    );
};

export default CustomFromHeader;

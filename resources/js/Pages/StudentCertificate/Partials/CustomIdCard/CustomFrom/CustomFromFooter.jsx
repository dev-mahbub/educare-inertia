import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import { ColorPicker } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import FooterBgCardPopup from './CardBackgroundPopup/FooterBgCardPopup';
import FooterSignatureBgCardPopup from './CardBackgroundPopup/FooterSignatureBgCardPopup';

const CustomFromFooter = ({
    footerData,
    setFooterData,
    data,
    setData,
    handleUploadBackgroundImage,
    fontSizeArray,
    handleDeleteBackgroundImage
}) => {
    const [footerTitleColor, setfooterTitleColor] = useState(footerData?.title_1?.color ?? "");
    const [footerTitleTwoColor, setfooterTitleTwoColor] = useState(footerData?.title_2?.color ?? "");
    const [footerColor, setfooterColor] = useState(footerData?.background_color ?? "");
    const [activeFooterBoldBtn, setactiveFooterBoldBtn] = useState(false);
    const [activeFooterItalicBtn, setactiveFooterItalicBtn] = useState(false);
    const [activeFooterUlBtn, setactiveFooterUlBtn] = useState(false);
    const [activeFooterLtBtn, setactiveFooterLtBtn] = useState(false);
    const [activeFooterTitleTwoBoldBtn, setactiveFooterTitleTwoBoldBtn] = useState(false);
    const [activeFooterTitleTwoItalicBtn, setactiveFooterTitleTwoItalicBtn] = useState(false);
    const [activeFooterTitleTwoUlBtn, setactiveFooterTitleTwoUlBtn] = useState(false);
    const [activeFooterTitleTwoLtBtn, setactiveFooterTitleTwoLtBtn] = useState(false);
    const [activeFooterAlignmentBtn, setactiveFooterAlignmentBtn] = useState("");
    const [activeFooterTitleTwoAlignment, setactiveFooterTitleTwoAlignment] = useState("");
    const [footerCardBgPopup, setFooterCardBgPopup] = useState(false);

    // handle color change start
    useEffect(() => {
        const updatedFooterData = { ...footerData }

        if (footerColor) {
            updatedFooterData['background_color'] = footerColor;
        }

        if (footerTitleColor) {
            updatedFooterData['title_1']['color'] = footerTitleColor;
        }

        if (footerTitleTwoColor) {
            updatedFooterData['title_2']['color'] = footerTitleTwoColor;
        }

        setFooterData(updatedFooterData);
    }, [footerColor, footerTitleColor, footerTitleTwoColor]);
    // handle color change end

    // handle style change start
    useEffect(() => {
        const updatedFooterData = { ...footerData }

        updatedFooterData['title_1']['font_weight_bold'] = activeFooterBoldBtn;
        updatedFooterData['title_2']['font_weight_bold'] = activeFooterTitleTwoBoldBtn;

        setFooterData(updatedFooterData);
    }, [activeFooterBoldBtn, activeFooterTitleTwoBoldBtn]);

    useEffect(() => {
        const updatedFooterData = { ...footerData }

        updatedFooterData['title_1']['font_style_italic'] = activeFooterItalicBtn;
        updatedFooterData['title_2']['font_style_italic'] = activeFooterTitleTwoItalicBtn;

        setFooterData(updatedFooterData);
    }, [activeFooterItalicBtn, activeFooterTitleTwoItalicBtn]);

    useEffect(() => {
        const updatedFooterData = { ...footerData }

        updatedFooterData['title_1']['text_decoration_underline'] = activeFooterUlBtn;
        updatedFooterData['title_2']['text_decoration_underline'] = activeFooterTitleTwoUlBtn;

        setFooterData(updatedFooterData);
    }, [activeFooterUlBtn, activeFooterTitleTwoUlBtn]);

    useEffect(() => {
        const updatedFooterData = { ...footerData }

        updatedFooterData['title_1']['text_decoration_linethrough'] = activeFooterLtBtn;
        updatedFooterData['title_2']['text_decoration_linethrough'] = activeFooterTitleTwoLtBtn;

        setFooterData(updatedFooterData);
    }, [activeFooterLtBtn, activeFooterTitleTwoLtBtn]);

    useEffect(() => {
        const updatedFooterData = { ...footerData }

        updatedFooterData['title_1']['text_align'] = activeFooterAlignmentBtn;
        updatedFooterData['title_2']['text_align'] = activeFooterTitleTwoAlignment;

        setFooterData(updatedFooterData);
    }, [activeFooterAlignmentBtn, activeFooterTitleTwoAlignment]);
    // handle style change end

    // handle footer data change start
    const handleFooterDataChange = (type, name, value) => {
        const updatedFooterData = { ...footerData }

        updatedFooterData[type][name] = value;

        setFooterData(updatedFooterData);
    }
    // handle footer data change end

    //handle header color
    const handleFooterColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setfooterColor(colorValue)
    };

    //handle School title color
    const handleFooterTitleColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setfooterTitleColor(colorValue)
    };

    //handle title two color
    const handleFooterTitleTwoColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setfooterTitleTwoColor(colorValue)
    };

    //handle school style btn start
    const handleFooterBoldBtn = () => {
        setactiveFooterBoldBtn(!activeFooterBoldBtn);
    }
    const handleFooterItalicBtn = () => {
        setactiveFooterItalicBtn(!activeFooterItalicBtn);
    }
    const handleFooterUlBtn = () => {
        setactiveFooterUlBtn(!activeFooterUlBtn);
    }

    const handleFooterLtBtn = () => {
        setactiveFooterLtBtn(!activeFooterLtBtn);
    }
    //handle school style btn end

    //handle title two style btn start
    const handleFooterTitleTwoBoldBtn = () => {
        setactiveFooterTitleTwoBoldBtn(!activeFooterTitleTwoBoldBtn);
    }
    const handleFooterTitleTwoItalicBtn = () => {
        setactiveFooterTitleTwoItalicBtn(!activeFooterTitleTwoItalicBtn);
    }
    const handleFooterTitleTwoUlBtn = () => {
        setactiveFooterTitleTwoUlBtn(!activeFooterTitleTwoUlBtn);
    }

    const handleFooterTitleTwoLtBtn = () => {
        setactiveFooterTitleTwoLtBtn(!activeFooterTitleTwoLtBtn);
    }
    //handle title two style btn end

    //handle school toggle button
    const handleFooterAlignmentToggle = (align) => {
        setactiveFooterAlignmentBtn(align);
    }

    //handle title two toggle button
    const handleFooterTitleTwoAlignment = (align) => {
        setactiveFooterTitleTwoAlignment(align);
    }

    //popup
    const handleFooterCardBgPopupClick = () => {
        setFooterCardBgPopup(!footerCardBgPopup);
    };

    //popup
    const [footerSigCardBgPopup, setFooterSigCardBgPopup] = useState(false);
    const handleFooterSigCardBgPopupClick = () => {
        setFooterSigCardBgPopup(!footerSigCardBgPopup);
    };

    return (
        <>
            <div className="headerTwo custom-id-header pt-5">
                <h3 className="header-title">Footer</h3>
                <div className="custom-id-header-wrapper">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Background</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="footer_background_image"
                                        type="file"
                                        name="footer_background_image"
                                        onChange={(e) =>
                                            setData(
                                                "footer_background_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                {/* <small>select size(500X70)px</small> */}
                            </div>
                        </div>
                        <div className="file-button">
                            {/* <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleUploadBackgroundImage(e, 'footer_background_image')
                                }}
                            >
                                <i className="icon-upload"></i> Upload
                            </PrimaryButton> */}
                            {/* <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-warning-btn-md-fill"
                                    onClick={handleFooterCardBgPopupClick}
                                >
                                    <i className="icon-FolderNotchOpen"></i>
                                </button>
                            </div> */}
                            <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-danger-btn-md-fill"
                                    onClick={(e) => {
                                        handleDeleteBackgroundImage(e, 'footer_background_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-color-picker">
                        <p className='header-label'>Background</p>
                        <ColorPicker className='color-picker' value={footerColor} onChange={(e) => handleFooterColorChange(e.value)} />
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
                                        value={footerColor}
                                        onChange={(e) => handleFooterColorChange(e.target.value)}
                                        className="block"
                                        placeHolder='#FFF000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                footerData?.title_1?.title
                            }
                            onChange={(e) =>
                                handleFooterDataChange('title_1', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Text here...'
                        />
                        {/* <InputError
                            message={
                                errors.footer_title
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
                                footerData?.title_1?.font_size
                            }
                            onChange={(e) =>
                                handleFooterDataChange('title_1', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.footer_title_font_size
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
                                    onClick={handleFooterBoldBtn}
                                    className={`style-btn ${footerData?.title_1?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleFooterItalicBtn}
                                    className={`style-btn ${footerData?.title_1?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleFooterUlBtn}
                                    className={`style-btn ${footerData?.title_1?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${footerData?.title_1?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleFooterLtBtn}
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
                                    onClick={() => handleFooterAlignmentToggle('center')}
                                    className={`style-btn ${footerData?.title_1?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleFooterAlignmentToggle('left')}
                                    className={`style-btn ${footerData?.title_1?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleFooterAlignmentToggle('right')}
                                    className={`style-btn ${footerData?.title_1?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${footerData?.title_1?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleFooterAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={footerTitleColor} onChange={(e) => handleFooterTitleColorChange(e.value)} />
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
                                            value={footerTitleColor}
                                            onChange={(e) => handleFooterTitleColorChange(e.target.value)}
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
                                footerData?.title_2?.title
                            }
                            onChange={(e) =>
                                handleFooterDataChange('title_2', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Text here...'
                        />
                        {/* <InputError
                            message={
                                errors.footer_title_two_text_area
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
                                footerData?.title_2?.title
                            }
                            onChange={(e) =>
                                handleFooterDataChange('title_2', 'title', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.footer_title_two_font_size
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
                                    onClick={handleFooterTitleTwoBoldBtn}
                                    className={`style-btn ${footerData?.title_2?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleFooterTitleTwoItalicBtn}
                                    className={`style-btn ${footerData?.title_2?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleFooterTitleTwoUlBtn}
                                    className={`style-btn ${footerData?.title_2?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${footerData?.title_2?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleFooterTitleTwoLtBtn}
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
                                    onClick={() => handleFooterTitleTwoAlignment('center')}
                                    className={`style-btn ${footerData?.title_2?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleFooterTitleTwoAlignment('left')}
                                    className={`style-btn ${footerData?.title_2?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleFooterTitleTwoAlignment('right')}
                                    className={`style-btn ${footerData?.title_2?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${footerData?.title_2?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleFooterTitleTwoAlignment('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={footerTitleTwoColor} onChange={(e) => handleFooterTitleTwoColorChange(e.value)} />
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
                                            value={footerTitleTwoColor}
                                            onChange={(e) => handleFooterTitleTwoColorChange(e.target.value)}
                                            className="block"
                                            placeHolder='#FFF000'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-id-header-wrapper pt-7">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Signature</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="footer_signature_image"
                                        type="file"
                                        name="footer_signature_image"
                                        onChange={(e) =>
                                            setData(
                                                "footer_signature_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                {/* <small>select size(60X60)px</small> */}
                            </div>
                        </div>
                        <div className="file-button">
                            {/* <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleUploadBackgroundImage(e, 'footer_signature_image')
                                }}
                            >
                                <i className="icon-upload"></i> Upload
                            </PrimaryButton> */}
                            {/* <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-warning-btn-md-fill"
                                    onClick={handleFooterSigCardBgPopupClick}
                                >
                                    <i className="icon-FolderNotchOpen"></i>
                                </button>
                            </div> */}
                            <div className='educare-filter-action-btn'>
                                <button
                                    type='button'
                                    className="educare-danger-btn-md-fill"
                                    onClick={(e) => {
                                        handleDeleteBackgroundImage(e, 'footer_signature_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterBgCardPopup
                footerCardBgPopup={footerCardBgPopup}
                setFooterCardBgPopup={setFooterCardBgPopup}
            />
            <FooterSignatureBgCardPopup
                footerSigCardBgPopup={footerSigCardBgPopup}
                setFooterSigCardBgPopup={setFooterSigCardBgPopup}
            />
        </>
    );
};

export default CustomFromFooter;

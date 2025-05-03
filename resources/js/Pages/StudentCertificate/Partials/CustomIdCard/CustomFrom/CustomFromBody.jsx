import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import { ColorPicker } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import BodyCardBackgroundPopup from './CardBackgroundPopup/BodyCardBackgroundPopup';

const CustomFromBody = ({
    bodyData,
    setBodyData,
    data,
    setData,
    handleUploadBackgroundImage,
    fontSizeArray,
    handleDeleteBackgroundImage
}) => {
    const [bodyLabelColor, setbodyLabelColor] = useState(bodyData?.body_label?.color ?? "");
    const [bodyValueColor, setbodyValueColor] = useState(bodyData?.body_value?.color ?? "");
    const [bodyColor, setbodyColor] = useState(bodyData?.background_color ?? "");
    const [activeBodyLabelBoldBtn, setactiveBodyLabelBoldBtn] = useState(false);
    const [activeBodyLabelItalicBtn, setactiveBodyLabelItalicBtn] = useState(false);
    const [activeBodyLabelUlBtn, setactiveBodyLabelUlBtn] = useState(false);
    const [activeBodyLabelLtBtn, setactiveBodyLabelLtBtn] = useState(false);
    const [activeBodyValueBoldBtn, setactiveBodyValueBoldBtn] = useState(false);
    const [activeBodyValueItalicBtn, setactiveBodyValueItalicBtn] = useState(false);
    const [activeBodyValueUlBtn, setactiveBodyValueUlBtn] = useState(false);
    const [activeBodyValueLtBtn, setactiveBodyValueLtBtn] = useState(false);
    const [activeBodyLableAlignment, setactiveBodyLableAlignment] = useState("");
    const [activeBodyValueAlignmentBtn, setactiveBodyValueAlignmentBtn] = useState("");

    // handle color change start
    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        if (bodyColor) {
            updatedBodyData['background_color'] = bodyColor;
        }

        if (bodyLabelColor) {
            updatedBodyData['body_label']['color'] = bodyLabelColor;
        }

        if (bodyValueColor) {
            updatedBodyData['body_value']['color'] = bodyValueColor;
        }

        setBodyData(updatedBodyData);
    }, [bodyColor, bodyValueColor, bodyLabelColor]);
    // handle color change end

    // handle style change start
    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData['body_label']['font_weight_bold'] = activeBodyLabelBoldBtn;
        updatedBodyData['body_value']['font_weight_bold'] = activeBodyValueBoldBtn;

        setBodyData(updatedBodyData);
    }, [activeBodyLabelBoldBtn, activeBodyValueBoldBtn]);

    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData['body_label']['font_style_italic'] = activeBodyLabelItalicBtn;
        updatedBodyData['body_value']['font_style_italic'] = activeBodyValueItalicBtn;

        setBodyData(updatedBodyData);
    }, [activeBodyLabelItalicBtn, activeBodyValueItalicBtn]);

    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData['body_label']['text_decoration_underline'] = activeBodyLabelUlBtn;
        updatedBodyData['body_value']['text_decoration_underline'] = activeBodyValueUlBtn;

        setBodyData(updatedBodyData);
    }, [activeBodyLabelUlBtn, activeBodyValueUlBtn]);

    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData['body_label']['text_decoration_linethrough'] = activeBodyLabelLtBtn;
        updatedBodyData['body_value']['text_decoration_linethrough'] = activeBodyValueLtBtn;

        setBodyData(updatedBodyData);
    }, [activeBodyLabelLtBtn, activeBodyValueLtBtn]);

    useEffect(() => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData['body_label']['text_align'] = activeBodyLableAlignment;
        updatedBodyData['body_value']['text_align'] = activeBodyValueAlignmentBtn;

        setBodyData(updatedBodyData);
    }, [activeBodyLableAlignment, activeBodyValueAlignmentBtn]);
    // handle style change end

    // handle header data change start
    const handleBodyDataChange = (type, name, value) => {
        const updatedBodyData = { ...bodyData }

        updatedBodyData[type][name] = value;

        setBodyData(updatedBodyData);
    }
    // handle header data change end


    //handle header color
    const handleBodyColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setbodyColor(colorValue)
    };


    //handle body label color
    const handleBodyLabelColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setbodyLabelColor(colorValue)
    };
    //handle body value color
    const handleBodyValueColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setbodyValueColor(colorValue)
    };


    //handle body label style btn start
    const handleBodyLabelBoldBtn = () => {
        setactiveBodyLabelBoldBtn(!activeBodyLabelBoldBtn);
    }
    const handleBodyLabelItalicBtn = () => {
        setactiveBodyLabelItalicBtn(!activeBodyLabelItalicBtn);
    }
    const handleBodyLabelUlBtn = () => {
        setactiveBodyLabelUlBtn(!activeBodyLabelUlBtn);
    }

    const handleBodyLabelLtBtn = () => {
        setactiveBodyLabelLtBtn(!activeBodyLabelLtBtn);
    }
    //handle body label style btn end

    //handle body value style btn start
    const handleBodyValueBoldBtn = () => {
        setactiveBodyValueBoldBtn(!activeBodyValueBoldBtn);
    }
    const handleBodyValueItalicBtn = () => {
        setactiveBodyValueItalicBtn(!activeBodyValueItalicBtn);
    }
    const handleBodyValueUlBtn = () => {
        setactiveBodyValueUlBtn(!activeBodyValueUlBtn);
    }

    const handleBodyValueLtBtn = () => {
        setactiveBodyValueLtBtn(!activeBodyValueLtBtn);
    }
    //handle body value style btn end

    //handle body label toggle button
    const handleBodyLabelAlignmentToggle = (align) => {
        setactiveBodyLableAlignment(align);
    }

    //handle body value toggle button
    const handleBodyValueAlignmentToggle = (align) => {
        setactiveBodyValueAlignmentBtn(align);
    }

     //popup
     const [cardBgPopup, setCardBgPopup] = useState(false);
     const handleCardBgPopupClick = () => {
         setCardBgPopup(!cardBgPopup);
     };

    return (
        <>
            <div className="headerTwo custom-id-header pt-5">
                <h3 className="header-title">Body</h3>
                <div className="custom-id-header-wrapper">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Background</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="body_background_image"
                                        type="file"
                                        name="body_background_image"
                                        onChange={(e) =>
                                            setData(
                                                "body_background_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                {/* <small>select size(500X250)px</small> */}
                            </div>
                        </div>
                        <div className="file-button">
                            {/* <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleUploadBackgroundImage(e, 'body_background_image')
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
                                        handleDeleteBackgroundImage(e, 'body_background_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-color-picker">
                        <p className='header-label'>Background</p>
                        <ColorPicker className='color-picker' value={bodyColor} onChange={(e) => handleBodyColorChange(e.value)} />
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
                                        value={bodyColor}
                                        onChange={(e) => handleBodyColorChange(e.target.value)}
                                        className="block"
                                        placeHolder='#FFF000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Body label</h5>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                bodyData?.body_label?.font_size
                            }
                            onChange={(e) =>
                                handleBodyDataChange('body_label', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.body_label_font_size
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
                                    onClick={handleBodyLabelBoldBtn}
                                    className={`style-btn ${bodyData?.body_label?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleBodyLabelItalicBtn}
                                    className={`style-btn ${bodyData?.body_label?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleBodyLabelUlBtn}
                                    className={`style-btn ${bodyData?.body_label?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${bodyData?.body_label?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleBodyLabelLtBtn}
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
                                    onClick={() => handleBodyLabelAlignmentToggle('center')}
                                    className={`style-btn ${bodyData?.body_label?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleBodyLabelAlignmentToggle('left')}
                                    className={`style-btn ${bodyData?.body_label?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleBodyLabelAlignmentToggle('right')}
                                    className={`style-btn ${bodyData?.body_label?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${bodyData?.body_label?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleBodyLabelAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={bodyLabelColor} onChange={(e) => handleBodyLabelColorChange(e.value)} />
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
                                            value={bodyLabelColor}
                                            onChange={(e) => handleBodyLabelColorChange(e.target.value)}
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
                    <h5 className='header-title'>Body Value</h5>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                bodyData?.body_value?.font_size
                            }
                            onChange={(e) =>
                                handleBodyDataChange('body_value', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.body_value_font_size
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
                                    onClick={handleBodyValueBoldBtn}
                                    className={`style-btn ${bodyData?.body_value?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleBodyValueItalicBtn}
                                    className={`style-btn ${bodyData?.body_value?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={handleBodyValueUlBtn}
                                    className={`style-btn ${bodyData?.body_value?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${bodyData?.body_value?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={handleBodyValueLtBtn}
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
                                    onClick={() => handleBodyValueAlignmentToggle('center')}
                                    className={`style-btn ${bodyData?.body_value?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleBodyValueAlignmentToggle('left')}
                                    className={`style-btn ${bodyData?.body_value?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => handleBodyValueAlignmentToggle('right')}
                                    className={`style-btn ${bodyData?.body_value?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${bodyData?.body_value?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => handleBodyValueAlignmentToggle('justify')}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="school-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={bodyValueColor} onChange={(e) => handleBodyValueColorChange(e.value)} />
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
                                            value={bodyValueColor}
                                            onChange={(e) => handleBodyValueColorChange(e.target.value)}
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
            <BodyCardBackgroundPopup
                cardBgPopup={cardBgPopup}
                setCardBgPopup={setCardBgPopup}
            />
        </>
    );
};

export default CustomFromBody;

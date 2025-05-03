import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Tooltip } from '@mui/material';
import { ColorPicker } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import HeaderCardBackgroundPopup from './CardBackgroundPopup/HeaderCardBackgroundPopup';

const CustomFromBackPage = ({
    backpageData,
    setBackpageData,
    data,
    setData,
    handleUploadBackgroundImage,
    fontSizeArray,
    handleDeleteBackgroundImage
}) => {
    const [titleOneColor, setTitleOneTitleColor] = useState(backpageData?.title_1?.color ?? "");
    const [titleTwoColor, setTitleTwoColor] = useState(backpageData?.title_2?.color ?? "");
    const [bodyLabelColor, setBodyLabelColor] = useState(backpageData?.body_label?.color ?? "");
    const [bodyValueColor, setBodyValueColor] = useState(backpageData?.body_value?.color ?? "");
    const [titleThreeColor, setTitleThreeColor] = useState(backpageData?.title_3?.color ?? "");
    const [titleFourColor, setTitleFourColor] = useState(backpageData?.title_4?.color ?? "");
    const [backpageColor, setBackpageColor] = useState(backpageData?.background_color ?? "");
    const [activeTitleOneBoldBtn, setActiveTitleOneBoldBtn] = useState(false);
    const [activeTitleOneItalicBtn, setActiveTitleOneItalicBtn] = useState(false);
    const [activeTitleOneUlBtn, setActiveTitleOneUlBtn] = useState(false);
    const [activeTitleOneLtBtn, setActiveTitleOneLtBtn] = useState(false);
    const [activeTitleTwoBoldBtn, setActiveTitleTwoBoldBtn] = useState(false);
    const [activeTitleTwoItalicBtn, setActiveTitleTwoItalicBtn] = useState(false);
    const [activeTitleTwoUlBtn, setActiveTitleTwoUlBtn] = useState(false);
    const [activeTitleTwoLtBtn, setActiveTitleTwoLtBtn] = useState(false);
    const [activeBodyLabelBoldBtn, setActiveBodyLabelBoldBtn] = useState(false);
    const [activeBodyLabelItalicBtn, setActiveBodyLabelItalicBtn] = useState(false);
    const [activeBodyLabelUlBtn, setActiveBodyLabelUlBtn] = useState(false);
    const [activeBodyLabelLtBtn, setActiveBodyLabelLtBtn] = useState(false);
    const [activeBodyValueBoldBtn, setActiveBodyValueBoldBtn] = useState(false);
    const [activeBodyValueItalicBtn, setActiveBodyValueItalicBtn] = useState(false);
    const [activeBodyValueUlBtn, setActiveBodyValueUlBtn] = useState(false);
    const [activeBodyValueLtBtn, setActiveBodyValueLtBtn] = useState(false);
    const [activeTitleThreeBoldBtn, setActiveTitleThreeBoldBtn] = useState(false);
    const [activeTitleThreeItalicBtn, setActiveTitleThreeItalicBtn] = useState(false);
    const [activeTitleThreeUlBtn, setActiveTitleThreeUlBtn] = useState(false);
    const [activeTitleThreeLtBtn, setActiveTitleThreeLtBtn] = useState(false);
    const [activeTitleFourBoldBtn, setActiveTitleFourBoldBtn] = useState(false);
    const [activeTitleFourItalicBtn, setActiveTitleFourItalicBtn] = useState(false);
    const [activeTitleFourUlBtn, setActiveTitleFourUlBtn] = useState(false);
    const [activeTitleFourLtBtn, setActiveTitleFourLtBtn] = useState(false);
    const [activeTitleOneAlignmentBtn, setActiveTitleOneAlignmentBtn] = useState("");
    const [activeTitleTwoAlignmentBtn, setActiveTitleTwoAlignmentBtn] = useState("");
    const [activeBodyLabelAlignmentBtn, setActiveBodyLabelAlignmentBtn] = useState("");
    const [activeBodyValueAlignmentBtn, setActiveBodyValueAlignmentBtn] = useState("");
    const [activeTitleThreeAlignmentBtn, setActiveTitleThreeAlignmentBtn] = useState("");
    const [activeTitleFourAlignmentBtn, setActiveTitleFourAlignmentBtn] = useState("");

    // handle color change start
    useEffect(() => {
        const updatedBackpageData = { ...backpageData }

        if (backpageColor) {
            updatedBackpageData['background_color'] = backpageColor;
        }

        if (titleOneColor) {
            updatedBackpageData['title_1']['color'] = titleOneColor;
        }

        if (titleTwoColor) {
            updatedBackpageData['title_2']['color'] = titleTwoColor;
        }

        if (bodyLabelColor) {
            updatedBackpageData['body_label']['color'] = bodyLabelColor;
        }

        if (bodyValueColor) {
            updatedBackpageData['body_value']['color'] = bodyValueColor;
        }

        if (titleThreeColor) {
            updatedBackpageData['title_3']['color'] = titleThreeColor;
        }

        if (titleFourColor) {
            updatedBackpageData['title_4']['color'] = titleFourColor;
        }

        setBackpageData(updatedBackpageData);
    }, [backpageColor, titleOneColor, titleTwoColor, bodyLabelColor, bodyValueColor, titleThreeColor, titleFourColor]);
    // handle color change end

    // handle backpage data change start
    const handleBackpageDataChange = (type, name, value) => {
        const updatedBackpageData = { ...backpageData }

        updatedBackpageData[type][name] = value;

        setBackpageData(updatedBackpageData);
    }
    // handle backpage data change end

    //handle header color
    const handleBackpageColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setBackpageColor(colorValue)
    };

    //handle TitleOne title color
    const handletitleOneColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleOneTitleColor(colorValue)
    };

    //handle title two color
    const handleTitleTwoColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleTwoColor(colorValue)
    };
    //handle body label color
    const handleBodyLabelColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setBodyLabelColor(colorValue)
    };
    //handle body value color
    const handleBodyValueColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setBodyValueColor(colorValue)
    };

    //handle title three color
    const handleTitleThreeColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleThreeColor(colorValue)
    };
    //handle title four color
    const handleTitleFourColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTitleFourColor(colorValue)
    };

    //handle TitleOne style btn start
    const handleStyleTitleOneBoldBtn = () => {
        setActiveTitleOneBoldBtn(!activeTitleOneBoldBtn);
    }
    const handleStyleTitleOneItalicBtn = () => {
        setActiveTitleOneItalicBtn(!activeTitleOneItalicBtn);
    }
    const handleStyleTitleOneUlBtn = () => {
        setActiveTitleOneUlBtn(!activeTitleOneUlBtn);
    }

    const handleStyleTitleOneLtBtn = () => {
        setActiveTitleOneLtBtn(!activeTitleOneLtBtn);
    }
    //handle TitleOne style btn end

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

    //handle body label style btn start
    const handleStyleBodyLabelBoldBtn = () => {
        setActiveBodyLabelBoldBtn(!activeBodyLabelBoldBtn);
    }

    const handleStyleBodyLabelItalicBtn = () => {
        setActiveBodyLabelItalicBtn(!activeBodyLabelItalicBtn);
    }

    const handleStyleBodyLabelUlBtn = () => {
        setActiveBodyLabelUlBtn(!activeBodyLabelUlBtn);
    }

    const handleStyleBodyLabelLtBtn = () => {
        setActiveBodyLabelLtBtn(!activeBodyLabelLtBtn);
    }
    //handle body label style btn end

    //handle body Value style btn start
    const handleStyleBodyValueBoldBtn = () => {
        setActiveBodyValueBoldBtn(!activeBodyValueBoldBtn);
    }

    const handleStyleBodyValueItalicBtn = () => {
        setActiveBodyValueItalicBtn(!activeBodyValueItalicBtn);
    }

    const handleStyleBodyValueUlBtn = () => {
        setActiveBodyValueUlBtn(!activeBodyValueUlBtn);
    }

    const handleStyleBodyValueLtBtn = () => {
        setActiveBodyValueLtBtn(!activeBodyValueLtBtn);
    }
    //handle body Value style btn end

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

    //handle title four style btn start
    const handleStyleFourThreeBoldBtn = () => {
        setActiveTitleFourBoldBtn(!activeTitleFourBoldBtn);
    }
    const handleStyleTitleFourItalicBtn = () => {
        setActiveTitleFourItalicBtn(!activeTitleFourItalicBtn);
    }
    const handleStyleTitleFourUlBtn = () => {
        setActiveTitleFourUlBtn(!activeTitleFourUlBtn);
    }

    const handleStyleTitleFourLtBtn = () => {
        setActiveTitleFourLtBtn(!activeTitleFourLtBtn);
    }
    //handle title three style btn end

    //handle TitleOne toggle button
    const handleTitleOneAlignmentToggle = (align) => {
        setActiveTitleOneAlignmentBtn(align);
    }

    //handle title two toggle button
    const handleTitleTwoAlignmentToggle = (align) => {
        setActiveTitleTwoAlignmentBtn(align);
    }

    //handle Body label toggle button
    const handleBodyLabelAlignmentToggle = (align) => {
        setActiveBodyLabelAlignmentBtn(align);
        //handle Body value toggle button
    }

    const handleBodyValueAlignmentToggle = (align) => {
        setActiveBodyValueAlignmentBtn(align);
    }

    //handle title three toggle button
    const handleTitleThreeAlignmentToggle = (align) => {
        setActiveTitleThreeAlignmentBtn(align);
    }

    //handle title four toggle button
    const handleTitleFourAlignmentToggle = (align) => {
        setActiveTitleFourAlignmentBtn(align);
    }

    //popup
    const [cardBgPopup, setCardBgPopup] = useState(false);
    const handleCardBgPopupClick = () => {
        setCardBgPopup(!cardBgPopup);
    };

    return (
        <>
            <div className="headerTwo custom-id-header pt-5">
                <h3 className="header-title">Back Page</h3>
                <div className="custom-id-header-wrapper">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Background</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="backpage_background_image"
                                        type="file"
                                        name="backpage_background_image"
                                        onChange={(e) =>
                                            setData(
                                                "backpage_background_image",
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
                                    handleUploadBackgroundImage(e, 'backpage_background_image')
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
                                        handleDeleteBackgroundImage(e, 'backpage_background_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-color-picker">
                        <p className='header-label'>Background</p>
                        <ColorPicker className='color-picker' value={backpageColor} onChange={(e) => handleBackpageColorChange(e.value)} />
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
                                        value={backpageColor}
                                        onChange={(e) => handleBackpageColorChange(e.target.value)}
                                        className="block"
                                        placeHolder='#FFF000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title 1</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                backpageData?.title_1?.title
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_1', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Importent Instruction'
                        />
                        {/* <InputError
                            message={
                                errors.title_one
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
                                backpageData?.title_1?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_1', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.title_one_font_size
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
                                    onClick={(e) => {
                                        handleStyleTitleOneBoldBtn()
                                        handleBackpageDataChange('title_1', 'font_weight_bold', backpageData['title_1']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                     onClick={(e) => {
                                         handleStyleTitleOneItalicBtn()
                                        handleBackpageDataChange('title_1', 'font_style_italic', backpageData['title_1']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                     onClick={(e) => {
                                         handleStyleTitleOneUlBtn()
                                        handleBackpageDataChange('title_1', 'text_decoration_underline', backpageData['title_1']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.title_1?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                     onClick={(e) => {
                                         handleStyleTitleOneLtBtn()
                                        handleBackpageDataChange('title_1', 'text_decoration_linethrough', backpageData['title_1']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleTitleOneAlignmentToggle('center')
                                        handleBackpageDataChange('title_1', 'text_align', 'center');
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleOneAlignmentToggle('left')
                                        handleBackpageDataChange('title_1', 'text_align', 'left');
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleOneAlignmentToggle('right')
                                        handleBackpageDataChange('title_1', 'text_align', 'right');
                                    }}
                                    className={`style-btn ${backpageData?.title_1?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.title_1?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleTitleOneAlignmentToggle('justify')
                                        handleBackpageDataChange('title_1', 'text_align', 'justify');
                                    }}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={titleOneColor} onChange={(e) => handletitleOneColorChange(e.value)} />
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
                                            value={titleOneColor}
                                            onChange={(e) => handletitleOneColorChange(e.target.value)}
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
                                backpageData?.title_2?.title
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_2', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='For safety purpose'
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
                                backpageData?.title_2?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_2', 'font_size', e.target.value)
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
                                    onClick={() => {
                                        handleStyleTitleTwoBoldBtn()
                                        handleBackpageDataChange('title_2', 'font_weight_bold', backpageData['title_2']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleTwoItalicBtn()
                                        handleBackpageDataChange('title_2', 'font_style_italic', backpageData['title_2']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleTwoUlBtn()
                                        handleBackpageDataChange('title_2', 'text_decoration_underline', backpageData['title_2']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.title_2?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleStyleTitleTwoLtBtn()
                                        handleBackpageDataChange('title_2', 'text_decoration_linethrough', backpageData['title_2']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleTitleTwoAlignmentToggle('center')
                                        handleBackpageDataChange('title_2', 'text_align', 'center')
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleTwoAlignmentToggle('left')
                                        handleBackpageDataChange('title_2', 'text_align', 'left')
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleTwoAlignmentToggle('right')
                                        handleBackpageDataChange('title_2', 'text_align', 'right')
                                    }}
                                    className={`style-btn ${backpageData?.title_2?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.title_2?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleTitleTwoAlignmentToggle('justify')
                                        handleBackpageDataChange('title_2', 'text_align', 'justify')
                                    }}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
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
                    <h5 className='header-title'>Body label</h5>
                    <div className="educare-input-field-styles">
                        <InputLabel
                            value="Font Size (px)"
                        />
                        <SelectInput
                            data_label="Size"
                            data={fontSizeArray}
                            value={
                                backpageData?.body_label?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('body_label', 'font_size', e.target.value)
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
                                    onClick={() => {
                                        handleStyleBodyLabelBoldBtn()
                                        handleBackpageDataChange('body_label', 'font_weight_bold', backpageData['body_label']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleBodyLabelItalicBtn()
                                        handleBackpageDataChange('body_label', 'font_style_italic', backpageData['body_label']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleBodyLabelUlBtn()
                                        handleBackpageDataChange('body_label', 'text_decoration_underline', backpageData['body_label']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.body_label?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleStyleBodyLabelLtBtn()
                                        handleBackpageDataChange('body_label', 'text_decoration_linethrough', backpageData['body_label']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleBodyLabelAlignmentToggle('center')
                                        handleBackpageDataChange('body_label', 'text_align', 'center')
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleBodyLabelAlignmentToggle('left')
                                        handleBackpageDataChange('body_label', 'text_align', 'left')
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleBodyLabelAlignmentToggle('right')
                                        handleBackpageDataChange('body_label', 'text_align', 'right')
                                    }}
                                    className={`style-btn ${backpageData?.body_label?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.body_label?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleBodyLabelAlignmentToggle('justify')
                                        handleBackpageDataChange('body_label', 'text_align', 'justify')
                                    }}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
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
                                backpageData?.body_value?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('body_value', 'font_size', e.target.value)
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
                                    onClick={() => {
                                        handleStyleBodyValueBoldBtn()
                                        handleBackpageDataChange('body_value', 'font_weight_bold', backpageData['body_value']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleBodyValueItalicBtn();
                                        handleBackpageDataChange('body_value', 'font_style_italic', backpageData['body_value']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleBodyValueUlBtn();
                                        handleBackpageDataChange('body_value', 'text_decoration_underline', backpageData['body_value']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.body_value?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleStyleBodyValueLtBtn();
                                        handleBackpageDataChange('body_value', 'text_decoration_linethrough', backpageData['body_value']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleBodyValueAlignmentToggle('center')
                                        handleBackpageDataChange('body_value', 'text_align', 'center')
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleBodyValueAlignmentToggle('left')
                                        handleBackpageDataChange('body_value', 'text_align', 'left')
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleBodyValueAlignmentToggle('right')
                                        handleBackpageDataChange('body_value', 'text_align', 'right')
                                    }}
                                    className={`style-btn ${backpageData?.body_value?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.body_value?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleBodyValueAlignmentToggle('justify')
                                        handleBackpageDataChange('body_value', 'text_align', 'justify')
                                    }}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
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
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title 3</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                backpageData?.title_3?.title
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_3', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Note:'
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
                                backpageData?.title_3?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_3', 'font_size', e.target.value)
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
                                    onClick={() => {
                                        handleStyleTitleThreeBoldBtn()
                                        handleBackpageDataChange('title_3', 'font_weight_bold', backpageData['title_3']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_3?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleThreeItalicBtn()
                                        handleBackpageDataChange('title_3', 'font_style_italic', backpageData['title_3']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_3?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleThreeUlBtn()
                                        handleBackpageDataChange('title_3', 'text_decoration_underline', backpageData['title_3']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_3?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.title_3?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleStyleTitleThreeLtBtn();
                                        handleBackpageDataChange('title_3', 'text_decoration_linethrough', backpageData['title_3']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleTitleThreeAlignmentToggle('center')
                                        handleBackpageDataChange('title_3', 'text_align', 'center')
                                    }
                                    }
                                    className={`style-btn ${backpageData?.title_3?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleThreeAlignmentToggle('left')
                                        handleBackpageDataChange('title_3', 'text_align', 'left')
                                    }
                                    }
                                    className={`style-btn ${backpageData?.title_3?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleThreeAlignmentToggle('right')
                                        handleBackpageDataChange('title_3', 'text_align', 'right')
                                    }
                                    }
                                    className={`style-btn ${backpageData?.title_3?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.title_3?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleTitleThreeAlignmentToggle('justify')
                                        handleBackpageDataChange('title_3', 'text_align', 'justify')
                                    }
                                    }
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
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
                <div className="header-title-wrapper">
                    <h5 className='header-title'>Title 4</h5>
                    <div className="educare-input-field-styles max-w-[300px]">
                        <InputLabel
                            value="Text Area"
                        />
                        <TextInput
                            value={
                                backpageData?.title_4?.title
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_4', 'title', e.target.value)
                            }
                            className="block"
                            placeHolder='Please keep this ID safely'
                        />
                        {/* <InputError
                            message={
                                errors.title_four_text_area
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
                                backpageData?.title_4?.font_size
                            }
                            onChange={(e) =>
                                handleBackpageDataChange('title_4', 'font_size', e.target.value)
                            }
                            className="block"
                        />
                        {/* <InputError
                            message={
                                errors.title_four_text_area
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
                                    onClick={() => {
                                        handleStyleFourThreeBoldBtn()
                                        handleBackpageDataChange('title_4', 'font_weight_bold', backpageData['title_4']['font_weight_bold'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.font_weight_bold ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleFourItalicBtn()
                                        handleBackpageDataChange('title_4', 'font_style_italic', backpageData['title_4']['font_style_italic'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.font_style_italic ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    onClick={() => {
                                        handleStyleTitleFourUlBtn()
                                        handleBackpageDataChange('title_4', 'text_decoration_underline', backpageData['title_4']['text_decoration_underline'] == false ? true : false)
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.text_decoration_underline ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
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
                                    className={`style-btn ${backpageData?.title_4?.text_decoration_linethrough ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleStyleTitleFourLtBtn()
                                        handleBackpageDataChange('title_4', 'text_decoration_linethrough', backpageData['title_4']['text_decoration_linethrough'] == false ? true : false)
                                    }}
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
                                    onClick={() => {
                                        handleTitleFourAlignmentToggle('center')
                                        handleBackpageDataChange('title_4', 'text_align', 'center')
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.text_align === 'center' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignCenter'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleFourAlignmentToggle('left')
                                        handleBackpageDataChange('title_4', 'text_align', 'left')
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.text_align === 'left' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignLeft'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        handleTitleFourAlignmentToggle('right')
                                        handleBackpageDataChange('title_4', 'text_align', 'right')
                                    }}
                                    className={`style-btn ${backpageData?.title_4?.text_align === 'right' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                >
                                    <i className='icon-TextAlignRight'></i>
                                </button>
                            </div>

                            <div>
                                <button
                                    className={`style-btn ${backpageData?.title_4?.text_align === 'justify' ? 'bg-supportingA/70' : 'bg-supportingA/30'}`}
                                    onClick={() => {
                                        handleTitleFourAlignmentToggle('justify')
                                        handleBackpageDataChange('title_4', 'text_align', 'justify')
                                    }}
                                >
                                    <i className='icon-TextAlignJustify'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="TitleOne-title-color">
                        <p className='header-label pb-1'>Color</p>
                        <div className="header-color-picker">
                            <ColorPicker className='color-picker' value={titleFourColor} onChange={(e) => handleTitleFourColorChange(e.value)} />
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
                                            value={titleFourColor}
                                            onChange={(e) => handleTitleFourColorChange(e.target.value)}
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

export default CustomFromBackPage;

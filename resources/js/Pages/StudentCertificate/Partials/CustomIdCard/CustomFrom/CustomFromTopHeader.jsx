import TextInput from '@/Components/TextInput';
import { ColorPicker } from 'primereact/colorpicker';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TopCardBackgroundPopup from './CardBackgroundPopup/TopCardBackgroundPopup';

const CustomFromTopHeader = ({
    data,
    setData,
    handleUploadBackgroundImage,
    handleDeleteBackgroundImage
}) => {
    const [topHeaderColor, setTopHeaderColor] = useState(data?.background_color ?? "");

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            background_color: topHeaderColor
        }));
    }, [topHeaderColor]);

    //handle top header color
    const handleTopHeaderColorChange = (colorValue) => {
        if (!colorValue.startsWith('#')) {
            colorValue = `#${colorValue}`;
        }
        setTopHeaderColor(colorValue)
    };

    //popup
    const [cardBgPopup, setCardBgPopup] = useState(false);
    const handleCardBgPopupClick = () => {
        setCardBgPopup(!cardBgPopup);
    };

    return (
        <>
            <div className="top-header custom-id-header">
                <h3 className="header-title">Full bg</h3>
                <div className="custom-id-header-wrapper">
                    <div className="header-file">
                        <div className="header-file-select">
                            <p className='header-label'>Background</p>
                            <div className="file-select">
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="background_image"
                                        type="file"
                                        name="background_image"
                                        onChange={(e) =>
                                            setData(
                                                "background_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                                {/* <small>select size(250X500)px</small> */}
                            </div>
                        </div>
                        <div className="file-button">
                            {/* <PrimaryButton
                                // disabled={processing}
                                className="educare-primary-btn-md-fill"
                                type="button"
                                onClick={(e) => {
                                    handleUploadBackgroundImage(e, 'background_image')
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
                                        handleDeleteBackgroundImage(e, 'background_image')
                                    }}
                                >
                                    <i className="icon-TrashSimple"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="header-color-picker">
                        <p className='header-label'>Background</p>
                        <ColorPicker className='color-picker' value={topHeaderColor} onChange={(e) => handleTopHeaderColorChange(e.value)} />
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
                                        value={topHeaderColor}
                                        onChange={(e) => handleTopHeaderColorChange(e.target.value)}
                                        className="block"
                                        placeHolder='#FFF000'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TopCardBackgroundPopup
                cardBgPopup={cardBgPopup}
                setCardBgPopup={setCardBgPopup}
            />
        </>
    );
};

export default CustomFromTopHeader;

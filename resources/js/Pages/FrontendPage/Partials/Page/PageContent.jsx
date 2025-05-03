import React from 'react';

const PageContent = ({ content }) => {
    return (
        <div className='educare-quick-mis-report-item front-contact-wrapper my-[60px] pt-[25px]'>
            <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                <div className='col-span-3 maxSm:col-span-12'>
                    <h2 className='text-[36px] mb-2.5 maxSm:text-[28px] text-heading font-semibold text-center'>{content?.title}</h2>
                    {content?.image && (
                        <div className='page-image max-w-60'>
                            <img src={content?.image} alt={content?.title} />
                        </div>
                    )}
                </div>
                <div className='col-span-9 maxSm:col-span-12'>
                    
                    <div className='' dangerouslySetInnerHTML={{ __html: content?.body_text }} ></div>
                </div>
            </div>
        </div>
    );
};

export default PageContent;
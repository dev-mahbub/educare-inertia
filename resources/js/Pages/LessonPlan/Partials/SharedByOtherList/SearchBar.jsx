import TextInput from "@/Components/TextInput";

const SearchBar = ({
    lessonPlans,
    filterText,
    setFilterText
}) => {
    return (
        <div className="educare-header-search-bar-main mb-2.5">
            <div className=" educare-header-filtar-bar-inner-main">
                <div className="educare-header-filtar-bar-count mr-auto">
                    <span>Lesson Plans: {lessonPlans?.length}</span>
                </div>

                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                    <div className="educare-header-filtar-bar-fields-area relative">
                        <div className="educare-input-field-styles">
                            <TextInput
                                type="text"
                                placeHolder="Search"
                                value={filterText}
                                onChange={(e) => {
                                    setFilterText(e.target.value)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

import React from 'react';
import BadgeElements from './BadgeElements';
import ButtonElements from './ButtonElements';
import InputElements from './InputElements';
import CalenderElements from './CalenderElements';
import CheckboxElements from './CheckboxElements';
import SelectElements from './SelectElements';
import AutoCompleteCount from './AutoCompleteCount';
import CardElements from './CardElements';
import CardElementsCollapse from './CardElementsCollapse';
import RepeatableInput from './RepeatableInput';
import RadioButtonStyle from './RadioButtonStyle';
import MultipleSelectors from './MultipleSelectors';
import MultipleAutocomplete from './MultipleAutocomplete';
import GlobalSearchBar from './GlobalSearchBar';
import SingleAutocomplete from './SingleAutocomplete';
import HeaderMenus from './HeaderMenus';
import HeaderIconMenu from './HeaderIconMenu';
import ListFormOnePage from './ListFormOnePage';
import MultipleSelectorsWithoutCheck from './MultipleSelectorsWithoutCheck';
import PopupList from './Popup/DoublePopup/PopupList';
import ListTableLarge from './ListTableLarge';
import CommonHeaderFilter from './CommonHeaderFilter';
import BasicMatrialTable from './MatrialTable/BasicMatrialTable';
import HeaderFilterTopbar from './HeaderFilterTopbar';
import MaterialTable from './MatrialTable/MaterialTable';
import MaterialTableWithoutCheckbox from './MatrialTable/MaterialTableWithoutCheckbox';
import HeaderTopTwo from './HeaderTopTwo';
import SinglePopupMain from './Popup/SinglePopup/SinglePopupMain';
import ListPopupMain from './Popup/ListPopup/ListPopupMain';
import TreeMenu from './TreeMenu';
import CopyInputValue from './CopyInputValue';
import DoubleColumnTable from './DoubleColumnTable';
import AllSelectCheckbox from './AllSelectCheckbox';
import MaterialSelectorGroup from './MaterialSelectorGroup';

const ElementsInnerLayout = () => { 
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <GlobalSearchBar />
                    <HeaderMenus />
                    <HeaderTopTwo />
                    <HeaderIconMenu />
                    <HeaderFilterTopbar />
                    <CommonHeaderFilter />
                    <PopupList />
                    <SinglePopupMain />
                    <ListPopupMain />
                    <TreeMenu />
                    <BadgeElements />
                    <ButtonElements />  
                    <InputElements />
                    <RepeatableInput />
                    <AutoCompleteCount />
                    <SelectElements />
                    <MaterialSelectorGroup />
                    <CalenderElements />
                    <CheckboxElements />
                    <AllSelectCheckbox />
                    <RadioButtonStyle />
                    <CardElements />
                    <CardElementsCollapse />
                    <MultipleSelectors />
                    <MultipleSelectorsWithoutCheck />
                    <MultipleAutocomplete />
                    <SingleAutocomplete />
                    <CopyInputValue />
                    <DoubleColumnTable />
                    <ListFormOnePage />
                    <ListTableLarge />
                    <BasicMatrialTable />
                    <MaterialTable />
                    <MaterialTableWithoutCheckbox />
                </div>
            </div>
        </div>
    );
};

export default ElementsInnerLayout;
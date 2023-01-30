# CompactSelect

CompactSelect is a select control that is light in terms of screen realestate but at the same time highly functional

For examples and help [compact-select](https://markgregg.github.io/CompactSelect/)

## To install

yarn add compact-select

npm i --save compact-select

## Quick start

A simple string list

```js
<CompactSelect title="test" choices={choices} />
```

## Behaviour properties

- title - select control title and use as a key for caching items
- maximumSelections - min items that can be selected
- minimumSelections - max items that can be selected
- selectType - how the control behaves "standard" | "dropdown" | "switch"
- choices - available static choices
- selected - currently selected items
- itemValue - if using a complex class how to access the key value
- itemText - if using a complex class how to access the display value
- itemDisabled - if using a complex class how to access the disabled value
- typeAheadLookUp - type ahead lookup callback
- noEmptyStringLookUp - don't loook up if the input string is blank
- itemSearch? - item search for when pasting from the clipboard
- cacheLookUp - should the control cache items
- cacheTimeToLive - how long should items exist for, in seconds
- cacheExpiryCheck - how often should item expiry be checked, in seconds
- onChange - notify of change
- disabled - is control disable
- loadingText - custom loading text
- noItemText - custom no item text
- caseSensitive - perform case sensitive matching
- toolTipValueLimit - maxium number of items to display in the tooltip

## Apperance properties

### compact select

- style
- selectStyle
- selectDisabledStyle
- className
- disabledClassName
- inputStyle
- inputDisabledStyle
- inputClassName
- inputDisabledClassName
- clearSelectionStyle
- clearSelectionDisabledStyle
- clearSelectionClassName
- clearSelectionDisabledClassName
- titleStyle
- titleDisabledStyle
- titleClassName
- titleDisabledClassName
- choiceListStyle
- choiceListClassName
- dropdownIconStyle
- dropdownIconDisabledStyle
- dropIconClassName
- dropIconDisabledClassName
- hideDropdownIcon
- dropdownIcon
- clearSelectionIcon
- hideTitle
- height
- minHeight
- maxHeight
- width
- minWidth
- maxWidth

### options

- choiceStyle
- choiceSelectedStyle
- choiceHoverStyle
- choiceDisabledStyle
- choiceClassName
- choiceSelectedClassName
- choiceDisabledClassName
- choiceHoverClassName
- choiceSelectedIconStyle
- choiceSelectedIconClassName
- choiceSelectedIcon
- hideSelectedIcon

### item display

- displayStyle
- displayDisabledStyle
- displayClassName
- displayDisabledClassName

### Tool tip

- toolTipClassName
- toolTipStyle
- toolTipPosition 'above' | 'below' | 'left' | 'right';

## Styling

Add any of the below vairbales to a css/scss file.

```css
:root {
  --compactSelectBackgroundColor: #14061f;
  --compactSelectFontColor: White;
  --compactSelectDisabledBackgroundColor: #353576;
  --compactSelectToolTipBackgroundColor: #5555ad;
  --compactSelectHighlightedBackgroundColor: #9c9ccb;
  --compactSelectBorder: WhiteSmoke solid 2px;
  --pageColor1: rgb(195, 212, 233);
  --pageColor2: #353576;
  --pageColor3: #9c9ccb;
  --pageFont: Black;
}
```

### General

- --compactSelectFontWeight
- --compactSelectFontFamily
- --compactSelectFontSize
- --compactSelectFontStyle
- --compactSelectFontColor (default black)
- --compactSelectBorder (default 2px solid WhiteSmoke)
- --compactSelectBackgroundColor
- --compactSelectBackgroundImage
- --compactSelectDisabledBackgroundColor
- --compactSelectDisabledBackgroundImage
- --compactSelectTitleFontWeight (default 100)
- --compactSelectSelectedItemFontWeight (default bold)

### Input box

- --compactSelectInputTextMaxWidth (default 100%)

### Title

- --compactSelectTitleFontSize (default small)

### Option list

- --compactSelectChoiceListMaxHeight (default 300)

### Clear seletion icon

- --compactSelectClearSelectionIconSize (default large)

### Options

- --compactSelectChoiceSelectedIndicatorBorder
- --compactSelectSelectedFontColor (default black)
- --compactSelectSelectedBackgroundColor
- --compactSelectHighlightedFontColor (default black)
- --compactSelectHighlightedBackgroundColor (default lightgray)
- --compactSelectDisabledFontColor (default darkgray)
- --compactSelectDisabledBackgroundColor (default Gainsboro)
- --compactSelectSelectedIconSize (default large)
- --compactSelectSelectedIconColor (default green)
- --compactSelectChoiceBackgroundImage
- --compactSelectSelectedBackgroundImage
- --compactSelectHighlightedBackgroundImage
- --compactSelectDisabledBackgroundImage

### Tool tip

- --compactSelectToolTipFontColor (default black)
- --compactSelectToolTipFontWeight
- --compactSelectFontFamily
- --compactSelectToolTipFontSize (default small)
- --compactSelectToolTipFontStyle
- --compactSelectToolTipTextAlign (default center)
- --compactSelectToolTipBorder
- --compactSelectToolTipBackgroundColor
- --compactSelectToolTipBackgroundImage

## Components

- toolTipComponent
- choiceComponent
- displayComponent

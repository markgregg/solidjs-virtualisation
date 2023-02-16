export enum Themes {   
  Plain = 'Plain',
  Dark = 'Dark',
  Light = 'Light',
  Blue = 'Blue',
}

export const themes = Object.keys(Themes).filter((item) => {
  return isNaN(Number(item));
});

export const applyTheme = (theme: string) => {
  switch (theme) {
    case Themes.Blue:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundImage',
        'linear-gradient(to bottom, #75b7e7, #4f86af)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundImage',
        'linear-gradient(to bottom, #a2c4df, #325977)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedIconColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'LightGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledFontColor',
        'LightGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#577b95'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundImage',
        'linear-gradient(to bottom, #75b7e7, #4f86af)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#1c95eb'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedChoiceBackgroundColor',
        '#1476bd'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder',
        'none'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder', 
        '#a2c4df 2px Solid'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedColor',
        null
      );
      document.documentElement.style.setProperty(
        '--pageColor1',
        'white'
      ); 
      document.documentElement.style.setProperty('--pageColor2', '#4f86af');
      document.documentElement.style.setProperty('--pageColor3', '#75b7e7');
      document.documentElement.style.setProperty('--pageColor4', '#4f86af');
      document.documentElement.style.setProperty('--pageColor5', '#1c95eb');
      document.documentElement.style.setProperty('--pageFont', 'Black');
      document.documentElement.style.setProperty('--scrollbarColor', '#4f86af');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        'darkgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#4646B5'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        'darkgray'
      );
      break;
    case Themes.Dark:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        '#0badad'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundImage',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundImage',
        'linear-gradient(to bottom, #6aebeb, #0c3c3c)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedIconColor',
        'lightgreen'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        'white'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        'white'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledFontColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#799c9c'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        '#0a7b7b'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundImage',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#12dddd'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedChoiceBackgroundColor',
        '#095757'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedColor',
        'lightgreen'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder',
        '#22a9a9 2px Solid'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundColor',
        '#0badad'
      );
      document.documentElement.style.setProperty(
        '--pageColor1',
        'black'
      );
      document.documentElement.style.setProperty('--pageColor2', '#0a7b7b');
      document.documentElement.style.setProperty('--pageColor3', '#28e0e0');
      document.documentElement.style.setProperty('--pageColor4', '#215555');
      document.documentElement.style.setProperty('--pageColor5', '#28e0e0');
      document.documentElement.style.setProperty(
        '--pageFont',
        'white'
      );
      document.documentElement.style.setProperty('--scrollbarColor', '#0a7b7b');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        'white'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#0a7b7b'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        'white'
      );
      break;
    case Themes.Light:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundImage',
        'linear-gradient(to bottom, #f5eaa7, #fadc37)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundImage',
        'linear-gradient(to bottom, #f7efbf, #e4af00)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedIconColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        '#3D350B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        '#3D350B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'DarkGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledFontColor',
        'DarkGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#f7edaf'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundImage',
        'linear-gradient(to bottom, #F7E575, #f1d520)'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#EFD233'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedChoiceBackgroundColor',
        '#f8db1f'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder', 
        '#F7E575 2px Solid'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedColor',
        null
      );
      document.documentElement.style.setProperty('--pageColor1', 'white');
      document.documentElement.style.setProperty('--pageColor2', '#fadc37');
      document.documentElement.style.setProperty('--pageColor3', '#f5eaa7');
      document.documentElement.style.setProperty('--pageColor4', '#cfb72e');
      document.documentElement.style.setProperty('--pageColor5', '#fadc37');
      document.documentElement.style.setProperty('--pageFont', '#3D350B');
      document.documentElement.style.setProperty('--scrollbarColor', '#F7E575');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#e0cd60'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        '#e0cd60'
      );
      break;
    case Themes.Plain:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundImage',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundImage',
        null,
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedIconColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledFontColor',
        'null'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundImage',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedChoiceBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDropDownBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedColor',
        null
      );
      document.documentElement.style.setProperty('--solidjsSelectBorder', null);
      document.documentElement.style.setProperty('--pageColor1', 'White');
      document.documentElement.style.setProperty('--pageColor2', '#dce916');
      document.documentElement.style.setProperty('--pageColor3', '#eaff5c');
      document.documentElement.style.setProperty('--pageColor4', '#b1bc11');
      document.documentElement.style.setProperty('--pageColor5', '#dce916');
      document.documentElement.style.setProperty('--pageFont', 'Black');
      document.documentElement.style.setProperty('--scrollbarColor', null);
      document.documentElement.style.setProperty('--scrollbarArrowColor', null);
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        null
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        null
      );
      document.documentElement.style.setProperty('--scrollbarThumbColor', null);
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        null
      );
      break;
  }
};
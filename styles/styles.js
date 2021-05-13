export const colors = {
  pmColor: '#00CC52',
  designerColor: '#FCC655',
  developerColor: '#435BEF',
  defaultColor: '#435BEF',
  pointColor: '#FCC655',
  inactiveColor: '#DADBDD',
  HeaderBorderColor: '#CBCBCB',
  ChatBorderColor: '#DADADA',
  inactiveBorderColor: '#CBCBCB',
};

export function getColor(colorName) {
  switch (colorName) {
    case 'pmColor':
      return colors.pmColor;
    case 'designerColor':
      return colors.designerColor;
    case 'developerColor':
      return colors.developerColor;
    case 'defaultColor':
      return colors.defaultColor;
    case 'pointColor':
      return colors.pointColor;
    case 'inactiveColor':
      return colors.inactiveColor;
    case 'HeaderBorderColor':
      return colors.HeaderBorderColor;
    case 'ChatBorderColor':
      return colors.ChatBorderColor;
    case 'inactiveBorderColor':
      return colors.inactiveBorderColor;
  }
}


import { createGlobalStyle } from 'styled-px2vw'

const AppStyled = createGlobalStyle`
@font-face {
  font-family:'music-icon' ;
  src: url('./fonts/music-icon.eot?2qevqt');
  srd:url('./fonts/music-icon.eot?2qevqt#iefix') format('embedded-opentype'),
        url('./fonts/music-icon.ttf?2qevqt') format('truetype'),
        url('./fonts/music-icon.woff?2qevqt') format('woff'),
        url('./fonts/music-icon.svg?2qevqt#music-icon') format('svg');
  font-weight:normal;
  font-style: normal;
};
body, html {
  line-height: 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: $color$background;
  color: $color$text;
}
`


const NormalTheme = {
  
  // 颜色定义规
  $color$background: "#222",
  $color$background$d: 'rgba(0, 0, 0, 0.3)',
  $color$highlight$background: '#333',
  $color$dialog$background: '#666',
  $color$theme: '#ffcd32',
  $color$theme$d: 'rgba(255, 205, 49, 0.5)',
  $color$sub$theme: '#d93f3',
  $color$text: '#fff',
  $color$text$d: 'rgba(255, 255, 255, 0.3',
  $color$text$l: 'rgba(255, 255, 255, 0.5)',
  $color$text$ll: 'rgba(255, 255, 255, 0.8)',

  //字体定义规范
  $font$size$small$s: '10px',
  $font$size$small: '12px',
  $font$size$medium: '14px',
  $font$size$medium$x: '16px',
  $font$size$large: '18px',
  $font$size$large$x: '22px'
}

export { AppStyled, NormalTheme }
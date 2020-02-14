
import { createGlobalStyle } from 'styled-px2vw'
import { isMobile, isPC } from '../es/Browser';

const AppStyled = createGlobalStyle`
@font-face {
  font-family:'music-icon' ;
  src:url(${require('./fonts/music-icon.eot')});
  src:url(${require('./fonts/music-icon.eot')}) format('embedded-opentype'),
        url(${require('./fonts/music-icon.ttf')}) format('truetype'),
        url(${require('./fonts/music-icon.woff')}) format('woff'),
        url(${require('./fonts/music-icon.svg')}) format('svg');
  font-weight:normal;
  font-style: normal;
};

body, html {
  line-height: 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: #222;
  color: '#222';
}

.fix_clear_float {
  clear:both;
  content:"";
  display:block;
}

[class*=" icon-"], [class^=icon-] {
  font-family: music-icon !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

.no-warp {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
`

const NormalTheme = {
  
  // 颜色定义规
  $color$background: "#222",
  $color$background$d: 'rgba(0, 0, 0, 0.3)',
  $color$highlight$background: '#333',
  $color$dialog$background: '#666',
  $color$theme: '#ffcd32',
  // eslint-disable-next-line jsx-control-statements/jsx-jcs-no-undef
  $color$theme$d: "rgba(255, 205, 49, 0.5)",
  $color$sub$theme: '#d93f3',
  $color$text: '#fff',
  $color$text$d: 'rgba(255, 255, 255, 0.3',
  $color$text$l: 'rgba(255, 255, 255, 0.5)',
  $color$text$ll: 'rgba(255, 255, 255, 0.8)',

  //字体定义规范
  $font$size$small$s: '10pt',
  $font$size$small: '12pt',
  $font$size$medium: '14pt',
  $font$size$medium$x: '16pt',
  $font$size$large: '18pt',
  $font$size$large$x: '22pt'
}

export { AppStyled, NormalTheme }
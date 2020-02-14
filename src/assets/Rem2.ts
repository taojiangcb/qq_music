import { css, StyledComponent } from 'styled-components';

function r(pxValue) {
  // 根据项目配置比例的方式自行设定
  const ratio = 20;
  // 针对template literals
  if (Array.isArray(pxValue)) {
    pxValue = pxValue[0];
  }
  
  pxValue = parseInt(pxValue);
  return pxValue / ratio + 'rem';
}

// 把字符串样式里面的px单位换算成rem的
// 支持多行匹配
function transformPxToRem(style) {
  // 避免处理了函数等情况
  if (typeof style !== 'string') {
    return style;
  }

  return style.replace(/\d+px/gm, matched => {
    return r(matched);
  });
}

// 实现在把样式传递给styled之前，预先用transformPxToRem处理
function rem2js(strings, ...interpolations) {
  // css是styled-components的一个helper
  let styles = css(strings, ...interpolations);
  styles = styles.map(transformPxToRem);

  // 模拟raw的调用
  return [[""], styles];
};

export { rem2js, r }
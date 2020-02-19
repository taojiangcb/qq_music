
import styled from 'styled-px2vw';
const logo3x = require('./img/logo@3x.png');
const logo2x = require('./img/logo@2x.png');


export const HeaderContianer = styled.div`
  background-color:${props => props.theme.$color$background};
  color:${props => props.theme.$color$theme};
  padding-bottom:5px;
`
export const HeaderWapper = styled.div`
  position:relative;
  height:44px;
  line-height:44px;
  text-align:center;
  font-size:${props => props.theme.$font$size$large};
  display:flex;
  flex-direction:row;
  justify-content:center;
  justify-items:start;
  padding-top:20px;
  .img {
    display:inline-block;
    /* background-image:url(${logo2x}) ; */
    background-size:cover;
    width:44px;
    height:44px;
    margin-right:5px;
  }
`;

export const NavTopWapper = styled.div`
  display:flex;
  flex-direction:row;
  margin-bottom:10px;
`
export const NavItem = styled.div`
  text-align:center;
  font-size:${props => props.theme.$font$size$small};
  height:40px;
  line-height:40px;
  width:100%;
  margin-top:40px;
  > span { }
  > span:hover {
    border-bottom:3px solid ${props => props.theme.$color$theme};
  }
  &.selected {
   > span {
      border-bottom:3px solid ${props => props.theme.$color$theme};
    } 
  }
`
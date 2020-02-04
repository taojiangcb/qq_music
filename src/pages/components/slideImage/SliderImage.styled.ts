import styled from "styled-px2vw";

export const SliderWapper = styled.div`
  overflow:hidden;
  min-height:1px;
  position:relative;
  
`

export const Pagination = styled.div`
  position:absolute;
  color:#FFF;
`

export const SliderGroup = styled.div`
  overflow:hidden;
  white-space:nowrap;
  position:relative;

  &::after {
    clear:both;
    content:"";
    display:block;
  }
`

export const SliderImageItem = styled.div`
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  img {
    display: block;
    width: 100%;
  }
`
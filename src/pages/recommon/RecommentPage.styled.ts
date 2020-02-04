import styled from "styled-px2vw";

export const RecommentWapper = styled.div`
`

export const RecommentTitle = styled.div`
  font-size:28px;
  text-align:center;
  line-height:90px;
  color:${props => props.theme.$color$theme};
`

export const RecommentItem = styled.div`
  padding:0 40px 40px 40px;
  width:100%;
  > img {
    width:100px;
    height:100px;
    margin-right:40px;
    float:left;
  }
  > div {
    float:left;
    font-size:14px;
    > h2 {
      color:#FFF;
      margin-bottom:40px;
    }
    > p {
      color:hsla(0,0%,100%,.3);
      line-height:20px;
      text-overflow:clip;
      word-wrap: none;
    }
  }
  &::after {
    clear:both;
    content:'';
    display:block;
  }
`

import styled from 'styled-px2vw';


export const RankPageContent = styled.div`
  /* position:relative; */
  width:100%;
  min-height:1px;
`

export const RankPageWapper = styled.div`
  position:relative;
  width:100%;
  min-height:1px;
  padding:30px 0;
`

export const RankPageItem = styled.div`
  /* width:100%; */
  margin:0px 30px 30px 30px;
  background-color:#333;
  color:hsla(0,0%,100%,.3);
  &::after {
    clear:both;
    content:"";
    display:block;
  }
  > img {
    float:left;
    width:160px;
    height:160px;
  }
  > ul {
    float:left;
    height:160px;
    background-color:#333;
    color:hsla(0,0%,100%,.3);
    display:block;
    padding:0 30px;
    margin:auto 0;
    
    >li {
      font-weight:400;
      vertical-align:baseline;
      width:400px;
      > p {
        white-space: nowrap;  
        text-overflow:ellipsis;
        padding-top:3px;
        overflow:hidden;
        line-height:50px;
        font-size:30px;
      }
    }
  }
`
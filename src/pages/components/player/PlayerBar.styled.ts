import styled, { keyframes } from "styled-px2vw";

const imgRotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const PlayerBarWaraper = styled.div.attrs((props: any) => ({ img: props.img }))`
  width:100%;
  position:fixed;
  height:120px;
  background-color:${props => (props.theme.$color$background$d)};
  bottom:0;
  left:0;
  display:flex;
  flex-direction:row;
  justify-items:center;
  .c1 {
    flex:auto auto 140px;
    padding: 0 20px;
  }
  .c2 {
    flex:1 2 auto;
    line-height:40px;
    padding-top:10px;
    font-size:16px;
    h2 {
      color:#FFF;
      width:300px;
    }
    p {
      color:hsla(0,0%,100%,.3);
      width:300px;
      padding-top:10px;
    }
  }
  .c3 {
    flex:1 1 120px;
    font-size:80px;
    text-align:right;
    padding-right:10px;
    line-height:120px;
    > i {
      font-size:80px;
      color:${props => props.theme.$color$theme};
      vertical-align:middle;
    }
  }
  
  .imgCir {                        
    margin-top:10px;
    background-image:url(${props => props.img});
    border-radius:50%;
    background-size:cover;
    width:100px;
    height:100px;
    background-color:#FFF;
    display:block;
  }
  .imgCirRation {
    animation: ${imgRotation} 5s linear infinite;
  }
`
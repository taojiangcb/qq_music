import styled, { keyframes } from "styled-px2vw";

const imgRotation = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
`;
export const PlayerPaperWapper = styled.div`
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  .bg {
    width:100%;
    height:100%;
    position:absolute;
    z-index:-1;
    background-color:#000;
    > img {
      opacity:.6;
      filter:blur(50px);
      width:100%;
      height:100%;
    }
  }
`


export const PlayerTop = styled.div`
  width:100%;
  height:100px;
  color:${props => props.theme.$color$text};
  padding-top:10px;
  text-align:"center";
  > i {
    position:absolute;
    left:15px;
    top:15px;
    font-size:30pt;
    color:${props => props.theme.$color$theme};
  }
  > h1 {
    line-height:80px;
    font-size:13pt;
    width:100%;
    text-align:center;
  }
  > p{
    width:100%;
    font-size:10pt;
    text-align:center;
  }
`

export const PlayerCDWapper = styled.div`
  width:100%;
  height:600px;
  padding-top:100px;
  position: relative;
  > .CDWapper {
    position:absolute;
    width:600px;
    height:600px;
    left:50%;
    margin-left:-300px;
    .rotation {
      animation: ${imgRotation} 8s linear infinite;
    }
    img {
      border-radius:50%;
      border:10px solid hsla(0,0%,100%,.1);
      box-sizing:border-box;
      width:100%;
      height:100%;
    }
  }
`

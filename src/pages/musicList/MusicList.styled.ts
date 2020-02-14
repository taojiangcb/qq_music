import styled from "styled-components";

export const MusicListWapper = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background-color:#333;
  z-index:0;
  &.animation-element{
    animation-duration:0.5s;
    animation-timing-function:ease-out;
    /* animation-delay:s;  */
    /* animation-iteration-count:infinite; */
  }
`

export const MusicBanner = styled.div.attrs(props => ({
  backImg: Object(props).backImg,
}))`
  background-image:url(${props => (Object(props).backImg)});
  background-size: cover;
  width: 100%;
  height: 262px;
  position: relative;
  overflow: hidden;
`

export const RankMusicFilter = styled.div`
  width: 100%;
  height: 100%;
  background:rgba(7,17,27,.4);
  position:absolute;
`

export const IconPlay = styled.div`
height: 30px;
line-height:30px;
width: 135px;
position: absolute;
left: 50%;
margin-left:-67px;
border:1px solid #ffcd32;
border-radius:50px;
color:#ffcd32;
text-align:center;
top: 70%;
  > i {
  display: inline-block;
  vertical-align: baseline;
  margin-right: 6px;
  font-size: 16px;
}
`

export const SongListItem = styled.div`
  padding-top:20px;
  &::after {
    clear:both;
    content:"";
    display:block;
  }
  > div {
    float: left;
    &.icon {
    width:32px;
    height:32px;
    margin-right:30px;
    margin-left:30px;
    text-align:center;
      &.icon0 {
        background-image:url(${require('./img/first@3x.png')});
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
          background-image: url(${require('./img/first@2x.png')});
        }
        background-size:cover;
      }
      &.icon1 {
        background-image:url(${require('./img/second@3x.png')});
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
          background-image: url(${require('./img/second@2x.png')});
        }
        background-size:cover;
      }
      &.icon2 {
        background-image:url(${require('./img/third@3x.png')});
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
          background-image: url(${require('./img/third@2x.png')});
        }
        background-size:cover;
      }
      &.text {
        color:#ffcd32;
        font-size:18px;
        line-height:32px;
      }
    }
    &.content {
      /* line-height:16px; */
      font-size:12px;
      > h2 {
        color:#FFF;
        line-height:20px;
        width:200px;
      }
     > p{
       padding-top:4px;
        color:rgba(255, 255, 255, 0.3);
        width:200px;
      }
    }
  }
`
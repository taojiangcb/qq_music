import styled from "styled-px2vw";

export const loading_img = require('./img/5-121204194034-51.gif');

export const SearchWapper = styled.div`
  min-height:1px;
  padding-top:20px;
`

export const SearchWapperInputBar = styled.div`
  margin:0 30px;
  line-height:40px;
  font-size:30px;
  color:#fff;

  > div {
    padding:10px 50px;
    position: relative;
    background-color:#333;
    border-radius:10px;
    > input {
      outline:none;
      border:none;
      background:transparent;
      height:30px;
      font-size:25px;
      color:#fff;
      width:100%;
    }
  }

  .sosuo {
    position: absolute;
    left:12px;
    color:#777;
  }

  .clear-sosuo {
    position: absolute;
    top:10px;
    font-size:40px;
    right:12px;
    color:#777;
  }

`

export const FlagWapper = styled.div`
  margin-top:40px;
  padding:0 30px;
  > h2 {
    color:#666;
    line-height:60px;
    font-size:25px;
  }
  > div {
    > span {
      background-color:#333;
      color:#777;
      font-size:25px;
      float:left;
      padding:10px;
      border-radius:10px;
      margin-right:15px;
      margin-top:15px;
    }
    &::after {
      clear:both;
      content:"";
      display:block;
    }
  }
`

export const HistoryWapper = styled.div`
  margin-top:40px;
  padding:0 30px;
  color:#666;
  > p {
    position: relative;
    > i {
      position:absolute;
      font-size:40px;
      right:0;
    }
  }
  ul {
    margin-top:30px;
    > li {
      position: relative;
      line-height:50px;
      height:50px;
      font-size:25px;
      > i {
        position:absolute;
        font-size:40px;
        right:0;
        
      }
    }
  }
`

export const SearchSongList = styled.ul`
  margin-top:30px;
  padding:0 50px;
  color:#666;
  width:90%;

  > li {
    line-height:50px;
    height:50px;
    font-size:25px;
    > i {
      font-size:30px;
    }
    > span {
      margin-left:10px;
    }
  }

  .loading {
    text-align:center;
  }
`
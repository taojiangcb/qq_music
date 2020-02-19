import React, { useState, useEffect, useRef, useCallback } from "react"
import styled, { keyframes } from "styled-px2vw";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getHistorySongList } from '../../../logicFunction/OS';
import { PLAY_MODE } from "../../../logicFunction/Constant";
import PlayModeBtn from "./PlayModeBtn";
import { Song } from "../../../logicFunction/song";
import { Scroll } from "../scroll/Scroll";
import { action_play_Song } from "./reducer/Actions.play";


const imgRotation = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
`;

const PlayerListWapper = styled.article`
  position:fixed;
  bottom:0;
  height:70%;
  width:100%;
  background-color:#333;
  z-index:1001;
  padding:30px 30px 0 30px;
  box-sizing:border-box;
  .listContent {
    height:calc(100% - 100px);
    /* background-color:#FFF; */
    box-sizing:border-box;
  }

  ul{}
  li{

    font-size:25px;
    color:#777;
    line-height:50px;
    vertical-align:middle;

    .icon {
      width:50px;
      display:inline-block;
      text-align:center;
    }

    .selected {
      color:${props => props.theme.$color$theme};
      animation:${imgRotation};
      transform-origin:center center;
    }

    .animation-element{
      animation-duration:6s;
      animation-timing-function:linear;
      animation-iteration-count:infinite;
    }
  }
`;

const List_Header = styled.header`
  width:100%;
  height:100px;
  color:#777;
  
  position: relative;
  &::after {
    clear:both;
    content:"";
    display:block;
  }

  section {
    float:left;
    vertical-align:middle;
    line-height:60px;
  }

  .close {
    position:absolute;
    right:0;
    top:0;
  }

  i {
    width:100%;
    height:100%;
    text-align:center;
    vertical-align:middle;
    font-size:70px;
    color:${props => props.theme.$color$theme}
  }

  span {
    vertical-align:middle;
    font-size:30px;
    margin-left:10px;
    font-weight:700px;
  }
`;


// eslint-disable-next-line react/display-name
const HistoryList = React.memo((props: any) => {

  let [outsiteHeight, setHeight] = useState(0);
  let { songList, curSong } = props;
  let reff = useRef<HTMLElement>();

  useEffect(() => {
    let rect = reff.current.getBoundingClientRect();
    let h = rect.bottom - rect.top;
    setHeight(h);
  }, []);

  let itemClick = useCallback(item => { props.play_song(item); })

  let smid = curSong && curSong.mid || "";
  const renderList = (
    songList && songList.map(item => {
      return <li key={item.mid} onClick={e => { itemClick(item) }}>
        <span className={`icon ${item.mid === smid ? 'selected' : ''} animation-element`}>
          <i className={`iconfont iconDiscguangpan `}></i>
        </span>
        <span>{item.name}</span>
        <i></i>
      </li>
    })
  )

  return (
    <article ref={reff} className={'listContent'}>
      <Scroll outsiteHeight={outsiteHeight + 'px'}>
        <ul> {renderList} </ul>
      </Scroll>
    </article>
  )
})

interface iProps {
  mode?: PLAY_MODE.LOOP_LIST,
  modeChange?: Function,
  songList?: Song[],
  curSong?: Song,
  onClosePlayList?: Function;
}

function PlayerList(props: iProps) {
  let { mode, modeChange } = props;
  let play_mode_str = '';
  if (mode === PLAY_MODE.LOOP_LIST) {
    play_mode_str = "列表循环";
  }
  else if (mode === PLAY_MODE.RANDOM) {
    play_mode_str = "随机播放";
  }
  else {
    play_mode_str = "单曲循环";
  }

  let closeBack = useCallback((e) => {
    console.log('closeBack');
    props.onClosePlayList && props.onClosePlayList();
  }, [])

  // eslint-disable-next-line react/display-name
  return (<PlayerListWapper>
    <List_Header>
      <section>
        <PlayModeBtn mode={props.mode} modeChange={props.modeChange} />
        <span>{play_mode_str}</span>
      </section>
      <div className={'close'}>
        <i onClick={closeBack} className={'iconfont iconRectangleCopy'}></i>
      </div>
    </List_Header>
    <HistoryList {...props} />
  </PlayerListWapper>)
}

const mapStateToProps = (state: any) => {
  return {
    songList: state.reducerPlay.songList,
    curSong: state.reducerPlay.curSong,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    },
  }
}

let MemoPlayList = React.memo(PlayerList);
export default connect(mapStateToProps, mapDispatchToProps)(MemoPlayList);


import styled from "styled-components";


export const ScrollWapper = styled.div.attrs((props: any) => ({
  outsiteHeight: props.outsiteHeight
}))`
  position:relative;
  width:100%;
  min-height:1px;
  overflow:hidden;
  height:${props => props.outsiteHeight};
  box-sizing:border-box;
`

export const ScrollContainer = styled.div`
  position:relative;
  width:100%;
  overflow:hidden;
`
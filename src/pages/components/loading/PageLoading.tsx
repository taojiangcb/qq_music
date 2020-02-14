import styled from "styled-components";
import React from "react";


const PageLoadWapper = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  background-color:#000;

  z-index:200;
  opacity:0.5;

  left:0;
  top:0;
  h3 {
    line-height:100vh;
    text-align:center;
    vertical-align:middle;
  }
`

export const PageLoading = (props) => (
  <PageLoadWapper>
    <h3>loading...</h3>
  </PageLoadWapper>
)
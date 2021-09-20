import React from "react";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const RowContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

export const RowName = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2px 8px;
  background-color: black;
  color: white;
  box-sizing: border-box;
`;

export const RowImage = styled.img`
  width: 100%;
  height: 100%;
`;


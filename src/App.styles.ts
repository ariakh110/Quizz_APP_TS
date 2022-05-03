import styled ,{ createGlobalStyle } from 'styled-components';

import BGImage from './images/car.jpg';

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100vh;
    }
    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }  
    * {
        box-sizing: border-box;
        font-family: 'Catamaran', sans-serif;
    }
    `
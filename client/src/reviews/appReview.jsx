/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Rotate from '../sectionBox.jsx';
import ReviewParent from './reviewParent.jsx';

class AppReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isStarted: false,
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    const { isOpen } = this.state;
    this.setState({
      isStarted: true,
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { isStarted } = this.state;
    const ReviewParentDiv = styled.div`
      display: block;
      width: 100%;
      min-height: 70px;
      vertical-align: center;
      border-top: 1px solid grey;
      :hover {
        background-color: ${isOpen ? 'white' : 'rgb(230, 240, 255)'};
      }`;
    const fadeIn = keyframes`
      from {
        transform: translate(0px,-50px);
        opacity: 0;
      }

      to {
        transform: translate(0px, 0px);
        opacity: 1;
      }
    `;

    const FadeInDiv = styled.div`
      animation: ${isStarted ? (isOpen ? fadeIn : '') : ''} .75s;
      animation-fill-mode: forwards;
      animation-direction: alternate;
    `;


    return (
      <div>
        <ReviewParentDiv id="ReviewSection">
          <h5 onClick={this.toggleOpen}>
            <Rotate isOpen={isOpen} isStarted={isStarted}>+</Rotate>
            {' '}
Reviews
          </h5>
          <FadeInDiv>
            {isStarted ? (isOpen ? <ReviewParent /> : '') : '' }
          </FadeInDiv>

        </ReviewParentDiv>

      </div>
    );
  }
}

export default AppReview;

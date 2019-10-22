/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import SnapShotButtons from './snapShotButtons.jsx';

class SnapShot extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { changeFilter } = this.props;
    changeFilter(e.currentTarget.className);
  }

  starCount(star) {
    const result = {};
    const { reviews } = this.props;
    for (let i = 0; i < reviews.length; i += 1) {
      if (result[reviews[i].overall_rating] === undefined) {
        result[reviews[i].overall_rating] = 1;
      } else {
        result[reviews[i].overall_rating] += 1;
      }
    }
    return result[star];
  }

  starPercent(star) {
    const { reviews } = this.props;
    if (reviews.length === 0) {
      return 0;
    }
    return Math.floor(((this.starCount(star) || 0) / reviews.length) * 100);
  }

  render(
  ) {
    const { filtered } = this.props;
    const Percent5starDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(this.starPercent('5')).toString()}%, rgb(230, 230, 230) ${(this.starPercent('5')).toString()}%)`,
    }))`
      display: inline-block;
      margin-top: 3px;
      margin-bottom: 3px;
      height: 10px
      width: 175px;
      max-width: 175px;
      background: ${(props) => props.bgcolor};
      `;

    const Percent4starDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(this.starPercent('4')).toString()}%, rgb(230, 230, 230) ${(this.starPercent('4')).toString()}%)`,
    }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${(props) => props.bgcolor};
      `;

    const Percent3starDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(this.starPercent('3')).toString()}%, rgb(230, 230, 230) ${(this.starPercent('3')).toString()}%)`,
    }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${(props) => props.bgcolor};
      `;

    const Percent2starDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(this.starPercent('2')).toString()}%, rgb(230, 230, 230) ${(this.starPercent('2')).toString()}%)`,
    }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${(props) => props.bgcolor};
      `;

    const Percent1starDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(this.starPercent('1')).toString()}%, rgb(230, 230, 230) ${(this.starPercent('1')).toString()}%)`,
    }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${(props) => props.bgcolor};
      `;
    return (
      <div>
        <p>Rating Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <table>
          <tbody>
            <tr className="5reviewAddFilter" onClick={this.handleClick}>
              <td>5 &#9733; </td>
              <td>
                <Percent5starDiv><table className="reviewPercentBars"><tbody><tr><td /></tr></tbody></table></Percent5starDiv>
              </td>
              <td>
                {' '}
                {this.starCount('5') || 0}
              </td>
            </tr>
            <tr className="4reviewAddFilter" onClick={this.handleClick}>
              <td>4 &#9733; </td>
              <td>
                <Percent4starDiv><table className="reviewPercentBars"><tbody><tr><td /></tr></tbody></table></Percent4starDiv>
              </td>
              <td>
                {' '}
                {this.starCount('4') || 0}
              </td>
            </tr>
            <tr className="3reviewAddFilter" onClick={this.handleClick}>
              <td>3 &#9733; </td>
              <td>
                <Percent3starDiv><table className="reviewPercentBars"><tbody><tr><td /></tr></tbody></table></Percent3starDiv>
              </td>
              <td>
                {' '}
                {this.starCount('3') || 0}
              </td>
            </tr>
            <tr className="2reviewAddFilter" onClick={this.handleClick}>
              <td>2 &#9733; </td>
              <td>
                <Percent2starDiv><table className="reviewPercentBars"><tbody><tr><td /></tr></tbody></table></Percent2starDiv>
              </td>
              <td>
                {' '}
                {this.starCount('2') || 0}
              </td>
            </tr>
            <tr className="1reviewAddFilter" onClick={this.handleClick}>
              <td>1 &#9733; </td>
              <td>
                <Percent1starDiv><table className="reviewPercentBars"><tbody><tr><td /></tr></tbody></table></Percent1starDiv>
              </td>
              <td>
                {' '}
                {this.starCount('1') || 0}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="0reviewClearFilter" onClick={this.handleClick}>
          <SnapShotButtons filter={filtered} />
        </div>
      </div>
    );
  }
}

export default SnapShot;

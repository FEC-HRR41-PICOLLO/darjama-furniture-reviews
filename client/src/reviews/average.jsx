/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';


class Averages extends React.PureComponent {
  getAverages(reviews) {
    const result = {};
    const attributes = ['overall_rating', 'value_rating', 'quality_rating', 'appearance_rating', 'ease_of_assembly_rating', 'works_as_expected_rating'];
    for (let i = 0; i < attributes.length; i += 1) {
      result[attributes[i]] = new this.AverageNode();
    }
    for (let i = 0; i < reviews.length; i += 1) {
      for (let j = 0; j < attributes.length; j += 1) {
        if (reviews[i][attributes[j]]) {
          // eslint-disable-next-line no-underscore-dangle
          result[attributes[j]]._scores.push(reviews[i][attributes[j]]);
        }
      }
    }
    return result;
  }


  AverageNode() {
    this._scores = [];
    this.avg = () => {
      if (this._scores.length === 0) {
        return 0;
      }
      // eslint-disable-next-line no-param-reassign
      return (this._scores.reduce((x, y) => y += x)) / this._scores.length;
    };
  }

  render(
  ) {
    // eslint-disable-next-line react/prop-types
    const { reviews } = this.props;
    const avgArray = this.getAverages(reviews);

    const TransparentStars = styled.div`
      display: inline-block;
      background-color: white;
      color: black;
      font-size: 16.2px;
      font-weight: bold;
      text-align: left;
      mix-blend-mode: screen;
    `;

    const AverageOverallDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(avgArray.overall_rating.avg() * 20).toString()}%, rgb(230, 230, 230) ${(avgArray.overall_rating.avg() * 20).toString()}%)`,
    }))`
        display: inline-block;
        height: 20px
        width: 81px;
        max-width: 81px;
        background: ${(props) => props.bgcolor};
    `;
    const AverageValDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(avgArray.value_rating.avg() * 20).toString()}%, white ${(100 - avgArray.value_rating.avg() * 20).toString()}%)`,
    }))`
        display: inline-block;
        width: 145px;
        background: ${(props) => props.bgcolor};
    `;
    const AverageQualDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(avgArray.quality_rating.avg() * 20).toString()}%, white ${(100 - avgArray.quality_rating.avg() * 20).toString()}%)`,
    }))`
        display: inline-block;
        width: 145px;
        background: ${(props) => props.bgcolor};
    `;
    const AverageAppDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(avgArray.appearance_rating.avg() * 20).toString()}%, white ${(100 - avgArray.appearance_rating.avg() * 20).toString()}%)`,
    }))`
        display: inline-block;
        width: 145px;
        background: ${(props) => props.bgcolor};
    `;
    const AverageWorksDiv = styled.div.attrs((props) => ({
      bgcolor: `linear-gradient(90deg, #fc0 ${(avgArray.works_as_expected_rating.avg() * 20).toString()}%, white ${(100 - avgArray.works_as_expected_rating.avg() * 20).toString()}%)`,
    }))`
        display: inline-block;
        width: 145px;
        background: ${(props) => props.bgcolor};
    `;

    return (
      <div>
        <p>Average Customer Ratings</p>
        <table className="reviewAverageStats">
          <tbody>
            <tr>
              <td>Overall</td>
              <td>
                <AverageOverallDiv>
                  <TransparentStars>
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </TransparentStars>
                </AverageOverallDiv>

              </td>
              <td>{avgArray.overall_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Value for money</td>
              <td>
                <AverageValDiv>
                  <table className="reviewAverageBars">
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>

                    </tbody>

                  </table>

                </AverageValDiv>
              </td>
              <td>{avgArray.value_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Product quality</td>
              <td>
                <AverageQualDiv>
                  <table className="reviewAverageBars">
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>

                    </tbody>

                  </table>

                </AverageQualDiv>
              </td>
              <td>{avgArray.quality_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Product quality</td>
              <td>
                <AverageAppDiv>
                  <table className="reviewAverageBars">
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>

                    </tbody>

                  </table>

                </AverageAppDiv>
              </td>
              <td>{avgArray.appearance_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Works as expected</td>
              <td>
                <AverageWorksDiv>
                  <table className="reviewAverageBars">
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                      </tr>

                    </tbody>

                  </table>

                </AverageWorksDiv>
              </td>
              <td>{avgArray.works_as_expected_rating.avg().toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Averages;

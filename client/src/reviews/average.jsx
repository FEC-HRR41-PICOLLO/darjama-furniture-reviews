import React from 'react'
import styled from 'styled-components'


class Averages extends React.PureComponent {
  constructor(props) {
    super(props);

  }

  AverageNode() {
    this._scores = [];
    this.avg = function() {
      if (this._scores.length === 0) {
        return 0;
      }
      return (this._scores.reduce((x,y) => y += x))/this._scores.length;
    };
  }

  getAverages(reviews) {
    var result ={};
    var attributes = ['overall_rating', 'value_rating', 'quality_rating', 'appearance_rating', 'ease_of_assembly_rating', 'works_as_expected_rating' ]
    for (var i = 0; i < attributes.length; i++) {
      result[attributes[i]] = new this.AverageNode();
    }
    for (var i = 0; i < reviews.length; i++) {
      for (var j = 0; j < attributes.length; j++) {
        if (reviews[i][attributes[j]]) {
          result[attributes[j]]._scores.push(reviews[i][attributes[j]]);
        }
      }
    }
    return result;
  }

  render (
  )
  { var Averages = this.getAverages(this.props.reviews);

    const TransparentStars = styled.div`
      display: inline-block;
      background-color: white;
      color: black;
      font-size: 16.2px;
      font-weight: bold;
      text-align: left;
      mix-blend-mode: screen;
    `

    const AverageOverallDiv = styled.div.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + (Averages.overall_rating.avg()*20).toString() + "%, rgb(230, 230, 230) " + (Averages.overall_rating.avg()*20).toString() + "%)"
      }))`
        display: inline-block;
        height: 20px
        width: 81px;
        max-width: 81px;
        background: ${props => props.bgcolor};
    `
       const AverageValDiv = styled.div.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + (Averages.value_rating.avg()*20).toString() + "%, white " + (100 - Averages.value_rating.avg()*20).toString() + "%)"
      }))`
        display: inline-block;
        width: 145px;
        background: ${props => props.bgcolor};
    `
    const AverageQualDiv = styled.div.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + (Averages.quality_rating.avg()*20).toString() + "%, white " + (100 - Averages.quality_rating.avg()*20).toString() + "%)"
      }))`
        display: inline-block;
        width: 145px;
        background: ${props => props.bgcolor};
    `
    const AverageAppDiv = styled.div.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + (Averages.appearance_rating.avg()*20).toString() + "%, white " + (100 - Averages.appearance_rating.avg()*20).toString() + "%)"
      }))`
        display: inline-block;
        width: 145px;
        background: ${props => props.bgcolor};
    `
    const AverageWorksDiv = styled.div.attrs(props => ({
      bgcolor: "linear-gradient(90deg, #fc0 " + (Averages.works_as_expected_rating.avg()*20).toString() + "%, white " + (100 - Averages.works_as_expected_rating.avg()*20).toString() + "%)"
      }))`
        display: inline-block;
        width: 145px;
        background: ${props => props.bgcolor};
    `

    return (
      <div>
        <p>Average Customer Ratings</p>
        <table className="reviewAverageStats">
          <tbody>
            <tr>
              <td>Overall</td>
              <td><AverageOverallDiv><TransparentStars>&#9733;&#9733;&#9733;&#9733;&#9733;</TransparentStars></AverageOverallDiv></td>
              <td>{Averages.overall_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Value for money</td>
              <td><AverageValDiv><table className="reviewAverageBars">
                <tbody><tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr></tbody></table></AverageValDiv>
              </td>
              <td>{Averages.value_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Product quality</td>
              <td>
              <AverageQualDiv><table className="reviewAverageBars">
                <tbody><tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr></tbody></table></AverageQualDiv>
              </td>
              <td>{Averages.quality_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Product quality</td>
              <td>
              <AverageAppDiv><table className="reviewAverageBars">
                <tbody><tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr></tbody></table></AverageAppDiv>
              </td>
              <td>{Averages.appearance_rating.avg().toFixed(1)}</td>
            </tr>
            <tr>
              <td>Works as expected</td>
              <td>
                <AverageWorksDiv><table className="reviewAverageBars">
                  <tbody><tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr></tbody></table></AverageWorksDiv>
              </td>
              <td>{Averages.works_as_expected_rating.avg().toFixed(1)}</td>
            </tr>
          </tbody>
         </table>
      </div>
    )
  }

}

export default Averages
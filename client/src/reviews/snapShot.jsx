import styled from 'styled-components'

class SnapShotButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render ()
    { const filter = this.props.filter;
      let button1;
      let button2;
      if (filter.length > 0) {
        button1 = <button className="reviewFilterButton" style={{backgroundColor:"#0e7fd5", color:"white"}}>{this.props.filter[0]} Stars &#9447;</button>; button2 = <button className="reviewFilterButton">Clear All &#9447;</button>;
      }
      return ( <div>{button1} {button2}</div>
      )
  }
}

class SnapShot extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.props.changeFilter(e.currentTarget.className);
  }

  starCount(star) {
    var result ={};
    var reviews = this.props.reviews;
    for (var i = 0; i < reviews.length; i++) {
      if (result[reviews[i].overall_rating] === undefined) {
        result[reviews[i].overall_rating] = 1;
      } else {
        result[reviews[i].overall_rating] += 1;
      }
    }
    return result[star];
  }

  starPercent(star) {
    if (this.props.reviews.length === 0) {
      return 0;
    }
    return Math.floor((this.starCount(star) || 0)/this.props.reviews.length * 100);
  }

  render (
  )
  {     const Percent5starDiv = styled.div.attrs(props => ({
    bgcolor: "linear-gradient(90deg, #fc0 " + (this.starPercent('5')).toString() + "%, rgb(230, 230, 230) " + (this.starPercent('5')).toString() + "%)"
    }))`
      display: inline-block;
      margin-top: 3px;
      margin-bottom: 3px;
      height: 10px
      width: 175px;
      max-width: 175px;
      background: ${props => props.bgcolor};
      `

      const Percent4starDiv = styled.div.attrs(props => ({
        bgcolor: "linear-gradient(90deg, #fc0 " + (this.starPercent('4')).toString() + "%, rgb(230, 230, 230) " + (this.starPercent('4')).toString() + "%)"
        }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${props => props.bgcolor};
      `

      const Percent3starDiv = styled.div.attrs(props => ({
        bgcolor: "linear-gradient(90deg, #fc0 " + (this.starPercent('3')).toString() + "%, rgb(230, 230, 230) " + (this.starPercent('3')).toString() + "%)"
        }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${props => props.bgcolor};
      `

      const Percent2starDiv = styled.div.attrs(props => ({
        bgcolor: "linear-gradient(90deg, #fc0 " + (this.starPercent('2')).toString() + "%, rgb(230, 230, 230) " + (this.starPercent('2')).toString() + "%)"
        }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${props => props.bgcolor};
      `

      const Percent1starDiv = styled.div.attrs(props => ({
        bgcolor: "linear-gradient(90deg, #fc0 " + (this.starPercent('1')).toString() + "%, rgb(230, 230, 230) " + (this.starPercent('1')).toString() + "%)"
        }))`
          display: inline-block;
          margin-top: 3px;
          margin-bottom: 3px;
          height: 10px
          width: 175px;
          max-width: 175px;
          background: ${props => props.bgcolor};
      `
    return (
      <div>
        <p>Rating Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <table>
          <tbody>
            <tr className="5reviewAddFilter" onClick={this.handleClick}>
              <td>5 &#9733; </td>
              <td>
                <Percent5starDiv><table className="reviewPercentBars"><tbody><tr><td></td></tr></tbody></table></Percent5starDiv>
              </td>
              <td> {this.starCount('5') || 0}</td>
            </tr>
            <tr className="4reviewAddFilter" onClick={this.handleClick}>
              <td>4 &#9733; </td>
              <td>
                <Percent4starDiv><table className="reviewPercentBars"><tbody><tr><td></td></tr></tbody></table></Percent4starDiv>
              </td>
              <td> {this.starCount('4') || 0}</td>
            </tr>
            <tr className="3reviewAddFilter" onClick={this.handleClick}>
              <td>3 &#9733; </td>
              <td>
                <Percent3starDiv><table className="reviewPercentBars"><tbody><tr><td></td></tr></tbody></table></Percent3starDiv>
              </td>
              <td> {this.starCount('3') || 0}</td>
            </tr>
            <tr className="2reviewAddFilter" onClick={this.handleClick}>
              <td>2 &#9733; </td>
              <td>
                <Percent2starDiv><table className="reviewPercentBars"><tbody><tr><td></td></tr></tbody></table></Percent2starDiv>
              </td>
              <td> {this.starCount('2') || 0}</td>
            </tr>
            <tr className="1reviewAddFilter" onClick={this.handleClick}>
              <td>1 &#9733; </td>
              <td>
                <Percent1starDiv><table className="reviewPercentBars"><tbody><tr><td></td></tr></tbody></table></Percent1starDiv>
              </td>
              <td> {this.starCount('1') || 0}</td>
            </tr>
          </tbody>
        </table>

        <div className="0reviewClearFilter" onClick={this.handleClick}><SnapShotButtons filter={this.props.filter}/></div>
      </div>
    )
  }

}

export default SnapShot
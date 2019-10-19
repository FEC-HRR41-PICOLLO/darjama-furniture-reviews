import React from 'react'

class SingleReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      reported: "Report"
    }
  }

  clickHandler(e) {
    //console.log(e.target.id);
    if (e.target.id.indexOf('reviewHelpfulYes') > -1) {
      var reviewId = e.target.id.slice(16);
      var action = 'helpful_count';
      if (this.props.helpfulClicks.indexOf(reviewId) == -1) {
        this.props.reviewAction(reviewId, action)
      }
    } else if (e.target.id.indexOf('reviewHelpfulNo') > -1) {
      var reviewId = e.target.id.slice(15);
      var action = 'not_helpful_count';
      if (this.props.helpfulClicks.indexOf(reviewId) == -1) {
        this.props.reviewAction(reviewId, action)
      }
    } else if (e.target.id.indexOf('reviewReport') > -1) {
      var reviewId = e.target.id.slice(12);
      var action = 'reported_count';
      if (this.state.reported == "Report") {
        this.props.reviewAction(reviewId, action);
        this.setState({
          reported: "Reported"
        })

      }
    }
  }

  showDate(mysqlTime) {
    var year = Number(mysqlTime.substring(0,4));
    var month = Number(mysqlTime.substring(5,7)) - 1;
    var day = Number(mysqlTime.substring(8,10));
    var days = (new Date() - new Date(year, month, day)) / 86400000;
    if (days < 2) {
      return 'today';
    } else if (days < 14 ) {
      return Math.floor(days).toString() + ' days ago';
    } else if (days <= 60) {
      return Math.floor(days/7).toString() + ' weeks ago';
    } else if (days < 365) {
      return Math.floor(days/30).toString() + ' months ago';
    } else if (days < 730) {
      return 'one year ago';
    } else {
      return Math.floor(days / 365).toString() + ' years ago';
    }
  }

  showRecommendation(recommend) {
    if (recommend === 1) {
      return 'Yes, I recommend this product';
    } else if (recommend === 0) {
      return 'No, I do not recommend this product';
    } else {
      return '';
    }
  }

  showStars(count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += '&#9733';
    }
    return result;
  }
  showNoStars(count) {
    var result = '';
    for (var i = 0; i < 5 - count; i++) {
        result += '&#9733';
    }
    return result;
  }

  isGoldBar(number, rating) {
    if (number <= Number(rating)) {
      return "reviewBarGold";
    }
    return "reviewNoGold"
  }

  render(
  ) {
    const review = this.props.review;
    const helpfulYes = review.helpful_count;
    const helpfulNo = review.not_helpful_count;
    const disableHelpButton = this.props.helpfulClicks.indexOf(review.id.toString()) > -1;
    return(
      <div>
        <hr style={{border: '1px dotted', borderstyle: 'none none dotted', color: 'rgb(225,225,225'}} />
        <table style={{width: "100%"}}>
          <tbody>
            <tr>
             <td className="reviewSingleMain">
              <div>
                <span className="reviewGoldStars" dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.overall_rating)}}/><span className="reviewGreyStars" dangerouslySetInnerHTML={{__html: this.showNoStars(this.props.review.overall_rating)}}/>
                <span> {this.props.review.author} </span><span> · </span>
                <span className="reviewDate">{this.showDate(this.props.review.date)}</span>
              </div>
              <div className="reviewTitle">{this.props.review.title}</div>
              <p>{this.props.review.text}</p>
              <p>{this.showRecommendation(this.props.review.recommended)}</p>
              <div>Helpful?
                <button disabled={disableHelpButton} key={review.id + "y"} id={"reviewHelpfulYes" + review.id} className="reviewHelpYes" onClick={this.clickHandler}><span style={{color:"black"}}>Yes </span>· {helpfulYes}</button>
                <button disabled={disableHelpButton} key={review.id + "n" } id={"reviewHelpfulNo" + review.id} className="reviewHelpNo" onClick={this.clickHandler}><span style={{color:"black"}}>No </span> · {helpfulNo}</button>
                <button disabled={this.state.reported === "Reported"} key={review.id + "r"} id={"reviewReport" + this.props.review.id} className="reviewHelpReport" onClick={this.clickHandler}>{this.state.reported}</button></div>
              </td>
              <td className="reviewSingleRatings">
                <div>
                  <div>Value for money</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.value_rating)}></td>
                    <td className={this.isGoldBar(2, review.value_rating)}></td>
                    <td className={this.isGoldBar(3, review.value_rating)}></td>
                    <td className={this.isGoldBar(4, review.value_rating)}></td>
                    <td className={this.isGoldBar(5, review.value_rating)}></td></tr></tbody></table>
                  <div>Product quality</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.quality_rating)}></td>
                    <td className={this.isGoldBar(2, review.quality_rating)}></td>
                    <td className={this.isGoldBar(3, review.quality_rating)}></td>
                    <td className={this.isGoldBar(4, review.quality_rating)}></td>
                    <td className={this.isGoldBar(5, review.quality_rating)}></td></tr></tbody></table>
                  <div>Appearance</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(2, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(3, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(4, review.appearance_rating)}></td>
                    <td className={this.isGoldBar(5, review.appearance_rating)}></td></tr></tbody></table>
                  <div>Works as expected</div>
                  <table className="reviewRatingBars"><tbody><tr>
                    <td className={this.isGoldBar(1, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(2, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(3, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(4, review.works_as_expected_rating)}></td>
                    <td className={this.isGoldBar(5, review.works_as_expected_rating)}></td></tr></tbody></table>
                </div>
              </td>
            </tr>
          </tbody>
      </table>
      </div>
    )
  }

}
export default SingleReview
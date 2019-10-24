/* eslint-disable react/no-danger */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React from 'react';
import $ from 'jquery';

class SingleReview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.reviewAction = this.reviewAction.bind(this);
    this.updateHelpful = this.updateHelpful.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      reported: 'Report',
      helpfulClicks: [],
      yesClicks: 0,
      noClicks: 0,
    };
  }

  componentDidMount() {
    const { review } = this.props;
    this.setState({
      yesClicks: review.helpful_count,
      noClicks: review.not_helpful_count,
    });
  }

  updateHelpful(action) {
    if (action === 'reported_count') {
      return;
    }
    let newYes; let newNo;
    const { yesClicks, noClicks } = this.state;
    if (action === 'helpful_count') {
      newYes = 1 + yesClicks;
      newNo = noClicks;
    } else {
      newYes = yesClicks;
      newNo = 1 + noClicks;
    }
    this.setState({
      yesClicks: newYes,
      noClicks: newNo,
    });
  }

  reviewAction(id, action) {
    const { helpfulClicks } = this.state;
    const list = helpfulClicks;
    if (action !== 'reported_count') {
      list.push(id);
    }
    $.ajax({
      type: 'POST',
      datatype: 'json',
      contentType: 'application/json',
      url: 'http://localhost:3003/api-increment',
      data: JSON.stringify({ column: action, id }),
      success: this.setState({
        helpfulClicks: list,
      },
      () => { this.updateHelpful(action); }),
    });
  }

  clickHandler(e) {
    if (e.target.id.indexOf('reviewHelpfulYes') > -1) {
      const reviewId = e.target.id.slice(16);
      const action = 'helpful_count';
      this.reviewAction(reviewId, action);
    } else if (e.target.id.indexOf('reviewHelpfulNo') > -1) {
      const reviewId = e.target.id.slice(15);
      const action = 'not_helpful_count';
      this.reviewAction(reviewId, action);
    } else if (e.target.id.indexOf('reviewReport') > -1) {
      const reviewId = e.target.id.slice(12);
      const action = 'reported_count';
      this.reviewAction(reviewId, action);
      this.setState({
        reported: 'Reported',
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  showDate(mysqlTime) {
    const year = Number(mysqlTime.substring(0, 4));
    const month = Number(mysqlTime.substring(5, 7)) - 1;
    const day = Number(mysqlTime.substring(8, 10));
    const days = (new Date() - new Date(year, month, day)) / 86400000;
    if (days < 2) {
      return 'today';
    } if (days < 14) {
      return `${Math.floor(days).toString()} days ago`;
    } if (days <= 60) {
      return `${Math.floor(days / 7).toString()} weeks ago`;
    } if (days < 365) {
      return `${Math.floor(days / 30).toString()} months ago`;
    } if (days < 730) {
      return 'one year ago';
    }
    return `${Math.floor(days / 365).toString()} years ago`;
  }

  showRecommendation(recommend) {
    if (recommend === 1) {
      return 'Yes, I recommend this product';
    } if (recommend === 0) {
      return 'No, I do not recommend this product';
    }
    return '';
  }

  showStars(count) {
    let result = '';

    for (let i = 0; i < count; i += 1) {
      result += '&#9733';
    }
    return result;
  }

  showNoStars(count) {
    let result = '';
    for (let i = 0; i < 5 - count; i += 1) {
      result += '&#9733';
    }
    return result;
  }


  isGoldBar(number, rating) {
    if (number <= Number(rating)) {
      return 'reviewBarGold';
    }
    return 'reviewNoGold';
  }

  render(
  ) {
    const { review } = this.props;
    const { reported, yesClicks, noClicks, helpfulClicks } = this.state;
    const disableHelpButton = helpfulClicks.indexOf(review.id.toString()) > -1;
    return (
      <div>
        <hr style={{ border: '1px dotted', borderstyle: 'none none dotted', color: 'rgb(225,225,225' }} />
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td className="reviewSingleMain">
                <div>
                  <span
                    className="reviewGoldStars"
                    dangerouslySetInnerHTML={{ __html: this.showStars(review.overall_rating) }}
                  />
                  <span
                    className="reviewGreyStars"
                    dangerouslySetInnerHTML={{ __html: this.showNoStars(review.overall_rating) }}
                  />
                  <span>
                    {' '}
                    {review.author}
                    {' '}
                  </span>
                  <span> · </span>
                  <span className="reviewDate">{this.showDate(review.date)}</span>
                </div>
                <div className="reviewTitle">{review.title}</div>
                <p>{review.text}</p>
                <p>{this.showRecommendation(review.recommended)}</p>
                <div>
                  Helpful?
                  <button type="button" disabled={disableHelpButton} key={`${review.id}y`} id={`reviewHelpfulYes${review.id}`} className="reviewHelpYes" onClick={this.clickHandler}>
                    <span style={{ color: 'black' }}>Yes </span>
                    ·
                    {' '}
                    {yesClicks}
                  </button>
                  <button type="button" disabled={disableHelpButton} key={`${review.id}n`} id={`reviewHelpfulNo${review.id}`} className="reviewHelpNo" onClick={this.clickHandler}>
                    <span style={{ color: 'black' }}>No </span>
                    {' '}
                    ·
                    {' '}
                    {noClicks}
                  </button>
                  <button type="button" disabled={reported === 'Reported'} key={`${review.id}r`} id={`reviewReport${review.id}`} className="reviewHelpReport" onClick={this.clickHandler}>{reported}</button>

                </div>
              </td>
              <td className="reviewSingleRatings">
                <div>
                  <div>Value for money</div>
                  <table className="reviewRatingBars">
                    <tbody>
                      <tr>
                        <td className={this.isGoldBar(1, review.value_rating)} />
                        <td className={this.isGoldBar(2, review.value_rating)} />
                        <td className={this.isGoldBar(3, review.value_rating)} />
                        <td className={this.isGoldBar(4, review.value_rating)} />
                        <td className={this.isGoldBar(5, review.value_rating)} />

                      </tr>

                    </tbody>

                  </table>
                  <div>Product quality</div>
                  <table className="reviewRatingBars">
                    <tbody>
                      <tr>
                        <td className={this.isGoldBar(1, review.quality_rating)} />
                        <td className={this.isGoldBar(2, review.quality_rating)} />
                        <td className={this.isGoldBar(3, review.quality_rating)} />
                        <td className={this.isGoldBar(4, review.quality_rating)} />
                        <td className={this.isGoldBar(5, review.quality_rating)} />

                      </tr>

                    </tbody>

                  </table>
                  <div>Appearance</div>
                  <table className="reviewRatingBars">
                    <tbody>
                      <tr>
                        <td className={this.isGoldBar(1, review.appearance_rating)} />
                        <td className={this.isGoldBar(2, review.appearance_rating)} />
                        <td className={this.isGoldBar(3, review.appearance_rating)} />
                        <td className={this.isGoldBar(4, review.appearance_rating)} />
                        <td className={this.isGoldBar(5, review.appearance_rating)} />

                      </tr>

                    </tbody>

                  </table>
                  <div>Works as expected</div>
                  <table className="reviewRatingBars">
                    <tbody>
                      <tr>
                        <td className={this.isGoldBar(1, review.works_as_expected_rating)} />
                        <td className={this.isGoldBar(2, review.works_as_expected_rating)} />
                        <td className={this.isGoldBar(3, review.works_as_expected_rating)} />
                        <td className={this.isGoldBar(4, review.works_as_expected_rating)} />
                        <td className={this.isGoldBar(5, review.works_as_expected_rating)} />

                      </tr>

                    </tbody>

                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default SingleReview;

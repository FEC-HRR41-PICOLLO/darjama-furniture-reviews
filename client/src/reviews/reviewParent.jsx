import React from 'react';
import $ from 'jquery';
import ReviewList from './reviewList.jsx';
import SnapShot from './snapShot.jsx';
import Averages from './average.jsx';

class ReviewParent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: [],
      helpfulClicks: [],
      selectedStars: [],
    };
    this.changeFilter = this.changeFilter.bind(this);
    this.reviewAction = this.reviewAction.bind(this);
  }

  componentDidMount() {
    this.getReviewsByProductId(this.urlProductId());
  }

  getReviewsByProductId(id) {
    $.get('/api-reviews', { product_id: id }, (data) => {
      this.setState({
        reviewsArray: data,
      });
    }, 'json');
  }

  // change filtering of review list based on selected star overall rating in review Summary
  changeFilter(classname) {
    const value = classname.slice(0, 1);
    const change = classname.slice(1);
    if (change === 'reviewAddFilter') {
      this.setState({
        selectedStars: [value],
        reviewsArray: [],
      }, () => {
        this.getReviewsByProductId(this.urlProductId());
      });
    }
    if (change === 'reviewClearFilter') {
      this.setState({
        selectedStars: [],
        reviewsArray: [],
      }, () => {
        this.getReviewsByProductId(this.urlProductId());
      });
    }
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
      url: '/api-increment',
      data: JSON.stringify({ column: action, id }),
      success: this.setState({
        helpfulClicks: list,
      },
      () => { this.getReviewsByProductId(this.urlProductId()); }),
    });
  }


  // eslint-disable-next-line class-methods-use-this
  urlProductId() {
    const questMarkLocation = (window.location.href).indexOf('?');
    return (window.location.href).slice(questMarkLocation + 1);
  }

  render() {
    const { reviewsArray, selectedStars, helpfulClicks } = this.state;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td style={{ width: '12px' }} />
              <td>
                <table width="100%">
                  <thead><tr><td className="tableHeading">Reviews</td></tr></thead>
                  <tbody>
                    <tr>
                      <td className="reviewSnapShot" width="50%">
                        <SnapShot
                          reviews={reviewsArray}
                          filtered={selectedStars}
                          changeFilter={this.changeFilter}
                        />
                      </td>
                      <td className="reviewAverageSummary" width="50%">
                        <Averages reviews={reviewsArray} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td className="reviewList" width="100%">
                        <ReviewList
                          reviews={reviewsArray}
                          helpfulClicks={helpfulClicks}
                          filtered={selectedStars}
                          reviewAction={this.reviewAction}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

            </tr>

          </tbody>

        </table>
      </div>
    );
  }
}

export default ReviewParent;

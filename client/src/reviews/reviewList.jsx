/* eslint-disable max-len */
/* eslint-disable react/prop-types */

import React from 'react';
import SingleReview from './singleReview.jsx';


class ReviewList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      lastPage: 1,
    };
    this.setLastPage = this.setLastPage.bind(this);
    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
  }


  componentDidMount() {
    setTimeout(() => { this.setLastPage(); }, 1000);
  }

  setLastPage() {
    const { reviews, filtered } = this.props;
    let finalPage;
    const { length } = reviews
      .filter(((review) => (filtered.length > 0 ? Number(filtered[0]) === review.overall_rating : -1)));
    if (length <= 8) {
      finalPage = 1;
    } else {
      finalPage = Math.ceil((length - 8) / 30) + 1;
    }
    this.setState({
      lastPage: finalPage,
    });
  }

  pageUp() {
    const { currentPage, lastPage } = this.state;
    if (currentPage < lastPage) {
      this.setState({
        currentPage: currentPage + 1,
      });
    }
  }

  pageDown() {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
  }

  rangeOfReviews() {
    const { reviews, filtered } = this.props;
    const { currentPage } = this.state;
    let start;
    let end;
    const { length } = reviews.filter((review) => (filtered
      .length > 0 ? Number(filtered[0]) === review.overall_rating : -1));
    if (currentPage === 1) {
      start = 1;
    } else {
      start = 9 + (currentPage - 2) * 30;
    }
    if (currentPage === 1) {
      end = Math.min(length, 8);
    } else {
      end = Math.min((currentPage - 1) * 30 + 8, length);
    }
    return `${start} - ${end} of ${length} Reviews`;
  }


  recordSelection() {
    const { currentPage } = this.state;
    if (currentPage === 1) {
      return [0, 8];
    }
    const start = (currentPage - 2) * 30 + 8;
    const end = (currentPage - 1) * 30 + 7;
    return [start, end];
  }


  render(

  ) {
    const {
      filtered, reviews, reviewAction, helpfulClicks,
    } = this.props;
    const { currentPage, lastPage } = this.state;
    const reviewList = reviews
      .filter((review) => (filtered.length > 0 ? Number(filtered[0]) === review.overall_rating : -1))
      .slice(...this.recordSelection())
      .map((review) => (
        <div key={review.id}>
          <SingleReview review={review} helpfulClicks={helpfulClicks} reviewAction={reviewAction} />
        </div>
      ));
    return (
      <div>
        {this.rangeOfReviews()}
        {reviewList}
        <div>
          <table style={{ maxWidth: '1200px', width: '100%' }}>

            <tbody>
              <tr>
                <td style={{ width: '50%', verticalAlign: 'bottom' }}>{this.rangeOfReviews()}</td>
                <td style={{ width: '50%', verticalAlign: 'bottom', textAlign: 'right' }}>
                  {' '}
                  <button type="button" className="reviewsPage" disabled={currentPage === 1} onClick={this.pageDown}>&#9664;</button>
                  <button type="button" className="reviewsPage" disabled={currentPage === lastPage} onClick={this.pageUp}>&#9658;</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReviewList;

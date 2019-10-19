import React from 'react'
import SingleReview from './singleReview.jsx'


class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      lastPage: 1,
    }
    this.setLastPage = this.setLastPage.bind(this);
    this.pageUp = this.pageUp.bind(this);
    this.pageDown = this.pageDown.bind(this);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    forceUpdate();
  }

  setLastPage(){
    var finalPage;
    if (this.props.reviews.length <= 8) {
      finalPage = 1;
    } else {
    finalPage = Math.ceil((this.props.reviews.length - 8)/30)+1;
    }
    this.setState({
      lastPage: finalPage
    })
    console.log("finalPage ", finalPage)
  }

  pageUp(){
    console.log('pageUp ', this.state.currentPage);
    if(this.state.currentPage < this.state.lastPage) {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
      forceUpdateHandler();
    }
  }

  pageDown(){
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
      forceUpdateHandler();
    }
  }

  rangeOfReviews(){
    var start;
    var end;
    var length = this.props.reviews.length;
    if (this.state.currentPage === 1) {
      start = 1;
    } else {
      start = 9 + (this.state.currentPage - 2) * 30;
    }
    if (this.state.currentPage === 1) {
        end = Math.min(length, 8);
    } else {
      end = Math.min((this.state.currentPage - 1) * 30 + 8, length)
    }
    return start + " - " + end + " of " + length +" Reviews";
  }


  recordSelection() {
    if (this.state.currentPage === 1) {
      return [0,7];
    } else {
      var start = (this.state.currentPage - 2) * 30 + 8;
      var end = (this.state.currentPage - 1) * 30 + 7
      console.log("recordSelection ", start, end)
      return [start, end];
    }
  }

  componentDidMount() {
  setTimeout(() => {this.setLastPage()}, 1000)
  }

  render(
    reviewList = this.props.reviews
      .slice(...this.recordSelection())
      .filter(review => this.props.filter.length > 0 ? this.props.filter[0] == review.overall_rating : -1 )
      .map(review => <div key={review.id}><SingleReview review={review} helpfulClicks={this.props.helpfulClicks} reviewAction={this.props.reviewAction}/>
      </div>
    )
  ) {
    return(
      <div>
        {this.rangeOfReviews()}
        {reviewList}
        <div>
          <table style={{width: "100%"}}>
            <tbody>
              <tr>
                <td style={{width: "50%", verticalAlign: "bottom"}}>{this.rangeOfReviews()}</td>
                <td style={{width: "50%", verticalAlign: "bottom", textAlign: "right"}}> <button className="reviewsPage" disabled={this.state.currentPage === 1} onClick={this.pageDown}>&#9664;</button><button className="reviewsPage" disabled={this.state.currentPage === this.state.lastPage} onClick={this.pageUp}>&#9658;</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ReviewList
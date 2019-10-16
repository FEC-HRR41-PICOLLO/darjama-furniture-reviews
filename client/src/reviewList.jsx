class SingleReview extends React.Component {
  constructor(props) {
    super(props);

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
    for (var i = 1; i <=5; i++) {
      if (i <= count) {
        result += '&#9733';
      } else {
        result += '&#9734';
      }
    }
    return result;
  }

  render(
  ) {
    return(
      <div>
        <table>
          <tbody>
            <tr>
             <td>
              <div>
                <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.overall_rating)}}/>
                <span> {this.props.review.author} </span>
                <span>{this.showDate(this.props.review.date)}</span>
              </div>
              <div>{this.props.review.title}</div>
              <p>{this.props.review.text}</p>
              <p>{this.showRecommendation(this.props.review.recommended)}</p>
              <div>Helpful?
                <button>Yes - {this.props.review.helpful_count}</button>
                <button>No - {this.props.review.not_helpful_count}</button><button>Report</button></div>
              </td>
              <td>
                <div>
                  <div>Value for money</div>
                  <span className="reviewStars" dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.value_rating)}}/>
                  <div>Product quality</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.quality_rating)}}/>
                  <div>Appearance</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.appearance_rating)}}/>
                  <div>Ease of assembly</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.ease_of_assembly_rating)}}/>
                  <div>Works as expected</div>
                  <span dangerouslySetInnerHTML={{__html: this.showStars(this.props.review.works_as_expected_rating)}}/>
                </div>
              </td>
            </tr>
          </tbody>
      </table>
      </div>
    )
  }

}



class ReviewList extends React.PureComponent {
  constructor(props) {
    super(props);

  }

recordSelection() {
  if (this.props.page === 1) {
    return [0,7];
  } else {
    var start = (this.props.page - 2) * 30 + 8;
    var end = (this.props.page - 1) * 30 + 7
    return [start, end];
  }
}

  render(
    reviewList = this.props.reviews
      .slice(...this.recordSelection())
      .filter(review => this.props.filter.length > 0 ? this.props.filter[0] == review.overall_rating : -1 )
      .map(review => <div key={review.id}><SingleReview review={review}/>
      </div>
    )
  ) {
    return(
      <div>
      {reviewList}
      <div><button className="reviewsLastPage">&#9664;</button><button className="reviewsNextPage">&#9658;</button></div>
      </div>
    )
  }
}

export default ReviewList
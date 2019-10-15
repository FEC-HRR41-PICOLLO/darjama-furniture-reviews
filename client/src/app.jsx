import ReviewList from './reviewList.jsx'
import SnapShot from './snapShot.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsArray: [],
      helpfulClicks:[],
      reportedReviews: [],
      currentPage: 1,
      selectedStars: []
    }

  }

  urlProductId() {
    var questMarkLocation = (window.location.href).indexOf('?');
    return (window.location.href).slice(questMarkLocation + 1)
  }

  getReviewsByProductId(id) {
    console.log(id);
    $.get('/api-reviews', { product_id: id }, (data) =>
      {
      this.setState({
        reviewsArray: data
      }, () => {console.log(this.state.reviewsArray)})}, 'json'
    )
  }

  componentDidMount() {
    this.getReviewsByProductId(this.urlProductId())
  }

  render() {
    return(
      <div>
        Reviews
        <table>
          <tbody>
            <tr>
              <td className="reviewSnapShot">
                <SnapShot reviews={this.state.reviewsArray} filter={this.state.selectedStars} />
              </td>
              <td className="reviewAverage">
                Review Average Ratings Go Here
              </td>
            </tr>
            <tr>
              <td className="reviewList">
                <ReviewList reviews={this.state.reviewsArray} page={this.state.currentPage} helpfulClicks={this.state.helpfulClicks} reported={this.state.reportedReviews} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
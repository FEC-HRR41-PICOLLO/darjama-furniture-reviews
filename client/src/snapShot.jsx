class SnapShot extends React.Component {
  constructor(props) {
    super(props);

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
  {
    return (
      <div>
        <p>Rating Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <div><span>5 &#9733; </span><span> -= {this.starPercent('5')}% =- </span><span> {this.starCount('5') || 0} </span></div>
        <div><span>4 &#9733; </span><span> -= {this.starPercent('4')}% =- </span><span> {this.starCount('4') || 0} </span></div>
        <div><span>3 &#9733; </span><span> -= {this.starPercent('3')}% =- </span><span> {this.starCount('3') || 0} </span></div>
        <div><span>2 &#9733; </span><span> -= {this.starPercent('2')}% =- </span><span> {this.starCount('2') || 0} </span></div>
        <div><span>1 &#9733; </span><span> -= {this.starPercent('1')}% =- </span><span> {this.starCount('1') || 0} </span></div>
      </div>
    )
  }

}

export default SnapShot
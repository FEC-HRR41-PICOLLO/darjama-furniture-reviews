class SnapShotButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render ()
    { const filter = this.props.filter;
      let button1;
      let button2;
      if (filter.length > 0) {
        button1 = <button>{this.props.filter[0]} stars &#9447;</button>; button2 = <button>clear &#9447;</button>;
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
  {
    return (
      <div>
        <p>Rating Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <div className="5reviewAddFilter" onClick={this.handleClick}>
          <span>5 &#9733; </span><span> -= {this.starPercent('5')}% =- </span><span> {this.starCount('5') || 0} </span></div>
        <div className="4reviewAddFilter" onClick={this.handleClick}>
          <span>4 &#9733; </span><span> -= {this.starPercent('4')}% =- </span><span> {this.starCount('4') || 0} </span></div>
        <div className="3reviewAddFilter" onClick={this.handleClick}>
          <span>3 &#9733; </span><span> -= {this.starPercent('3')}% =- </span><span> {this.starCount('3') || 0} </span></div>
        <div className="2reviewAddFilter" onClick={this.handleClick}>
          <span>2 &#9733; </span><span> -= {this.starPercent('2')}% =- </span><span> {this.starCount('2') || 0} </span></div>
        <div className="1reviewAddFilter" onClick={this.handleClick}><
          span>1 &#9733; </span><span> -= {this.starPercent('1')}% =- </span><span> {this.starCount('1') || 0} </span></div>
        <div className="0reviewClearFilter" onClick={this.handleClick}><SnapShotButtons filter={this.props.filter}/></div>
      </div>
    )
  }

}

export default SnapShot
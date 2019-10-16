class Averages extends React.PureComponent {
  constructor(props) {
    super(props);

  }


  AverageNode() {
    this._scores = [];
    this.avg = function() {
      if (this._scores.length === 0) {
        return 0;
      }
      return (this._scores.reduce((x,y) => y += x))/this._scores.length;
    };
  }

  getAverages(reviews) {
    var result ={};
    var attributes = ['overall_rating', 'value_rating', 'quality_rating', 'appearance_rating', 'ease_of_assembly_rating', 'works_as_expected_rating' ]
    for (var i = 0; i < attributes.length; i++) {
      result[attributes[i]] = new this.AverageNode();
    }
    for (var i = 0; i < reviews.length; i++) {
      for (var j = 0; j < attributes.length; j++) {
        if (reviews[i][attributes[j]]) {
          result[attributes[j]]._scores.push(reviews[i][attributes[j]]);
        }
      }
    }
    return result;
  }

  render (
  )
  { var Averages = this.getAverages(this.props.reviews);
    return (
      <div key={this.props.reviews}>
        <p>Average Customer Ratings</p>
        <div className="reviewAverageOverall">
          <span>Overall</span><span> -= {Averages.overall_rating.avg().toFixed(1)} =- </span><span> {Averages.overall_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageValue">
          <span>Value for money</span><span> -= {Averages.value_rating.avg().toFixed(1)} =- </span><span> {Averages.value_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageQuality">
          <span>Product quality </span><span> -= {Averages.quality_rating.avg().toFixed(1)} =- </span><span> {Averages.quality_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageAppearance">
          <span>Appearance </span><span> -= {Averages.appearance_rating.avg().toFixed(1)} =- </span><span> {Averages.appearance_rating.avg().toFixed(1)} </span></div>
        <div className="reviewAverageWorks"><
          span>Works as expected</span><span> -= {Averages.works_as_expected_rating.avg().toFixed(1)} =- </span><span> {Averages.works_as_expected_rating.avg().toFixed(1)} </span></div>

      </div>
    )
  }

}

export default Averages
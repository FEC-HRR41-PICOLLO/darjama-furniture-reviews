

class Size extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionData: {}
    }
  }
  urlProductId() {
    var questMarkLocation = (window.location.href).indexOf('?');
    return (window.location.href).slice(questMarkLocation + 1)
  }

  getDescriptionByProductId(id) {
    console.log(id);
    $.get('/api-product-data', { product_id: id }, (data) =>
      {
      this.setState({
        descriptionData: data[0]
      }, () => {console.log(this.state.descriptionData)})}, 'json'
    )
  }

  componentDidMount() {
    this.getDescriptionByProductId(this.urlProductId())
  }

  render() {

    return(
        <table>
          <tbody>
            <tr>
              <td style={{width:"12px"}}></td>
              <td style={{fontSize:"14px"}}>
                <div> <span style={{fontWeight:"700"}}>Width: </span>{this.state.descriptionData.width}"</div>
                <div> <span style={{fontWeight:"700"}}>Length: </span>{this.state.descriptionData.length}"</div>
                <div> <span style={{fontWeight:"700"}}>Height: </span>{this.state.descriptionData.height}"</div>
                <div> <span style={{fontWeight:"700"}}>Weight: </span>{this.state.descriptionData.weight} lbs.</div>
                <p></p>
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}


export default Size
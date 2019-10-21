

class Materials extends React.Component {
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
              <div style={{fontSize:"16px",fontWeight:"700"}}>Environment</div>
                <div style={{fontSize:"14px"}}>{this.state.descriptionData.environment}</div>
                <p></p>
                <div style={{fontSize:"16px",fontWeight:"700"}}>Materials</div>
                <div style={{fontSize:"14px"}}>{this.state.descriptionData.materials}</div>
                <p></p>
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}


export default Materials
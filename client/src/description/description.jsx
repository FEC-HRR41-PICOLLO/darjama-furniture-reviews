

class Description extends React.Component {
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
              <td>
                <span className="descriptionHeading" style={{background:"black",color:"white",fontSize:"16px", fontWeight:"700", padding:"2px"}}> {this.state.descriptionData.id}
                </span>
                <p style={{fontSize:"14px"}}>{this.state.descriptionData.description}</p>
                <div style={{fontSize:"16px",fontWeight:"700"}}>Designer</div>
                <div style={{fontSize:"14px"}}>{this.state.descriptionData.designer}</div>
                <p></p>
              </td>
            </tr>
          </tbody>
        </table>
    )
  }
}


export default Description
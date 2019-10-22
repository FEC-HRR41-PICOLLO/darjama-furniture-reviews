import React from 'react';
import $ from 'jquery';

class Materials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionData: {},
    };
  }

  componentDidMount() {
    this.getDescriptionByProductId(this.urlProductId());
  }

  getDescriptionByProductId(id) {
    // console.log(id);
    $.get('/api-product-data', { product_id: id }, (data) => {
      this.setState({
        descriptionData: data[0],
      });
    }, 'json');
  }

  // eslint-disable-next-line class-methods-use-this
  urlProductId() {
    const questMarkLocation = (window.location.href).indexOf('?');
    return (window.location.href).slice(questMarkLocation + 1);
  }

  render() {
    const { descriptionData } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ width: '12px' }} />
            <td style={{ fontSize: '14px' }}>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>Environment</div>
              <div style={{ fontSize: '14px' }}>{descriptionData.environment}</div>
              <p />
              <div style={{ fontSize: '16px', fontWeight: '700' }}>Materials</div>
              <div style={{ fontSize: '14px' }}>{descriptionData.materials}</div>
              <p />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}


export default Materials;

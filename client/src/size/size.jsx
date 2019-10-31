import React from 'react';
import $ from 'jquery';

class Size extends React.Component {
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
    if (questMarkLocation === -1) {
      return '0';
    }
    return (window.location.href).slice(questMarkLocation + 1);
  }

  sizeStructure() {
    const { descriptionData } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ width: '12px' }} />
            <td style={{ fontSize: '14px' }}>
              <div>
                {' '}
                <span style={{ fontWeight: '700' }}>Width: </span>
                {descriptionData.width}
                &quot;
              </div>
              <div>
                {' '}
                <span style={{ fontWeight: '700' }}>Length: </span>
                {descriptionData.length}
                &quot;
              </div>
              <div>
                {' '}
                <span style={{ fontWeight: '700' }}>Height: </span>
                {descriptionData.height}
                &quot;
              </div>
              <div>
                {' '}
                <span style={{ fontWeight: '700' }}>Weight: </span>
                {descriptionData.weight}
                {' '}
                lbs.
              </div>
              <p />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }


  render() {
    const { descriptionData } = this.state;
    return (
      <div>
        {!descriptionData ? (
          <p>
          Sorry, we don&apos;t have any size information for this product.
          </p>
        ) : this.sizeStructure()}
      </div>

    );
  }
}
export default Size;

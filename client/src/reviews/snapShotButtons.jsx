/* eslint-disable react/prop-types */
const React = require('react');

function SnapShotButtons(props) {
  let button1;
  let button2;
  const { filter } = props;
  if (filter.length > 0) {
    button1 = (
      <button type="button" className="reviewFilterButton" style={{ backgroundColor: '#0e7fd5', color: 'white' }}>
        {filter[0]}
        {' '}
        Stars &#9447;
      </button>
    );
    button2 = <button type="button" className="reviewFilterButton">Clear All &#9447;</button>;
  }
  return (
    <div>
      {button1}
      {' '}
      {button2}
    </div>
  );
}

export default SnapShotButtons;

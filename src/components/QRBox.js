import React from 'react';

class QRBox extends React.Component {
  render() {
    return (
      <div className='QRBox'>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default QRBox;

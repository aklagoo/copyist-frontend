import React from 'react';
import "../css/QRBox.css";

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

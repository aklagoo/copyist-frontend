import React from 'react';
import QRCode from 'react-qr-code';
import "../css/QRBox.css";

class QRBox extends React.Component {
  render() {
    return (
      <div className={'QRBox' + this.props.hiddenClass}>
        <QRCode value={this.props.url} bgColor='#FFFFFF' fgColor='#444444'/>
        <p>Scan the QR code to access the link.</p>
      </div>
    );
  }
}

export default QRBox;

import React from 'react';
import "../css/TextBox.css";

class TextBox extends React.Component {
  render() {
    return (
      <div className='TextBox'>
        <textarea onChange={this.props.emitMessage} value={this.props.message} />
      </div>
    );
    
  }
}

export default TextBox;
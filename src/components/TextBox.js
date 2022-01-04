import React from 'react';

class TextBox extends React.Component {
  render() {
    return (
      <div className='TextBox'>
        <textarea>{this.props.message}</textarea>
      </div>
    );
    
  }
}

export default TextBox;
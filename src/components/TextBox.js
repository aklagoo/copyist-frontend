import React from 'react';
import "../css/TextBox.css";
import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js'; 

class TextBox extends React.Component {
  constructor() {
    super();
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleCopy() {
    navigator.clipboard.writeText(this.props.message);
  }

  render() {
    return (
      <div className='TextBox'>
        <textarea onChange={this.props.emitMessage} value={this.props.message} />
        <div className='TextBoxButtons'>
          <button className='ButtonCopy' onClick={this.handleCopy}><Icon path={mdiContentCopy} size={0.8}/> Copy</button>
        </div>
      </div>
    );
    
  }
}

export default TextBox;
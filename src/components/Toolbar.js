import React from 'react';
import "../css/Toolbar.css";
import Icon from '@mdi/react';
import { mdiQrcode } from '@mdi/js'; 

class Toolbar extends React.Component {
  render() {
    return (
      <div className='Toolbar'>
          <button className={'ButtonToggleQR' + this.props.hiddenClass} onClick={this.props.toggleHiddenClass}><Icon path={mdiQrcode} size={1}/></button>
      </div>
    );
  }
}

export default Toolbar;
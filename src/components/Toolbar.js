import React from 'react';
import Icon from '@mdi/react';
import { mdiQrcode } from '@mdi/js'; 

class Toolbar extends React.Component {
  render() {
    const style = {
      backgroundColor: "#CCCCCC",
      color: "rgba(0, 0, 0, 0.4)",
    };

    return (
      <div className='Toolbar'>
          <button style={style}><Icon path={mdiQrcode} size={1}/></button>
      </div>
    );
  }
}

export default Toolbar;
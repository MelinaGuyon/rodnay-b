import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';
import anime from 'animejs';

require('./Header.scss');

class Header extends React.Component {
  component = React.createRef();

  render () {
    const header = i18n.localize('header');

    return (
      <div className='header' ref={this.component}>
        <div className='info'><a href={header.url}>i</a></div>
        <img className='img' src={header.img} />
      </div>
    );
  }
}

export default Header;

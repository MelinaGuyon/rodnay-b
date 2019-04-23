import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';

require('./Intro.scss');

class Intro extends React.Component {
  component = React.createRef();

  constructor (props) {
    super(props);
    this.state = {
      swipe: false,
      hidden: false
    }

    setTimeout(this.handleSwipe, 600);
  }

  bind = () => {
    store.watch('swipe', this.handleSwipe);
  }

  handleSwipe = () => {
    store.set('start', 0) // launch rest of app
    this.setState({ 'hidden': true })
    // hide intro
  }

  allowSwipe = () => {
    // allow swipe after all animations
    this.setState({ 'swipe': true })
  }

  render () {
    const { swipe, hidden } = this.state;
    const intro = i18n.localize('intro');

    return (
      <div className={'intro ' + (hidden ? 'hidden' : '') } ref={this.component}>
        <div className='title'>
          <span>{intro.titleBase}</span><span>{intro.title.text}</span>
        </div>
        <div className={'cta ' + (swipe ? 'active' : '') }>
          <span>{intro.cta}</span>
        </div>
      </div>
    );
  }
}

export default Intro;

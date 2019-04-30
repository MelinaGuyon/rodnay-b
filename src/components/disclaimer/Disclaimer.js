import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';
import config from 'config';

require('./Disclaimer.scss');

class Disclaimer extends React.Component {
  component = React.createRef();

  constructor () {
    super();
    this.state = {
      show: config.desktop,
      text: !config.desktop ? i18n.localize('disclaimer').textMobile : i18n.localize('disclaimer').text
    }
  }

  componentDidMount () {
    if (config.device) {
      store.watch('resize', this.handleOrientation)
      this.handleOrientation()
    }
  }

  componentWillUnmount () {
    if (config.device) {
      store.unwatch('resize', this.handleOrientation)
    }
  }

  handleOrientation = (e) => {
    const size = store.get('resize')
    if (size.width > size.height) this.setState({ show: true })
    else this.setState({ show: false })
  }

  render () {
    const disclaimer = i18n.localize('disclaimer');

    return this.state.show
      ? <div className='disclaimer' ref={this.component}>
        <div className='container'>
          <img className='img' src={disclaimer.img} alt=""/>
          <p className='text'>{this.state.text}</p>
        </div>
      </div>
      : ''
  }
}

export default Disclaimer;

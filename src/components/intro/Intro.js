import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';
import anime from 'animejs';

require('./Intro.scss');

class Intro extends React.Component {
  component = React.createRef();
  animation = React.createRef();

  constructor (props) {
    super(props);
    this.state = {
      swipe: false,
      hidden: false,
      titleNumber: Object.keys(i18n.localize('intro').title).length
    }
  }

  componentDidMount () {
    // setTimeout(this.handleSwipe, 600); // passer vite
    setTimeout(this.animate, 200);
  }

  bind = () => {
    store.watch('swipe', this.handleSwipe);
  }

  unbind = () => {
    store.unwatch('swipe', this.handleSwipe);
  }

  handleSwipe = () => {
    this.unbind();
    store.set('start', 0);
    this.setState({ 'hidden': true });
  }

  allowSwipe = () => {
    this.bind();
    this.setState({ 'swipe': true })
  }

  animate = () => {
    const items = [...this.animation.current.querySelectorAll('.item')];

    for (let i = 0; i < items.length; i++) {
      setTimeout(() => {
        items[i].classList.add('visible');
        setTimeout(() => {
          if (i < items.length - 1) items[i].classList.add('hidden');
          else this.allowSwipe();
        }, 400)
      }, i * 600)
    }
  }

  render () {
    const { swipe, hidden, titleNumber } = this.state;
    const intro = i18n.localize('intro');

    let imgs = [];
    for (let i = 0; i < titleNumber; i++) {
      imgs.push(
        <img key={i} className='item img' src={intro.title['url' + i]} />
      )
    }

    return (
      <div className={'intro ' + (hidden ? 'hidden' : '') } ref={this.component}>
        <div className='title'>
          <div className='animation' ref={this.animation}>
            {imgs}
          </div>
        </div>
        <div className={'cta ' + (swipe ? 'active' : '') }>
          <span>{intro.cta}</span>
        </div>
      </div>
    );
  }
}

export default Intro;

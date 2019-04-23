import Modernizr from 'modernizr';
import React from 'react';
import i18n from 'abstract/i18n/i18n';
import map from 'lodash/map';
import store from 'tools/store';
import SliderItem from './SliderItem';

require('./Slider.scss');

const Transform = Modernizr.prefixed('transform');

class Slider extends React.Component {
  wrapper = React.createRef();
  items = [];
  index = 0;
  min = 0;
  max = i18n.localize('home').slider.length - 1;
  numberItems = i18n.localize('home').slider.length;
  itemWidth = window.innerWidth

  componentDidMount () {
    this.bind();
  }

  componentWillUnmount () {
    this.unbind();
  }

  bind = () => {
    store.watch('start', this.bindSwipe);
  }

  bindSwipe = () => {
    // store.watch('swipe', this.handleSwipe);
    document.addEventListener('click', this.handleSwipe)
  }

  unbind = () => {
    store.unwatch('start', this.bindSwipe);
    // store.unwatch('swipe', this.handleSwipe);
    document.removeEventListener('click', this.handleSwipe)
  }

  handleSwipe = () => {
    // check delta etc
    const prev = this.index;
    this.index++;
    this.index = Math.max(this.min, (Math.min(this.max, this.index)));

    if (this.index === prev) return;
    this.goTo(this.index, prev - this.index < 0)
  }

  goTo = (index, dir) => {
    this.wrapper.current.style[Transform] = 'translateX(' + (-this.index * this.itemWidth) + 'px)'
  }

  renderSliderItem (item, index) {
    return [
      <SliderItem item={item} key={index}></SliderItem>
    ]
  }

  render () {
    const slider = i18n.localize('home').slider;

    return (
      <div className='slider'>
        <div className='slider-wrapper' ref={this.wrapper}>
          {map(slider, this.renderSliderItem)}
        </div>
      </div>
    )
  }
}

export default Slider

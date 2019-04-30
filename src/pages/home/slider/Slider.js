import Modernizr from 'modernizr';
import React from 'react';
import i18n from 'abstract/i18n/i18n';
import map from 'lodash/map';
import store from 'tools/store';
import SliderItem from './SliderItem';
import SliderBar from './SliderBar';

require('./Slider.scss');

const Transform = Modernizr.prefixed('transform');

class Slider extends React.Component {
  wrapper = React.createRef();
  sliderBar = React.createRef();
  items = [];
  index = 0;
  min = 0;
  max = i18n.localize('home').slider.length - 1;
  numberItems = i18n.localize('home').slider.length;
  itemWidth = window.innerWidth
  isSwipping = false;

  componentDidMount () {
    this.bind();
  }

  componentWillUnmount () {
    this.unbind();
  }

  bind = () => {
    store.watch('start', this.start);
    store.watch('resize', this.resize);
  }

  bindSwipe = () => {
    store.watch('swipe', this.handleSwipe);
  }

  unbind = () => {
    store.unwatch('start', this.start);
    store.unwatch('swipe', this.handleSwipe);
    store.unwatch('resize', this.resize);
  }

  start = () => {
    this.bindSwipe();
    this.goTo(0, { forward: true });
    this.sliderBar.current.animateIn();
  }

  handleSwipe = () => {
    if (this.isSwipping) return;

    const swipe = store.get('swipe');
    const prev = this.index;
    if (swipe.forward) this.index++;
    else this.index--;
    this.index = Math.max(this.min, (Math.min(this.max, this.index)));

    if (this.index === prev) return;
    this.goTo(this.index, { forward: swipe.forward })
  }

  goTo = (index, forward) => {
    this.isSwipping = true;
    this.items['item' + index].animateIn(forward.forward);
    this.sliderBar.current.setBarPosition(index);
    this.wrapper.current.style[Transform] = 'translateX(' + (-this.index * this.itemWidth) + 'px)'
    setTimeout(() => { this.isSwipping = false; }, 1000);
  }

  resize = () => {
    const size = store.get('resize');
    if (size.width > size.height) return;
    if (this.itemWidth === size.width) return;
    this.itemWidth = size.width
    this.goTo(this.index, { forward: true })
  }

  renderSliderItem = (item, index) => {
    return [
      <SliderItem item={item} key={index} ref={el => this.items['item' + index] = el}></SliderItem> //eslint-disable-line
    ]
  }

  render () {
    const slider = i18n.localize('home').slider;

    return (
      <div className='slider'>
        <div className='slider-wrapper' ref={this.wrapper}>
          {map(slider, this.renderSliderItem)}
        </div>
        <SliderBar number={this.numberItems} ref={this.sliderBar}></SliderBar>
      </div>
    )
  }
}

export default Slider

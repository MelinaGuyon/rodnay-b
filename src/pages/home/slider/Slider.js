import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';
import map from 'lodash/map';
import SliderItem from './SliderItem';

require('./Slider.scss');

class Slider extends React.Component {
  component = React.createRef();
  items = [];

  renderSliderItem (item, index) {
    return [
      <SliderItem item={item} key={index}></SliderItem>
    ]
  }

  render () {
    const slider = i18n.localize('home').slider;

    return (
      <div className='slider'>
        {map(slider, this.renderSliderItem)}
      </div>
    )
  }
}

export default Slider

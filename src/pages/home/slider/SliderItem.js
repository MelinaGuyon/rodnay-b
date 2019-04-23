import React from 'react';
import i18n from 'abstract/i18n/i18n';
import store from 'tools//store';

require('./SliderItem.scss');

class SliderItem extends React.Component {
  component = React.createRef();

  render () {
    return (
      <div className='slider-item'>
        <div className='title'>{this.props.item.title}</div>
      </div>
    )
  }
}

export default SliderItem

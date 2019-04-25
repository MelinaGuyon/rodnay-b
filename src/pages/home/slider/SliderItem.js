import React from 'react';

require('./SliderItem.scss');

class SliderItem extends React.Component {
  component = React.createRef();

  render () {
    return (
      <div className='slider-item'>
        <div className='container'>
          <div className={'title ' + this.props.item.titlePosition}>{this.props.item.title}</div>
          <div className='img'><img src={this.props.item.url} alt=""/></div>
          <div className={'text ' + this.props.item.textPosition}>{this.props.item.text}</div>
        </div>
      </div>
    )
  }
}

export default SliderItem

import React from 'react';
import anime from 'animejs';

require('./SliderItem.scss');

class SliderItem extends React.Component {
  component = React.createRef();
  title = React.createRef();
  img = React.createRef();
  text = React.createRef();

  animateIn = () => {
    console.log('je passe')
    anime({
      targets: this.title.current,
      translateX: ['80vw', 0],
      opacity: [0, 1],
      duration: 800,
      delay: 0,
      easing: 'easeOutCubic'
    })

    anime({
      targets: this.img.current,
      translateX: ['80vw', 0],
      opacity: [0, 1],
      duration: 800,
      delay: 250,
      easing: 'easeOutCubic'
    })

    anime({
      targets: this.text.current,
      translateX: ['80vw', 0],
      opacity: [0, 1],
      duration: 800,
      delay: 600,
      easing: 'easeOutCubic'
    })
  }

  render () {
    return (
      <div className='slider-item'>
        <div className='container'>
          <div className={'title ' + this.props.item.titlePosition} ref={this.title}>{this.props.item.title}</div>
          <div className='img' ref={this.img}><img src={this.props.item.url} alt=""/></div>
          <div className={'text ' + this.props.item.textPosition} ref={this.text}>{this.props.item.text}</div>
        </div>
      </div>
    )
  }
}

export default SliderItem

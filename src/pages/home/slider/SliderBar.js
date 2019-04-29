import React from 'react';
import anime from 'animejs';

require('./SliderBar.scss');

class SliderItem extends React.Component {
  component = React.createRef();
  bar = React.createRef();

  constructor (props) {
    super();
    this.state = {
      number: props.number
    }
  }
  barWidth;

  componentDidMount () {
    this.setWidth();
  }

  animateIn () {
    this.component.current.classList.add('visible');
  }

  setWidth = () => {
    this.barWidth = this.component.current.offsetWidth / this.state.number;
    this.bar.current.style.width = `${this.barWidth}px`;
  }

  setBarPosition = (index) => {
    const position = index * this.barWidth;
    anime({
      targets: this.bar.current,
      translateX: position,
      duration: 600,
      easing: 'easeOutCubic'
    })
  }

  render () {
    return (
      <div className='slider-bar' ref={this.component}>
        <div className='bar-bg'></div>
        <div className='bar' ref={this.bar}></div>
      </div>
    )
  }
}

export default SliderItem

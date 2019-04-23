import React from 'react';
import Page from 'abstract/page/Page';
import Slider from './slider/Slider'

require('./Home.scss');

class Home extends Page {
  render () {
    return (
      <div className='home page'>
        <Slider></Slider>
      </div>
    )
  }
}

export default Home;

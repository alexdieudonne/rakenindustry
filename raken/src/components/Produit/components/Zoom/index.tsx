import React, { Component } from 'react';
import './components/styles.css'
const src = 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0'


interface sd{
  class:string,
  src:string
}
export default class Zoom extends Component<sd> {
  state = {
    backgroundImage: `url(${this.props.src})`,
    backgroundPosition: '0% 0%'
  }

  handleMouseMove = (e:any) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  render = () =>
  
    <figure onMouseMove={this.handleMouseMove} style={this.state}>
      <img className={this.props.class}  src={this.props.src} />
    </figure>
}



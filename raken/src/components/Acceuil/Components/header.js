import React from "react";

export class Header extends React.Component {
  static defaultProps = {
    className: ""
  };
  
  render() {
 
    const {wasSticky,isSticky, style, renderCount,distanceFromTop, className } = this.props;
    // console.log(distanceFromTop) distanceFromTop>-420? 
    return (
      <div style={{marginTop:this.props.distanceFromTop}} className={"header " + className + wasSticky?  isSticky? 'topMargin': '':null } style={style}>
        <h2>
          {this.props.children}
        </h2>
      </div>
    );
  }
}

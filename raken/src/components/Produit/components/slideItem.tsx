import React from "react";

export default ({ children, ...params }:any) => (
  <div className="swiper-slide" {...params}>
    <span>{children}</span>
  </div>
); 
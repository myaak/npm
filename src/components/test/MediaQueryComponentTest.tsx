import MediaQuery from "../MediaQuery/MediaQuery";
import React from "react";

const mediaQueryComponentTest = () => {
  return (
    <div>
      <h1>Device Test!</h1>
      <MediaQuery minWidth={1224}>
        <p>You are a desktop or laptop</p>
        <MediaQuery minWidth={1824} maxWidth={2000}>
          <p>You also have a huge screen</p>
        </MediaQuery>
      </MediaQuery>
      <MediaQuery minResolution="2dppx">
        {(matches) => (matches ? <p>You are retina</p> : <p>You are not retina</p>)}
      </MediaQuery>
    </div>
  );
};

export default mediaQueryComponentTest;

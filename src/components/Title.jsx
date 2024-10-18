import React from 'react'

export default function Title({text}, {color}) {
  return (
    <div>
      <style ></style>
      <h2 className="title-text">
        <span className="line"></span>{text}
      </h2>
    </div>
  );
}

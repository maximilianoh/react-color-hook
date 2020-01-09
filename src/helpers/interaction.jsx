import React, { useState } from 'react';

const handleFocus = (Component, Span = 'span') => {
  const Focus = (props) => {
    const [focus, setFocus] = useState(false);

    const handlerFocus = () => setFocus(true);

    const handleBlur = () => setFocus(false);

    return (
      <Span onFocus={handlerFocus} onBlur={handleBlur}>
        <Component {...props} {...focus} />
      </Span>
    );
  };
  return Focus;
};
export default handleFocus;

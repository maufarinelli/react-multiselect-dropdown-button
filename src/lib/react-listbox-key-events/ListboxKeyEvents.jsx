import React from 'react';
import PropTypes from 'prop-types';

const ListboxKeyEvents = ({ keyEvents, children, className }) => {
  const onKeyDown = e => {
    switch (e.keyCode) {
      case 35:
        if (keyEvents.end) keyEvents.end(e);
        break;
      case 36:
        if (keyEvents.home) keyEvents.home(e);
        break;
      case 38:
        if (keyEvents.up) keyEvents.up(e);
        break;
      case 40:
        if (keyEvents.down) keyEvents.down(e);
        break;
      default:
        return;
    }
  };

  return (
    <select multiple onKeyDown={onKeyDown} className={className}>
      {children}
    </select>
  );
};

ListboxKeyEvents.propTypes = {
  keyEvents: PropTypes.shape({
    home: PropTypes.func,
    end: PropTypes.func,
    up: PropTypes.func,
    down: PropTypes.func
  })
};

export default ListboxKeyEvents;

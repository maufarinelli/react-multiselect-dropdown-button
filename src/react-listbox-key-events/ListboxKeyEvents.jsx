import React from 'react';
import PropTypes from 'prop-types';

const ListboxKeyEvents = ({keyEvents, children, className}) => {
    const onKeyDown = (e) => {
      if (e.keyCode === 37){
        if(keyEvents.left){
            keyEvents.left(e);
        }
      } else if (e.keyCode === 39) {
        if(keyEvents.right){
          keyEvents.right(e);
        }
      } else if (e.keyCode === 38) {
        if(keyEvents.up){
          keyEvents.up(e);
        }
      } else if (e.keyCode === 40) {
        if(keyEvents.down){
          keyEvents.down(e);
        }
      } else if (e.keyCode === 35) {
        if(keyEvents.end){
          keyEvents.end(e);
        }
      } else if (e.keyCode === 36) {
        if(keyEvents.home){
          keyEvents.home(e);
        }
      }
    }

    return <ul onKeyDown={onKeyDown} className={className}>{children}</ul>;
}

ListboxKeyEvents.propTypes = {
    keyEvents: PropTypes.shape({
        left: PropTypes.func,
        right: PropTypes.func,
        up: PropTypes.func,
        down: PropTypes.func,
    })
};

export default ListboxKeyEvents;
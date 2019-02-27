import React from 'react';
import PropTypes from 'prop-types';

const ListboxKeyEvents = ({keyEvents, children, ...otherProps}) => {
    const onKeyDown = (e) => {
        if (e.keyCode === 37){
            if(keyEvents.left){
                keyEvents.left();
            }
          } else if (e.keyCode === 39) {
            if(keyEvents.right){
              keyEvents.right();
            }
          } else if (e.keyCode === 38) {
            if(keyEvents.up){
              keyEvents.up();
            }
          } else if (e.keyCode === 40) {
            if(keyEvents.down){
              keyEvents.down();
            }
          }
    }

    return <ul onKeyDown={onKeyDown} {...otherProps}>{children}</ul>;
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
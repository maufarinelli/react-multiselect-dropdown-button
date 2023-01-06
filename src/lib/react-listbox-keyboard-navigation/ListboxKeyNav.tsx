import React, { ReactNode } from 'react';

interface ListboxKeyNavProps {
  tag: string;
  keyEvents: {
    home: (event: React.KeyboardEvent<HTMLElement>) => void;
    end: (event: React.KeyboardEvent<HTMLElement>) => void;
    up: (event: React.KeyboardEvent<HTMLElement>) => void;
    down: (event: React.KeyboardEvent<HTMLElement>) => void;
  };
  children: ReactNode;
  className: string;
  role: string;
  otherProps?: any;
}

const ListboxKeyNav: React.FC<ListboxKeyNavProps> = ({ tag, keyEvents, children, className, otherProps }) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // TODO: verify
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

  return React.createElement(
    tag,
    {
      className,
      onKeyDown,
      ...otherProps,
    },
    children
  );
};

export default ListboxKeyNav;

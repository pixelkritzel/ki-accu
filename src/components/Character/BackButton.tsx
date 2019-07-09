import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import CSS from './BackButton.module.scss';

export function BackButton() {
  return (
    <Link to="/">
      <Button component="span" className={CSS.backButton}>
        All Characters
      </Button>
    </Link>
  );
}

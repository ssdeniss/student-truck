import React from 'react';
import Container from '../../layouts/Container';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__content">
          <div className="header__logo">Logo</div>
          <div className="header__functional">Func</div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

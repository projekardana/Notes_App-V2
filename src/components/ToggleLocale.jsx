import React from 'react';
import LocaleContext from '../context/LocaleContext';
import { MdGTranslate } from 'react-icons/md';

function ToggleLocale() {
  return (
    <LocaleContext.Consumer>
      {({ locale, toggleLocale }) => {
        return (
          <button className="toggle-locale" onClick={toggleLocale}>
            {locale === 'id'}
            <MdGTranslate />
          </button>
        );
      }}
    </LocaleContext.Consumer>
  );
}

export default ToggleLocale;

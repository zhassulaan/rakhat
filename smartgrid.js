var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'scss',
  /* less || scss || sass || styl */
  columns: 12,
  /* number of grid columns */
  offset: '20px',
  /* gutter width px || % || rem */
  mobileFirst: false,
  /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1180px',
    /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    lg: {
      width: '1200px' /* -> @media (max-width: 769px to 1024px) */
    },
    md: {
      width: '1024px' /* -> @media (max-width: 769px to 1024px) */
    },
    sm: {
      width: '768px', /* -> @media (max-width: 576px to 768px) */
      fields: '15px' /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '575px' /* -> @media (max-width: 320px to 575px) */
    },
    xxs: {
      width: '375px' /* -> @media (max-width: 320px to 575px) */
    },
    /*
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
};

smartgrid('./src/assets/scss/helpers', settings);

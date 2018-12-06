export const styles = theme => {
  theme.breakpoints.values.xs = 0;
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    home: {
      fontFamily: 'Oleo Script Swash Caps',
      fontSize: 82,
      fontWeight: 700,
      color: '#D36F75',

    },
    google: {
      marginLeft: 10,
      marginRight: 10,
      color: '#ECEBE3',
      backgroundColor: 'rgb(211, 72, 54)',
      '&:hover': {
        backgroundColor: 'rgb(241, 102, 84 )',
      },
    },
    facebook: {
      marginLeft: 10,
      marginRight: 10,
      color: '#ECEBE3',
      backgroundColor: 'rgb(59, 89, 152)',
      '&:hover': {
        backgroundColor: 'rgb(89, 119, 180)',
      },
    },
    linkedIn: {
      marginLeft: 10,
      marginRight: 10,
      color: '#ECEBE3',
      backgroundColor: 'rgb(0, 119, 181)',
      '&:hover': {
        backgroundColor: 'rgb(30, 149, 211)',
      },
    },
    container: {
      marginTop: '10vh',
    },
    link: {
      textDecoration: 'none',
      color: '#497890',
      transition: '300ms',
      '&:hover': {
        color: '#7baec6',
      },
    },
    about: {
      [theme.breakpoints.between('xs', 'sm')]: {
        textDecoration: 'none',
        position: 'fixed',
        top: '78vh',
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        textDecoration: 'none',
        position: 'fixed',
        top: '90vh',
      },
    },
  });
};
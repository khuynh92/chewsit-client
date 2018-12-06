export const styles = theme => {

  theme.breakpoints.values.xs = 0;
  theme.breakpoints.values.sm = 300;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    LogInButton: {
      marginRight: 20,
      width: 140,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#497890',
      color: '#ECEBE3',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#7baec6',
      },
    },
    button: {
      textDecoration: 'none',
      width: 140,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#497890',
      color: '#ECEBE3',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#D36F75',
      },
    },
    logInForm: {
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: 300,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        width: 300,
      },
    },
  });
};
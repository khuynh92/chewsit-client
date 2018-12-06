export const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    grid: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '5vh',
    },
    khoa: {
      marginTop: 10,
      marginBottom: 30,
      maxWidth: 300,
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 100,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        marginLeft: 5,
        width: 200,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginLeft: 5,
        width: 200,
      },
    },
    aboutText: {
      [theme.breakpoints.between('xs', 'sm')]: {
        textAlign: 'center',
        width: 300,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        textAlign: 'left',
        marginLeft: 5,
        width: 500,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        textAlign: 'left',
        marginLeft: 5,
        width: 500,
      }, 
    },
    socialMedia: {
      position: 'absolute',
      bottom: '15vh',
    },
    linkedIn: {
      color: '#0077B5',
      textDecoration: 'none',
      fontSize: 42,
    },
  });
};
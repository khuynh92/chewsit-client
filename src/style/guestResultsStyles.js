export const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 850;
  theme.breakpoints.values.lg = 1024;
  theme.breakpoints.values.xl = 3000;
  theme.breakpoints.values.tablet = 769;
  theme.breakpoints.values.lgForward = 1480;

  return ({
    container: {
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '83%',
        display: 'flex',
        marginTop: '40px',
        flexDirection: 'column',
        marginBottom: '40vh',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: '83%',
        display: 'flex',
        marginTop: '40px',
        flexDirection: 'column',
        marginBottom: '40vh',
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      [theme.breakpoints.between('md', 'lg')]: {
        marginTop: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
        height: '75vh',
        justifyContent: 'center',
      },
      [theme.breakpoints.between('lg', 'xl')]: {
        maxWidth: 1024,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5vh',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '40vh',
      },
    },
    results: {
      margin: 'auto',
      width: '100%',
    },
    map: {
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 300,
        margin: 'auto',
      },
      [theme.breakpoints.between('xs', 'tablet')]: {
        width: 300,
        margin: 'auto',
      },
      [theme.breakpoints.between('tablet', 'md')]: {
        width: '100%',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        width: '100%',

      },
    },
    back: {
      zIndex: 99,
      position: 'fixed',
      cursor: 'pointer',
      marginLeft: '-9vw',
      marginTop: '36vh',
      [theme.breakpoints.between('xs', 'sm')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginTop: '50vw',
        marginLeft: '-16vw',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '-9vw',
        marginTop: '36vh',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '-9vw',
        marginTop: 0,
      },
      [theme.breakpoints.between('lg', 'xl')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '-9vw',
        marginTop: '0vh',
      },
    },
    forward: {
      [theme.breakpoints.between('xs', 'sm')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginTop: '50vw',
        marginLeft: '74vw',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '78vw',
        marginTop: '36vh',

      },
      [theme.breakpoints.between('md', 'lg')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '78vw',
        marginTop: 0,
      },
      [theme.breakpoints.between('lg', 'lgForward')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '78vw ',
        marginTop: '0vh',
      },
      [theme.breakpoints.between('lgForward', 'xl')]: {
        zIndex: 99,
        position: 'fixed',
        cursor: 'pointer',
        marginLeft: '1160px ',
        marginTop: '0vh',
      },
    },
    redArrow: {
      fontSize: 53,
      color: '#ff411d',
    },
    blackArrow: {
      fontSize: 53,
      color: '#9DA6AF',

    },
    noResults: {
      marginTop: '35vh',
    },
    tryAgain: {
      marginTop: 30,
      width: 200,
      height: 75,
      color: '#ECEBE3',
      backgroundColor: '#497890',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#7baec6',
      },
    },
  });
};
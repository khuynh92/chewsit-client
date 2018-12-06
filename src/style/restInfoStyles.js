export const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.mid = 769;
  theme.breakpoints.values.md = 910;
  theme.breakpoints.values.lg = 1024;
  theme.breakpoints.values.xl = 3000;


  return ({
    card: {
      minHeight: 250,
      [theme.breakpoints.between('xs', 'md')]: {
        position: 'relative',
        minWidth: 300,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: '2%',
        width: '50%',
        height: '40vh',
      },
      [theme.breakpoints.between('mid', 'xl')]: {
        position: 'relative',
        minWidth: 300,
        marginRight: '2%',
        marginBottom: '2%',
        display: 'inline-block',
        width: '48%',
        height: '40vh',
      },
    },
    media: {
      height: 204,
    },
    yelpLogo: {
      marginTop: -20,
      marginBottom: -20,
      width: '100%',
    },
    yelpLogoCont: {
      width: 120,
    },
    typeSpacing: {
      marginTop: 30,
    },
    cardAction: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    stars: {
      marginTop: 10,
    },
    directions: {
      textDecoration: 'none',
    },
    directionsChild: {
      color: '#497890',
      transition: '300ms',
      '&:hover': {
        color: '#9DA6AF',
      },
    },
    mapsIcon: {
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: 0,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        marginRight: 0,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        marginRight: 10,
      },
    },
    starFilled: {
      fontSize: 36,
      color: '#FFE021',
    },
    starOutlined: {
      fontSize: 36,
    },
    starIcon: {
      float: 'right',
    },

  });
};
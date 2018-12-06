export const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.mid = 710;
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
        width: '100%',
        height: '60vh',
      },
      [theme.breakpoints.between('mid', 'xl')]: {
        position: 'relative',
        minWidth: 700,
        margin: 'auto',
        display: 'inline-block',
        width: '75%',
        height: '40vh',
      },
    },
    media: {
      height: 204,
    },
    yelpLogo: {
      zIndex: 99,
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
      zIndex: 99,
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
      [theme.breakpoints.between('xs', 'md')]: {
        float: 'right',
      },
      [theme.breakpoints.between('mid', 'xl')]: {
        marginRight: '50%',
        float: 'right',
      },

    },
    image: {
      [theme.breakpoints.between('xs', 'md')]: {
        position: 'relative',
        objectFit: 'cover',
        marginLeft: '5%',
        width: '91%',
        height: '43%',
        display: 'block',
        borderRadius: 5,
      },
      [theme.breakpoints.between('mid', 'xl')]: {
        position: 'relative',
        top: -142,
        objectFit: 'cover',
        float: 'right',
        width: '42%',
        height: '87%',
        marginRight: 15,
        borderRadius: 5,
      },
      restaurantName: {
        fontSize: '1.2em',
      },
    },
    restaurantName: {
      fontSize: '1.2rem',
    },
  });
};
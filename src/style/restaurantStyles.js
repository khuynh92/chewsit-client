export const styles = theme => {

  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 769;
  theme.breakpoints.values.lg = 1024;
  theme.breakpoints.values.xl = 3000;

  return ({
    card: {
      minHeight: 250,
      [theme.breakpoints.between('xs', 'md')]: {
        minWidth: 300,
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        height: '40vh',
      },
      [theme.breakpoints.between('md', 'xl')]: {
        minWidth: 300,
        marginBottom: '2%',
        display: 'inline-block',
        width: '50%',
        height: '40vh',
      },
    },
    media: {
      cursor: 'pointer',
      height: '100%',
    },
    cardActionArea: {
      width: '100%',
    },
    cardContent: {
      paddingBottom: 0,
      marginBottom: 0,
    },
  });
};
export const styles = theme => {
  theme.breakpoints.values.sm = 480;
  theme.breakpoints.values.md = 768;
  theme.breakpoints.values.lg = 1024;

  return ({
    checkBoxContainer: {
      margin: 'auto',
    },
    checkBox: {
      margin: 20,
    },
    buttonPreSave: {
      [theme.breakpoints.between('xs', 'sm')]: {
        width: 180,
        position: 'fixed',
        top: '78vh',
        backgroundColor: '#497890',
        color: '#ECEBE3',
        transition: '300ms',
        '&:hover': {
          backgroundColor: '#7baec6',
        },
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width: 180,
        position: 'fixed',
        top: '90vh',
        backgroundColor: '#497890',
        color: '#ECEBE3',
        transition: '300ms',
        '&:hover': {
          backgroundColor: '#7baec6',
        },
      },
    },
    buttonPostSave: {
      width: 180,
      position: 'fixed',
      top: '78vh',
      backgroundColor: '#ff411d',
      color: '#ECEBE3',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#ff411d',
      },
    },
    rest: {
      marginBottom: '35vh',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        paddingLeft: '6vw',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      [theme.breakpoints.between('md', 'lg')]: {
        paddingLeft: '6vw',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
    title: {
      marginTop: 10,
    },
    redirectButton: {
      width: 200,
      height: 75,
      borderRadius: 0,
      color: '#ECEBE3',
      backgroundColor: '#D36F75',
      transition: '300ms',
      '&:hover': {
        backgroundColor: '#7baec6',
      },
    },
  });
};
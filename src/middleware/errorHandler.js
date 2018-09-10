export default () => next => action => {
  if(action.type === 'HANDLE_ERROR') {

    let code = action.payload.status;
    if(code === 400) {
      alert('please fill out the entire form');
    } else if (code === 409) {
      alert('username/email already taken');
    } else if (code === 401) {
      alert('invalid username and/or password');
    }
  } else {
    return next(action);
  }
};
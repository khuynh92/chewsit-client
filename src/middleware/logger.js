export default  store => next => action => {
  console.log('1. old state is: ', store.getState());
  console.log('2. actions type is: ', action.type);
  let result = next(action);
  console.log('3. new state is: ', store.getState());
  return result;
};
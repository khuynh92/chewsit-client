import superagent from 'superagent';


export const FETCH_ALL_RESULTS = 'FETCH_ALL_RESULTS';
export const SAVE_DASHBOARD = 'SAVE_DASHBOARD';

//Action creators
export const fetchAllResults = (businesses) => ({
  type: FETCH_ALL_RESULTS,
  payload: { allResults: businesses },
});

export const saveDashboard = (dashboard) => ({
  type: SAVE_DASHBOARD,
  payload: dashboard,
});
//Thunkers

export const fetchAllResultsThunk = (food, location, price, distance) => {
  return async dispatch => {

    let offsetTotal = await superagent.get(`${process.env.API_URL}/api/v3/yelp/${food}/${location}/${price}/${distance}/0`)
      .then(response => {
        return response.body.total;
      });

    let offset = offsetTotal < 51 ? 0 : Math.floor(Math.random() * offsetTotal - 4);

    return superagent.get(`${process.env.API_URL}/api/v3/yelp/${food}/${location}/${price}/${distance}/${offset}`)
      .then(response => {
        randomize(response.body.businesses);
        return dispatch(fetchAllResults(response.body.businesses));
      });

  };
};

function randomize(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
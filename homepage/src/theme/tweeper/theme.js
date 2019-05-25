import variables from './variables';

const req = require.context('./components', false, /.js$/);
let overrides = {
  label:{
    fontSize:20
  }
};

req.keys().forEach(filename => {
  overrides = {
    ...overrides,
    ...req(filename).default(variables),
  };
});

export default {
  ...variables.theme,
  overrides,
};

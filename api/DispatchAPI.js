import { request } from './../utilities/utilities';

const sendAction = (action, profileID) => {
  const body = {
    profileID,
    action,
  };
  request.post(`${process.env.DISPATCH_API_URL}/api/v1/actions`, body, (error, response) => {
    if (error) {
      console.error('error sending action', error);
    }
  });
};

module.exports = {
  sendAction,
};

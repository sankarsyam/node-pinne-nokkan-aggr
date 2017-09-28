module.exports = {
  room: `${process.env.HMS_API_URL}/api/v1/rooms?profileID=`,
  location: `${process.env.LOCATION_API_URL}/api/v1/userLocations?profileID=`,
  reservation: `${process.env.HMS_API_URL}/api/v1/reservations?profileID=`,
  profile: `${process.env.PROFILE_API_URL}/api/v1/profiles?profileID=`,
  action: `${process.env.DISPATCH_API_URL}/api/v1/actions?profileID=`,
};

import { request, requiredValueToTestValueType } from './../utilities/utilities';

const getMatchingFlows = (triggerType, triggerSubType, profileID, getMatchingFlowsCallback) => {
  const flowSearchBaseURL = process.env.EXPERIENCE_FLOW_API_URL;
  const flowSearchPathURI = '/api/v1/flows';

  let flowSearchQuery = `?triggerType=${triggerType}&isActive=true`;

  if (triggerSubType) {
    flowSearchQuery += `&triggerSubType=${triggerSubType}`;
  }

  const flowSearchURL = flowSearchBaseURL + flowSearchPathURI + flowSearchQuery;

  request.get(flowSearchURL, (error, flows) => {
    if (error) {
      getMatchingFlowsCallback(error);
    }
    getMatchingFlowsCallback(null, flows);
    // validateFlows(flows, [], profileID, (error, validatedTrueFlows) => {
    //   getMatchingFlowsCallback(error, validatedTrueFlows);
    // });
  });
};

module.exports = {
  getMatchingFlows,
};

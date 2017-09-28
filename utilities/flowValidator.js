import { request, requiredValueToTestValueType } from './utilities';
import servicesSearchURLs from './ServicesSearchURLs';
import propertyPath from 'property-path';
import dispatchAPI from './../api/DispatchAPI';

const validateFlows = (unvalidatedFlows, validatedTrueFlows, profileID, validateFlowsCallback) => {
  if (unvalidatedFlows[0]) {
    // This removes the first flow from the array
    const flow = unvalidatedFlows.shift();

    validateTriggers(flow.triggerCriteria, profileID, (error, allTriggersAreTrue) => {
      if (allTriggersAreTrue) {
        dispatchAPI.sendAction(flow.action, profileID);
        validatedTrueFlows.push(flow.name);
      }
      // This Function calls itself until all the unvalidated flows are empty
      validateFlows(unvalidatedFlows, validatedTrueFlows, profileID, validateFlowsCallback);
    });
  } else {
    // Called once all flows have been tested
    validateFlowsCallback(null, validatedTrueFlows);
  }
};

const validateTriggers = (unvalidatedTriggers, profileID, validateTriggersCallback) => {
  // Each iteration it will remove a trigger from the array
  if (unvalidatedTriggers[0]) {
    let triggerCriteria = unvalidatedTriggers.shift();
    triggerCriteria.profileID = profileID;

    validateTrigger(triggerCriteria, (error, triggerIsValid) => {
      if (error) {
        validateTriggersCallback(error);
        return;
      }
      if (triggerIsValid) {
        // Function calls itself until all triggers are tested
        validateTriggers(unvalidatedTriggers, profileID, validateTriggersCallback);
      } else {
        // No need to keep checking triggers once one is invalid
        validateTriggersCallback(null, false);
      }
    });
  } else {
    // if it makes it though all triggers it returns all true
    validateTriggersCallback(null, true);
  }
};

const validateTrigger = (triggerCriteria, validateTriggerCallback) => {
  const triggerType = triggerCriteria.trigger.type.toLowerCase();
  let searchURL = servicesSearchURLs[triggerType] + triggerCriteria.profileID;

  if (triggerCriteria.trigger.action) {
    searchURL += `&actionID=${triggerCriteria.trigger.action}`;
  }
  request.get(searchURL, (error, items) => {
    if (error) {
      validateTriggerCallback(error, false);
      return;
    }
    items.sort((firstItem, secondItem) => { //Will it skio when only one item in the list
      return new Date(secondItem.dateCreated) - new Date(firstItem.dateCreated);
    });

    if (items[0]) {
      const testValue = propertyPath.get(items[0], triggerCriteria.trigger.subTypePath);
      const requiredValue = requiredValueToTestValueType(triggerCriteria.trigger.subType, testValue)[
        triggerCriteria.value
      ];
      validateTriggerCallback(null, testValue == requiredValue);
    } else {
      validateTriggerCallback(null, false);
    }
  });
};

// const getMatchingFlows = (triggerType, triggerSubType, profileID, getMatchingFlowsCallback) => {
//   const flowSearchBaseURL = process.env.EXPERIENCE_FLOW_API_URL;
//   const flowSearchPathURI = '/api/v1/flows';

//   let flowSearchQuery = `?triggerType=${triggerType}&isActive=true`;

//   if (triggerSubType) {
//     flowSearchQuery += `&triggerSubType=${triggerSubType}`;
//   }

//   const flowSearchURL = flowSearchBaseURL + flowSearchPathURI + flowSearchQuery;

//   request.get(flowSearchURL, (error, flows) => {
//     if (error) {
//       getMatchingFlowsCallback(error);
//     }
//     validateFlows(flows, [], profileID, (error, validatedTrueFlows) => {
//       getMatchingFlowsCallback(error, validatedTrueFlows);
//     });
//   });
// };

module.exports = {
  validateFlows,
};

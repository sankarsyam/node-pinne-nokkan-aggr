import express, { Router } from 'express';
import flowsAPI from './../api/ExperienceFlowsAPI';
import { toTitleCase } from './../utilities/utilities';
import flowValidator from './../utilities/flowValidator';

const router = Router();
module.exports = router;

const processRequest = (request, response) => {
  const { profileID } = request.body;
  const { type, updatedProperty } = request.params;
  flowsAPI.getMatchingFlows(toTitleCase(type), updatedProperty, profileID, (error, matchingFlows) => {
    if (error) {
      return response.status(404);
    } else {
      flowValidator.validateFlows(matchingFlows, [], profileID, (error, validatedTrueFlows) => {
        if (error) {
          return response.status(404);
        } else {
          return response.json(validatedTrueFlows);
        }
      });
    }
  });
};

/**
* @api {post} /api/v1/{type}/{updatedProperty} Aggregator Service
* @apiName Flow Trigger Tests
* @apiGroup Aggregator
* @apiVersion 1.0.0
*
* @apiParam {String} profileID  Profile ID of Guest
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   {
*     [ "Give Guest Keys" ]
*   }
*
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   []
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*
*/
router.post('/:type', processRequest);

router.post('/:type/:updatedProperty', processRequest);

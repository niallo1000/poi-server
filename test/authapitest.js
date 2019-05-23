'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Comment API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllUsers();
  });

  test('authenticate', async function () {
  });
});
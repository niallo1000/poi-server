'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Poi API tests',  function() {
  let pois = fixtures.pois;
  let newComment = fixtures.newComment;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });

  setup(async function() {
    await poiService.deleteAllPois();
  });

  teardown(async function() {
    await poiService.deleteAllPois();
  });

  test('create a poi', async function() {
    const returnedComment = await poiService.createComment(newComment);
    await poiService.makePoi(returnedComment._id, pois[0]);
    const returnedPois = await poiService.getPois(returnedComment._id);
    assert.equal(returnedPois.length, 1);
    assert(_.some([returnedPois[0]], pois[0]), 'returned poi must be a superset of poi');
  });

  test('create multiple pois', async function() {
    const returnedComment = await poiService.createComment(newComment);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePoi(returnedComment._id, pois[i]);
    }

    const returnedPois = await poiService.getPois(returnedComment._id);
    assert.equal(returnedPois.length, pois.length);
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([returnedPois[i]], pois[i]), 'returned poi must be a superset of poi');
    }
  });

  test('delete all pois', async function() {
    const returnedComment = await poiService.createComment(newComment);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePoi(returnedComment._id, pois[i]);
    }

    const d1 = await poiService.getPois(returnedComment._id);
    assert.equal(d1.length, pois.length);
    await poiService.deleteAllPois();
    const d2 = await poiService.getPois(returnedComment._id);
    assert.equal(d2.length, 0);
  });

  test('delete pois', async function() {
    const returnedComment = await poiService.createComment(newComment);
    for (var i = 0; i < pois.length; i++) {
      await poiService.makePoi(returnedComment._id, pois[i]);
    }

    await poiService.deletePois(returnedComment._id);
    const d = await poiService.getPois(returnedComment._id);
    console.log(d);
    assert.equal(d.length, 0);
  });

  test('create a poi and check donor', async function() {
    const returnedComment = await poiService.createComment(newComment);
    await poiService.makePoi(returnedComment._id, pois[0]);
    const returnedPois = await poiService.getPois(returnedComment._id);
    assert.isDefined(returnedPois[0].donor);

    const users = await poiService.getUsers();
    assert(_.some([users[0]], newUser), 'returnedUser must be a superset of newUser');
  });

});
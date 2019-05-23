'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Comment API tests', function () {

  let comments = fixtures.comments;
  let newComment = fixtures.newComment;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllComments();
  });

  teardown(async function () {
    await poiService.deleteAllComments();
  });

  test('create a comment', async function () {
    const returnedComment = await poiService.createComment(newComment);
    assert(_.some([returnedComment], newComment), 'returnedComment must be a superset of newComment');
    assert.isDefined(returnedComment._id);
  });

  test('get comment', async function () {
    const c1 = await poiService.createComment(newComment);
    const c2 = await poiService.getComment(c1._id);
    assert.deepEqual(c1, c2);
  });

  test('get invalid comment', async function () {
    const c1 = await poiService.getComment('1234');
    assert.isNull(c1);
    const c2 = await poiService.getComment('012345678901234567890123');
    assert.isNull(c2);
  });


  test('delete a comment', async function () {
    let c = await poiService.createComment(newComment);
    assert(c._id != null);
    await poiService.deleteOneComment(c._id);
    c = await poiService.getComment(c._id);
    assert(c == null);
  });

  test('get all comments', async function () {
    for (let c of comments) {
      await poiService.createComment(c);
    }

    const allComments = await poiService.getComments();
    assert.equal(allComments.length, comments.length);
  });

  test('get comments detail', async function () {
    for (let c of comments) {
      await poiService.createComment(c);
    }

    const allComments = await poiService.getComments();
    for (var i = 0; i < comments.length; i++) {
      assert(_.some([allComments[i]], comments[i]), 'returnedComment must be a superset of newComment');
    }
  });

  test('get all comments empty', async function () {
    const allComments = await poiService.getComments();
    assert.equal(allComments.length, 0);
  });

  suiteSetup(async function() {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function() {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });

});

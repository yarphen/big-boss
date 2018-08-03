const passport = require('passport');

const handler = require('../utils/handler');
const userService = require('../services/user');
const bossService = require('../services/boss');
const { checkAccessToView, checkAccessToUpdate, checkAccessToChangeBoss } = require('../middlewares/acl');
const { userSearchValidate } = require('../middlewares/validate');

const findSubsRecur = async (req, res) => {
  const { userId } = req.user;
  const users = await bossService.findSubsRecur(userId);
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await userService.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  res.status(200).json(user);
};

const updateProfile = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  await userService.updateProfile(userId, req.body);
  const updatedUser = await userService.getUser(userId);
  res.status(200).json(updatedUser);
};

const findDirectSubs = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const users = await bossService.findDirectSubs(userId);
  res.status(200).json(users);
};

const changeBoss = async (req, res) => {
  const newBossId = parseInt(req.params.userId, 10);
  const { userId: subId } = req.body;
  await bossService.changeBoss(subId, newBossId);
  const updatedUser = await userService.getUser(subId);
  res.status(200).json(updatedUser);
};

module.exports = (app) => {
  app.get('/users', passport.authenticate('jwt', { session: false }), userSearchValidate, handler(findSubsRecur));
  app.get('/users/:userId', passport.authenticate('jwt', { session: false }), checkAccessToView, handler(getUser));
  app.patch('/users/:userId', passport.authenticate('jwt', { session: false }), checkAccessToUpdate, handler(updateProfile));
  app.get('/users/:userId/subs', passport.authenticate('jwt', { session: false }), checkAccessToView, handler(findDirectSubs));
  app.post('/users/:userId/subs', passport.authenticate('jwt', { session: false }), checkAccessToChangeBoss, handler(changeBoss));
};

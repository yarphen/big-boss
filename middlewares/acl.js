const { isSubordinate } = require('../services/boss');

const asyncToMiddleware = asyncFunc => (req, res, next) => {
  asyncFunc(req, res).then(() => next()).catch(err => next(err));
};

const checkAccessToUpdate = (req, res, next) => { // eslint-disable-line
  const { userId: currentUserId } = req.user || {};
  const targetUserId = parseInt(req.params.userId, 10);
  if (targetUserId !== currentUserId) {
    next(new Error('Permission denied'));
  }
  next();
};

const checkAccessToView = async (req, res) => { // eslint-disable-line
  const { userId: currentUserId } = req.user || {};
  const targetUserId = parseInt(req.params.userId, 10);
  if (targetUserId === currentUserId) {
    return;
  }
  const isTargetUserSubordinateOfCurrent = await isSubordinate(targetUserId, currentUserId);
  if (!isTargetUserSubordinateOfCurrent) {
    throw new Error('Access denied');
  }
};

const checkAccessToChangeBoss = async (req, res) => { // eslint-disable-line
  const { userId: currentUserId } = req.user || {};
  const { userId: targetUserId } = req.body;
  const bossId = parseInt(req.params.userId, 10);
  if (targetUserId === currentUserId || bossId === targetUserId) {
    throw new Error('Access denied');
  }
  const isTargetUserSubordinateOfCurrent = isSubordinate(targetUserId, currentUserId);
  if (!isTargetUserSubordinateOfCurrent) {
    throw new Error('Access denied');
  }
  const isBossUserSubordinateOfCurrent = isSubordinate(bossId, currentUserId);
  if (!isBossUserSubordinateOfCurrent && bossId !== currentUserId) {
    throw new Error('Access denied');
  }
  const isBossUserSubordinateOfTarget = isSubordinate(bossId, targetUserId);
  if (!isBossUserSubordinateOfTarget) {
    throw new Error('Circular dependency is not allowed!');
  }
};

module.exports = {
  checkAccessToUpdate,
  checkAccessToView: asyncToMiddleware(checkAccessToView),
  checkAccessToChangeBoss: asyncToMiddleware(checkAccessToChangeBoss),
};

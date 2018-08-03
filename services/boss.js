/* eslint-disable no-await-in-loop */
const { models: { user }, sequelize } = require('../models');
const { ROLE_BOSS, ROLE_USER, ROLE_ROOT } = require('../constants');


const isSubordinate = async (subId, bossId, options = {}) => {
  const currentUser = await user.findById(subId, { ...options });
  if (!currentUser) {
    throw new Error('Unknown user');
  }
  const anotherUser = await user.findById(bossId, { ...options });
  if (!anotherUser) {
    throw new Error('Unknown user');
  }
  let potentialBoss = await user.findById(currentUser.bossId, { ...options });
  while (true) {
    if (!potentialBoss) {
      return false;
    }
    if (potentialBoss.userId === bossId) {
      return true;
    }
    if (potentialBoss.userId === subId) {
      throw new Error('Circular dependency found!');
    }
    potentialBoss = await user.findById(potentialBoss.bossId, { ...options });
  }
};

const findDirectSubs = (bossId, options = {}) => user.findAll(
  { where: { bossId } },
  { ...options },
);

const findSubsRecur = async (userId, options = {}) => {
  console.log('Finding subs recursively for', userId);

  const users = [];
  let currentLevelUsers = [];

  const currentUser = await user.findById(userId, { ...options });
  currentLevelUsers.push(currentUser);

  while (currentLevelUsers.length) {
    currentLevelUsers.forEach(someUser => users.push(someUser));
    const usersByBoss = await Promise.all(
      currentLevelUsers.map(({ userId: bossId }) => findDirectSubs(bossId, options)),
    );
    currentLevelUsers = usersByBoss.reduce((prev, curr) => ([...prev, ...curr]), []);
  }

  return users;
};


const changeBoss = async (userId, bossId) => {
  console.log('Chaging boss for', userId, 'to', bossId);
  await sequelize.transaction(async (transaction) => {
    if (userId === bossId) {
      throw new Error('User cannot be boss for herself');
    }

    const circularDependencyTest = await isSubordinate(bossId, userId, { transaction });
    if (circularDependencyTest) {
      throw new Error('Trying to set circular dependency! Aborting');
    }

    const currentUser = await user.findById(userId, { transaction });
    if (currentUser.roleId === ROLE_ROOT) {
      throw new Error('Something went wrong! Cannot set boss for root user');
    }
    // getting old boss
    const oldBoss = await user.findById(currentUser.userId, { transaction });
    const { bossId: oldBossId } = oldBoss;
    // setting new boss for current user
    await user.update({ bossId }, { where: { userId } }, { transaction });
    // updating role of new boss
    await user.update({ roleId: ROLE_BOSS }, { where: { userId: bossId } }, { transaction });
    // downgrading old boss if he has no more subordinates
    const subsOfOldBoss = await findDirectSubs(oldBossId, { transaction });
    if (!subsOfOldBoss.length) {
      await user.update({ roleId: ROLE_USER }, { where: { userId: oldBossId } }, { transaction });
    }
  });
};

module.exports = {
  isSubordinate,
  findSubsRecur,
  findDirectSubs,
  changeBoss,
};

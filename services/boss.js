const findSubsRecur = async (userId) => {
  console.log('Finding subs recursively for', userId);
  return [{ userId: 1, name: 'Dummy user' }];
};

const findDirectSubs = async (userId) => {
  console.log('Finding subs directly for', userId);
  return [{ userId: 1, name: 'Dummy user' }];
};

const changeBoss = async (userId, bossId) => {
  console.log('Chaging boss for', userId, 'to', bossId);
};

module.exports = {
  findSubsRecur,
  findDirectSubs,
  changeBoss,
};

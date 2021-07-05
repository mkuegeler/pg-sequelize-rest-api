'use strict';

const name = "Recipes";
const seeds = require(`./${name}.json`);
const { nanoid } = require('nanoid');

function prepare(seeds) {

  seeds.forEach(seed => {
    seed["uid"] = nanoid();
    seed["createdAt"] = new Date();
    seed["updatedAt"] = new Date();
    seed["doc"] = JSON.stringify(seed["doc"]);
  });

  return seeds;

}


let data = prepare(seeds);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(name, data);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(name, null, {});
  }
};


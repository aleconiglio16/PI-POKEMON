const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('arroja un error si el nombre esta vacio', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere un nombre valido')))
          .catch(() => done());
      });
      it('Funciona con un nombre valido', () => {
        Pokemon.create({ name: 'Black' });
      });
    });
    describe('hp', () => {
      it('arroja un error si el nombre esta vacio', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Requiere un numero valido')))
          .catch(() => done());
      });
      it('Funciona con un numero valido', () => {
        Pokemon.create({ hp: 10 });
      });
    });
    }); 
});
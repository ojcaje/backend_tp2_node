const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    host: dbConfig.HOST,

    dialect: dbConfig.dialect,

    operatorsAliases: false,

    pool: {

        max: dbConfig.pool.max,

        min: dbConfig.pool.min,

        acquire: dbConfig.pool.acquire,

        idle: dbConfig.pool.idle

    }

});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.model.js")(sequelize, Sequelize);
db.Reserva = require("./reserva.model.js")(sequelize, Sequelize);
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);


db.Restaurante.hasMany(db.Mesa, { as: "mesas" });
db.Mesa.belongsTo(db.Restaurante, {
  foreignKey: "RestauranteId",
  as: "Restaurante",
}); 

db.Restaurante.hasMany(db.Reserva, { as: "reservas" });
db.Reserva.belongsTo(db.Restaurante, {
  foreignKey: "RestauranteId",
  as: "Restaurante",
});
db.Mesa.hasMany(db.Reserva, { as: "reservas" });
db.Reserva.belongsTo(db.Mesa, {
  foreignKey: "MesaId",
  as: "Mesa",
});
db.Cliente.hasMany(db.Reserva, { as: "reservas" });
db.Reserva.belongsTo(db.Cliente, {
  foreignKey: "ClienteId",
  as: "Cliente",
}); 


module.exports = db;
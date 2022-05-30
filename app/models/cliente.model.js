module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cedula: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        }   
    });
    return Cliente;
};

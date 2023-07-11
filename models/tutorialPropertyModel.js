module.exports = (sequelize, Sequelize) => {
const Property = sequelize.define("property", {
    reference: {
        type: Sequelize.STRING
    },
    userId:
    {
        type: Sequelize.INTEGER
    }
});
return Property;
}
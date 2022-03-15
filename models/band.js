const { Sequelize, DataTypes, Model } = require("sequelize/types");

const sequelize = new Sequelize(process.env.PG_URI);

// MODEL

class Band extends Model {

   
}

Band.init({
    //column configuration
    band_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gener: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    available_start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {

    // extra option
    sequelize,
    modelName: 'Band',
    tableName: 'band',
    timestamps: false
})
//Export

module.exports = Band
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band }) {
      // define association here
      Set_Time.belongsToMany( Band, {
        foreignKey: 'band_id',
        as: 'bands',
      })
    }

    static associate({ Event }) {
      // relationship to Band
      Set_Time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
    }

    static associate({ Stage }) {
      // relationship to Band
      Set_Time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      })
    }
  }
  Set_Time.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
  },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
  },
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  }
  }, {
    sequelize,
    modelName: 'Set_Time',
    tableName: 'set_time',
    timestamps: false
  });
  return Set_Time;
};
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

/**
 * Represents a Tweet in the system.
 */
class Tweet extends Model {
  public id!: number;
  public userId!: number;
  public content!: string;
  public taggedUsers!: string;
  public createdAt!: Date;
}

// Initialize the Tweet model
Tweet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(280),
      allowNull: false
    },
    taggedUsers: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'tweets',
    timestamps: true,
    updatedAt: false
  }
);

// Establish association between Tweet and User models
Tweet.belongsTo(User, { foreignKey: 'userId' });

export default Tweet;

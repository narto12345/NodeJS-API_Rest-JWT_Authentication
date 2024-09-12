import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class UserRepository {
  constructor() {
    this.connection = new Sequelize("node_api_au", "root", "12345", {
      host: "localhost",
      dialect: "mysql",
    });

    this.User = this._defineModel();

    this.connection.sync();
  }

  _defineModel() {
    const model = this.connection.define(
      "user",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: DataTypes.STRING,
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
    return model;
  }

  getConnection() {
    return this.connection;
  }

  async findUser(username) {
    const responseFindUser = await this.User.findOne({
      where: { username: username },
    });

    return responseFindUser;
  }

  async getAll() {
    return this.User.findAll();
  }

  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const respuesta = await this.User.create(user)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return { message: "Error, el usuario que digitó ya existe" };
      });
    return respuesta;
  }
}

export { UserRepository };

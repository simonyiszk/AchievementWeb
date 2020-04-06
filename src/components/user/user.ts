import { Model } from "objection";

import { Achievement } from "../achievement/achievement";

export class User extends Model {
  id!: number;
  name: string;
  email: string;
  authSchId: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      achievements: {
        relation: Model.ManyToManyRelation,
        modelClass: Achievement,

        join: {
          from: "users.id",
          through: {
            from: "users_achievements.userId",
            to: "users_achievements.achievementId",
            extra: ["status", "dateRequested", "dateClosed", "img"],
          },
          to: "achievements.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "authSchId"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        authSchId: { type: "string" },
      },
    };
  }
}

import { Model } from "objection";

import { User } from "../user/user";
import { Achievement } from "../achievement/achievement";

export class Group extends Model {
  id!: number;
  name: string;
  leaderId: number | null;

  static get tableName() {
    return "groups";
  }

  static get relationMappings() {
    return {
      achievement: {
        relation: Model.HasManyRelation,
        modelClass: Achievement,

        join: {
          from: "groups.id",
          to: "achievements.groupId",
        },
      },
      leader: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,

        join: {
          from: "groups.leaderId",
          to: "users.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        leaderId: { type: "integer" },
      },
    };
  }
}

import { Model } from "objection";

import { Achievement } from "../achievement/achievement";

export class Group extends Model {
  id!: number;
  name: string;

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
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

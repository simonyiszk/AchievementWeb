import { Model } from "objection";

import { User } from "../user/user";
import { Group } from "../group/group";
import { Completion } from "../completion/completion";

export class Achievement extends Model {
  id!: number;
  title!: string;
  category!: string;
  level!: number;
  description!: string;
  users: User[];
  group: Group;
  groupId!: number;
  status: string;
  dateRequested: Date;
  dateClosed: Date;
  img: any;

  static get tableName() {
    return "achievements";
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,

        join: {
          from: "achievements.id",
          through: {
            modelClass: Completion,
            from: "users_achievements.achievementId",
            to: "users_achievements.userId",
            extra: ["status", "dateRequested", "dateClosed", "img"],
          },
          to: "users.id",
        },
      },
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,

        join: {
          from: "achievements.groupId",
          to: "groups.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "category", "level", "description", "groupId"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        category: { type: "string" },
        level: { type: "integer" },
        description: { type: "string" },
        groupId: { type: "integer" },
      },
    };
  }
}

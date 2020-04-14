import { Model } from "objection";

export class Completion extends Model {
  id!: number;
  userId!: number;
  achievementId!: number;
  status!: string;
  dateRequested!: Date;
  dateClosed: Date;
  img: any;

  static get tableName() {
    return "users_achievements";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "achievementId", "status", "dateRequested"],

      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        achievementId: { type: "integer" },
        status: { type: "string", enum: ["pending", "completed", "rejected"] },
        dateRequested: { type: "date-time" },
        dateClosed: { type: ["date-time", "null"] },
        img: { type: ["binary", "null"] },
      },
    };
  }
}

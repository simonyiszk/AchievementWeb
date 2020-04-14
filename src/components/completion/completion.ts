import { Model } from "objection";

export class Completion extends Model {
  id!: number;
  userId!: number;
  achievementId!: number;
  status: string;
  dateRequested: Date;
  dateClosed: Date;
  img: any;

  static get tableName() {
    return "users_achievements";
  }
}

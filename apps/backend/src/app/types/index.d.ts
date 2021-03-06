import { User } from "../components/user/user";
import { Achievement } from "../components/achievement/achievement";
import { Group } from "../components/group/group";

declare global {
  namespace Express {
    interface Request {
      queriedUser: User;
      queriedUsers: User[];
      queriedGroup: Group;
      queriedGroups: Group[];
      queriedAchievement: Achievement;
      queriedAchievements: Achievement[];
      queriedUserAchievements: Achievement[];
    }
  }
}

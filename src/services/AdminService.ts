import { db } from "../common/config";
import { UserType } from "../@types/index";
import { Roles } from "../common/constants";

const UserRef = db.collection("user");

export default class AdminService {
  static async getAdmins(val?: number) {
    // TODO:Paginate data
    try {
      const res = await UserRef.where("role", "==", Roles.ADMIN)
        // .orderBy("timestamp", "desc")
        .get();
      return res.docs.map((d) => d.data() as UserType);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

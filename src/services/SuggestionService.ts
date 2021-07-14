import { Suggestion } from "../@types";
import { db } from "../common/config";

const SuggestionRef = db.collection("suggestion");
export default class SuggestionService {
  static async get(pageNo: number) {
    try {
      const res = await SuggestionRef.limit(pageNo)
        .orderBy("timestamp", "desc")
        .get();
      return res.docs.map((d) => d.data() as Suggestion);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async getByRange(pageNo: number, from: Date, to: Date) {
    try {
      const res = await SuggestionRef.where(
        "timestamp",
        ">=",
        from
      )
        .where("timestamp", "<=", to)
        .limit(pageNo)
        .orderBy("timestamp", "desc")
        .get();
      return res.docs.map((d) => d.data() as Suggestion);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

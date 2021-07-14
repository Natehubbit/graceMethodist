import { Suggestion } from "../@types";
import { db } from "../common/config";

const SuggestionRef = db.collection("suggestion");
export default class SuggestionService {
  static async get(pageNo: number) {
    try {
      const res = await SuggestionRef.limit(pageNo).get();
      return res.docs.map((d) => d.data() as Suggestion);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async getAll() {}
}

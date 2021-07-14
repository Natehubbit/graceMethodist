import { OptionsType } from "../@types";
import { db } from "../common/config";

const OrgsRef = db.collection("organisations");
const CategoryRef = db.collection("categories");

export default class OptionsService {
  static async loadOrganizations(): Promise<string[] | null> {
    try {
      const res = await OrgsRef.get();
      return res.docs.map((d) => d.data().name) as string[];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async loadCategories() {
    try {
      const res = await CategoryRef.get();
      return res.docs.map((d) => d.data().name as string);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async loadAll(): Promise<OptionsType | null> {
    try {
      const orgs = await this.loadOrganizations();
      const cats = await this.loadCategories();
      return {
        organisations: orgs || [],
        categories: cats || [],
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async addCategory(val: string) {
    try {
      const { empty } = await CategoryRef.where(
        "name",
        "==",
        val
      ).get();
      if (!empty)
        throw new Error("This Category already exists");
      await CategoryRef.add({ name: val });
      return true;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async addOrganisation(val: string) {
    try {
      const { empty } = await OrgsRef.where(
        "name",
        "==",
        val
      ).get();
      if (!empty)
        throw new Error("This Organisation already exists.");
      await OrgsRef.add({ name: val });
      return true;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

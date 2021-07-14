import firebase from "firebase";
import { UserType } from "../@types";
import { auth, db } from "../common/config";
import { Roles } from "../common/constants";

const UserRef = db.collection("user");

export default class AuthService {
  static async login(email: string, password: string) {
    try {
      const res = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      return res.user;
    } catch (e) {
      console.error(e);
      return e.message as string;
    }
  }
  static async loginPersistently(
    email: string,
    password: string
  ) {
    try {
      await auth.setPersistence(
        firebase.auth.Auth.Persistence.LOCAL
      );
      const res = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      return res.user;
    } catch (e) {
      console.error(e);
      return e.message as string;
    }
  }

  static authStateListener(callback: (val: boolean) => void) {
    auth.onAuthStateChanged((user) => {
      if (user) callback(true);
      else callback(false);
    });
  }

  static async createAdmin(email: string) {
    try {
      const pass = "123456";
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        pass
      );
      await UserRef.add({
        role: Roles.ADMIN,
        email,
        timestamp: Date(),
        username: user?.displayName || "",
      } as UserType);
      return user;
    } catch (e) {
      console.error(e);
      return e.message as string;
    }
  }

  static isLoggedIn() {
    try {
      const res = auth.currentUser;
      if (res) {
        return true;
      }
      throw new Error("User not logged-in");
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async logout() {
    try {
      await auth.signOut();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

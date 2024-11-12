import { beforeEach, describe, expect, test } from "@jest/globals";
import "dotenv/config";

import WakaTimeClient from "../src/WakaTimeClient";

const { API_KEY, USER_ID } = process.env;

if (!API_KEY || !USER_ID)
  throw new Error(".env is not set up correctly. please read the readme.");

describe("🧪 WakaTime Client Tests", () => {
  let client: WakaTimeClient;

  beforeEach(() => {
    client = new WakaTimeClient(API_KEY);
  });

  describe("getCurrentUser", () => {
    test("should get the current user", async () => {
      const { data } = await client.getCurrentUser();
      expect(data).toBeDefined();
      expect(data.id).toEqual(USER_ID);
    });
  });

  describe("getUserByID", () => {
    test("should get a user by their ID", async () => {
      const { data } = await client.getUserByID(USER_ID);
      expect(data).toBeDefined();
      expect(data.id).toEqual(USER_ID);
    });
  });
});

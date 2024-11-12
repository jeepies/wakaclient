import { beforeEach, describe, expect, test } from "@jest/globals";
import "dotenv/config";

import { WakaClient, Range } from "../src/WakaClient";

const { API_KEY, USER_ID } = process.env;

if (!API_KEY || !USER_ID)
  throw new Error(".env is not set up correctly. please read the readme.");

describe("🧪 WakaTime Client Tests", () => {
  let client: WakaClient;

  beforeEach(() => {
    client = new WakaClient(API_KEY);
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

  describe("getStats", () => {
    test("should get the current all time users stats", async () => {
      const { data } = await client.getStats();
      expect(data).toBeDefined();
      expect(data).toMatchObject({
        range: "all_time",
      });
    });

    test("should get the current user stats for the last 7 days", async () => {
      const { data } = await client.getStats({ range: Range.LAST_7_DAYS });
      expect(data).toMatchObject({
        range: "last_7_days",
      });
    });
  });

  describe("getProjects", () => {
    test("should get a list of the current users projects", async () => {
      const { data } = await client.getProjects();
      expect(data).toBeDefined();
      expect(data.total).toBeDefined();
    });
  });
});

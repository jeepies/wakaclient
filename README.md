## WakaClient

WakaClient is an API wrapper for interacting with [WakaTime](https://wakatime.com). This project was created as a result for a need for filtering data by ALL_TIME, but no existing libraries had this.

### Usage

To import the base class, you can use

```js
import { WakaClient } from "wakaclient";
```

You will then need to create a new instance of the class, where the first parameter is your API key - This can be retrieved [here](https://wakatime.com/settings/api-key)

```js
const wakaClient = new WakaClient(YOUR_API_KEY);
```

Now that you have initialized a client, you can call the methods on it.

#### Range

In order to access date ranges, you can import the enum type

```js
import { WakaClient, Range } from "wakaclient";
```

You will then have access to the date ranges

```ts
enum Range {
  LAST_7_DAYS,
  LAST_30_DAYS,
  LAST_6_MONTHS,
  LAST_YEAR,
  ALL_TIME,
}
```

### Methods

#### getCurrentUser

This method will get the currently authenticated user

```js
const user = await wakaClient.getCurrentUser();
```

#### getUserByID

This method will get a user based on their User-Id

```js
const user = await wakaClient.getUserByID(
  "c4bfb54e-3722-4b4e-b236-50c8d60077d1",
);
```

#### getStats

This method will get all stats for a user in the time period

```js
const stats = await wakaclient.getStats({}); // will get all time stats for the current user
const stats = await wakaClient.getStats({ range: Range.LAST_7_DAYS }); // will get stats for the last 7 days for the current user
const stats = await wakaClient.getStats({
  identifier: "c4bfb54e-3722-4b4e-b236-50c8d60077d1",
  range: Range.LAST_7_DAYS,
}); // will get stats for the last 7 days of the user supplied
```

#### getProjects

This method will get a users projects

```js
const projects = await wakaClient.getProjects(); // will get the projects for the current user
const projects = await wakaClient.getProjects(
  "c4bfb54e-3722-4b4e-b236-50c8d60077d1",
); // will get the projects for the user
```

#### getDurations
This method will get a users durations (heartbeat total time)

```js
const durations = await wakaClient.getDurations();
const durations = await wakaClient.getDurations({ identifier: "c4bfb54e-3722-4b4e-b236-50c8d60077d1", date: new Date(), project: "wakaclient" });
```

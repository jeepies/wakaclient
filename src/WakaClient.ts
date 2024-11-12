import axios, { AxiosInstance, AxiosResponse } from "axios";

enum Range {
  LAST_7_DAYS = "last_7_days",
  LAST_30_DAYS = "last_30_days",
  LAST_6_MONTHS = "last_6_months",
  LAST_YEAR = "last_year",
  ALL_TIME = "all_time",
}

class WakaClient {
  private client: AxiosInstance;

  /**
   * Construct a new instance of the client
   * @param apiKey API Key from https://wakatime.com/settings/api-key
   */
  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: "https://wakatime.com/api/v1",
      headers: {
        Authorization: `Basic ${btoa(apiKey)}`,
      },
    });
  }

  private verifyIdentifier = (identifier?: string) =>
    identifier ? identifier : "current";

  private getUser(identifier?: string) {
    identifier = this.verifyIdentifier(identifier);
    return this.client
      .get(`/users/${identifier}`)
      .then((response: AxiosResponse) => response.data);
  }

  /**
   * Get the currently authorized user
   * @returns {Object}
   */
  getCurrentUser() {
    return this.getUser();
  }

  /**
   * Get a user based on their ID
   * @param id
   * @returns {Object}
   */
  getUserByID(id: string) {
    id = id.toString();
    return this.getUser(id);
  }

  /**
   * Get a users stats
   * @param parameters
   * @returns {Object}
   */
  getStats(parameters?: { identifier?: string | number; range?: Range }) {
    parameters = {
      identifier: parameters?.identifier ?? "current",
      range: parameters?.range ?? Range.ALL_TIME,
    };
    return this.client
      .get(`/users/${parameters.identifier}/stats/${parameters.range}`)
      .then((response: AxiosResponse) => response.data);
  }
}

export default WakaClient;
export { Range };

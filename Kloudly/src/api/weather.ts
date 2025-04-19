import { API_URL } from "./config";
import type {
  WeatherData,
  ForecastData,
  GeocodingResponse,
  Coordinates,
} from "./types";

class WeatherAPI {

/**
 * Creates a URL with the specified endpoint and query parameters.
 * Combines the base endpoint with the provided parameters to generate
 * a complete URL string for API requests.
 *
 * @param endpoint - The API endpoint to be called.
 * @param params - A record of query parameters to include in the URL.
 * @returns The fully constructed URL string.
*/
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_URL.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

/**
 * Fetches data from the specified URL and parses the response as JSON.
 * Handles HTTP errors by throwing an exception if the response is not OK.
 *
 * @template T - The expected type of the response data.
 * @param url - The URL to fetch data from.
 * @returns A promise resolving to the parsed JSON response of type T.
 * @throws An error if the HTTP response status is not OK.
*/

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

/**
 * Retrieves the current weather data for a specific location.
 * Uses latitude and longitude coordinates to fetch weather details
 * such as temperature, humidity, and weather conditions.
 *
 * @param coordinates - An object containing latitude and longitude.
 * @returns A promise resolving to the current weather data.
*/
  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_URL.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData<WeatherData>(url);
  }

/**
 * Retrieves the weather forecast for a specific location.
 * Provides detailed weather predictions for the upcoming days
 * based on latitude and longitude coordinates.
 *
 * @param coordinates - An object containing latitude and longitude.
 * @returns A promise resolving to the forecast data.
*/

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_URL.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData<ForecastData>(url);
  }

/**
 * Performs reverse geocoding to find location details based on coordinates.
 * Converts latitude and longitude into human-readable location information
 * such as city or region names.
 *
 * @param coordinates - An object containing latitude and longitude.
 * @returns A promise resolving to an array of geocoding responses.
*/

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_URL.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
  
/**
 * Searches for locations matching a given query string.
 * Finds potential matches for a location name and returns
 * a list of possible results with their details.
 *
 * @param query - The search query string (e.g., city name).
 * @returns A promise resolving to an array of geocoding responses.
*/

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_URL.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();
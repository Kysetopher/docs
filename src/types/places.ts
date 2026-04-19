export type PlaceSearchResult = {
  id: string;
  geonameid: number | null;
  name: string;
  asciiname: string | null;
  country_code: string | null;
  admin1_code: string | null;
  latitude: number;
  longitude: number;
  population: number | null;
  timezone: string | null;
  display_name: string;
};

export type PlacesSearchResponse = {
  results: PlaceSearchResult[];
};


const ROOT_EP_STRING = 'https://api.open-meteo.com/v1';

export function getEndpointPath(endpointPath: string): string {
  return ROOT_EP_STRING + endpointPath;
}

export const EP_LIST = {
  WEATHER: {
    FORECAST: '/forecast',
  }
}

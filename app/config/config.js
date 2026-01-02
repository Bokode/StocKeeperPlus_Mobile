const ip = process.env.EXPO_PUBLIC_IP_ADRESS

export const BASE_URL = `http://${ip}:3001/v1`;

export default { BASE_URL };
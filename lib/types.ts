export interface Computer {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  description: string;
  room: string;
}

export interface ComputerFormData {
  name: string;
  ipAddress: string;
  macAddress: string;
  description: string;
  room: string;
}
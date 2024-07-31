// dashboard.model.ts
export interface Alert {
  id: string;
  stationid: string;
  alertType: string;
  timestamp: string;
  status: string;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  dataSource: string;
}

export interface Station {
  id: string;
  name: string;
  metric_name: string;
  target_value: string;
  icon: string;
}

export interface Threshold {
  id: string;
  warning: number;
  critical: number;
}

export interface Dashboard {
  id: string; 
  name: string;
  refreshRate: number;
  alerts: Alert[];
  notifications: Notification[];
  stations: Station[];
  thresholds: Threshold[];
}

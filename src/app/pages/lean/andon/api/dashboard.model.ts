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
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  status: 'resolved' | 'in-progress' | 'new';
  timestamp: Date;
  note?: string;
  type?: string; // Optional
  dataSource?: string; // Optional
}
export interface StationNotification {
  id: string;
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  status: 'resolved' | 'in-progress' | 'new';
  timestamp: Date;
  note?: string;
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

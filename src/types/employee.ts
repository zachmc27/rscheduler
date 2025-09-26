export interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "FT" | "PT";
  role: string;
  availability: Record<string, string>;
  requests: Array<{ date: string; reason: string; status: string }>;
}

export interface NewEmployee {
  name: string;
  status: string;
  role: string;
  phone: string;
  email: string;
}

export interface NewRequest {
  date: string;
  reason: string;
}

export interface TimeInput {
  startTime: string;
  startPeriod: string;
  endTime: string;
  endPeriod: string;
}

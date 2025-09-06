// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

// Restaurant Configuration Types
export interface RestaurantConfig {
  id: string
  user_id: string
  name: string
  schedule_start_day: ScheduleStartDay
  operating_hours: OperatingHours[]
  roles: Role[]
  staffing_requirements: StaffingRequirement[]
  created_at: string
  updated_at: string
}

export type ScheduleStartDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface OperatingHours {
  day: ScheduleStartDay
  open_time: string // HH:MM format
  close_time: string // HH:MM format
  is_closed: boolean
}

export interface Role {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface StaffingRequirement {
  id: string
  role_id: string
  day: ScheduleStartDay
  shift_wave: ShiftWave
  required_count: number
}

export type ShiftWave = 'open' | 'mid' | 'closing'

// Employee Types
export interface Employee {
  id: string
  restaurant_id: string
  name: string
  email: string
  phone: string
  employment_status: EmploymentStatus
  weekly_availability: WeeklyAvailability
  created_at: string
  updated_at: string
}

export type EmploymentStatus = 'full_time' | 'part_time'

export interface WeeklyAvailability {
  monday: DayAvailability
  tuesday: DayAvailability
  wednesday: DayAvailability
  thursday: DayAvailability
  friday: DayAvailability
  saturday: DayAvailability
  sunday: DayAvailability
}

export interface DayAvailability {
  available: boolean
  start_time?: string // HH:MM format
  end_time?: string // HH:MM format
}

// Request Management Types
export interface TimeOffRequest {
  id: string
  employee_id: string
  restaurant_id: string
  start_date: string // YYYY-MM-DD format
  end_date: string // YYYY-MM-DD format
  reason: string
  status: RequestStatus
  created_at: string
  updated_at: string
}

export type RequestStatus = 'pending' | 'approved' | 'denied'

// Schedule Types
export interface Schedule {
  id: string
  restaurant_id: string
  week_start_date: string // YYYY-MM-DD format
  week_end_date: string // YYYY-MM-DD format
  shifts: Shift[]
  created_at: string
  updated_at: string
}

export interface Shift {
  id: string
  schedule_id: string
  employee_id: string
  role_id: string
  date: string // YYYY-MM-DD format
  start_time: string // HH:MM format
  end_time: string // HH:MM format
  shift_type: ShiftWave
}

// UI State Types
export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export interface ScheduleTableData {
  employees: Employee[]
  shifts: Shift[]
  weekDays: string[]
  roles: Role[]
}

// Form Types
export interface EmployeeFormData {
  name: string
  email: string
  phone: string
  employment_status: EmploymentStatus
  weekly_availability: WeeklyAvailability
}

export interface RestaurantConfigFormData {
  name: string
  schedule_start_day: ScheduleStartDay
  operating_hours: OperatingHours[]
  roles: Omit<Role, 'id' | 'created_at'>[]
  staffing_requirements: Omit<StaffingRequirement, 'id'>[]
}

export interface TimeOffRequestFormData {
  start_date: string
  end_date: string
  reason: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  total_pages: number
}

// Error Types
export interface AppError {
  message: string
  code?: string
  details?: any
}

// Navigation Types
export type NavigationItem = {
  name: string
  href: string
  icon: string
  current?: boolean
}

// Export Types
export interface ExportOptions {
  format: 'google_sheets' | 'pdf' | 'csv'
  email?: string
  include_employee_details?: boolean
  include_notes?: boolean
}


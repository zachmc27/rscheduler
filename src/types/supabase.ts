export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          id: string
          user_id: string
          name: string
          schedule_start_day: string
          operating_hours: Json
          roles: Json
          staffing_requirements: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          schedule_start_day: string
          operating_hours: Json
          roles: Json
          staffing_requirements: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          schedule_start_day?: string
          operating_hours?: Json
          roles?: Json
          staffing_requirements?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      employees: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          email: string
          phone: string
          employment_status: string
          weekly_availability: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          email: string
          phone: string
          employment_status: string
          weekly_availability: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          email?: string
          phone?: string
          employment_status?: string
          weekly_availability?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      time_off_requests: {
        Row: {
          id: string
          employee_id: string
          restaurant_id: string
          start_date: string
          end_date: string
          reason: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          restaurant_id: string
          start_date: string
          end_date: string
          reason: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          restaurant_id?: string
          start_date?: string
          end_date?: string
          reason?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_off_requests_employee_id_fkey"
            columns: ["employee_id"]
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_off_requests_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
      schedules: {
        Row: {
          id: string
          restaurant_id: string
          week_start_date: string
          week_end_date: string
          shifts: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          week_start_date: string
          week_end_date: string
          shifts: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          week_start_date?: string
          week_end_date?: string
          shifts?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_restaurant_id_fkey"
            columns: ["restaurant_id"]
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


import { z } from 'zod'

const dayAvailabilitySchema = z.object({
  available: z.boolean(),
  start_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  end_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
})

const weeklyAvailabilitySchema = z.object({
  monday: dayAvailabilitySchema,
  tuesday: dayAvailabilitySchema,
  wednesday: dayAvailabilitySchema,
  thursday: dayAvailabilitySchema,
  friday: dayAvailabilitySchema,
  saturday: dayAvailabilitySchema,
  sunday: dayAvailabilitySchema,
})

export const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number'),
  employment_status: z.enum(['full_time', 'part_time']),
  weekly_availability: weeklyAvailabilitySchema,
})

export const timeOffRequestSchema = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500, 'Reason must be less than 500 characters'),
}).refine((data) => new Date(data.start_date) <= new Date(data.end_date), {
  message: "End date must be after start date",
  path: ["end_date"],
})

export type EmployeeFormData = z.infer<typeof employeeSchema>
export type TimeOffRequestFormData = z.infer<typeof timeOffRequestSchema>


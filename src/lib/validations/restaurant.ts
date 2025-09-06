import { z } from 'zod'

const operatingHoursSchema = z.object({
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  open_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  close_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  is_closed: z.boolean(),
})

const roleSchema = z.object({
  name: z.string().min(2, 'Role name must be at least 2 characters'),
  description: z.string().optional(),
})

const staffingRequirementSchema = z.object({
  role_id: z.string().min(1, 'Role is required'),
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  shift_wave: z.enum(['open', 'mid', 'closing']),
  required_count: z.number().min(0, 'Required count must be 0 or greater'),
})

export const restaurantConfigSchema = z.object({
  name: z.string().min(2, 'Restaurant name must be at least 2 characters'),
  schedule_start_day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  operating_hours: z.array(operatingHoursSchema).length(7, 'Must provide hours for all 7 days'),
  roles: z.array(roleSchema).min(1, 'At least one role is required'),
  staffing_requirements: z.array(staffingRequirementSchema).min(1, 'At least one staffing requirement is required'),
})

export type RestaurantConfigFormData = z.infer<typeof restaurantConfigSchema>


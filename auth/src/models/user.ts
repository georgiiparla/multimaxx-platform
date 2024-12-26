import { z } from 'zod'
import fromZodSchema from 'zod-to-json-schema'

// Define Zod schemas
const CREATEUSERschema = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string(),
})
export type CREATEUSERinput = z.infer<typeof CREATEUSERschema>

const CREATEUSERresponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
})
export type PAYLOAD = z.infer<typeof CREATEUSERresponseSchema>

export const LOGINUSERschema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
})
export type LOGINUSERinput = z.infer<typeof LOGINUSERschema>

const LOGINUSERresponseSchema = z.object({
  accessToken: z.string(),
})

// Convert Zod schemas to JSON schemas
export const CREATEUSERjsonSchema = fromZodSchema(CREATEUSERschema)
export const CREATEUSERresponseJsonSchema = fromZodSchema(
  CREATEUSERresponseSchema,
)
export const LOGINUSERjsonSchema = fromZodSchema(LOGINUSERschema)
export const LOGINUSERresponseJsonSchema = fromZodSchema(
  LOGINUSERresponseSchema,
)

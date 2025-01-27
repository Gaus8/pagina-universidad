import { z } from 'zod';


const projectSchema = z.object({
  projectName: z.string()
    .min(12, { message: 'error1' }),

  email1: z.string().email({
    message: 'El correo debe ser un correo valido'
  }).refine(
    (email) => email.endsWith('@ucundinamarca.edu.co'), {
      message: 'error2'
    }
  ),

  email2: z.string().email({
    message: 'El correo debe ser un correo valido'
  }).refine(
    (email) => email.endsWith('@ucundinamarca.edu.co'), {
      message: 'error2'
    }
  )

});

export function validateProject (input) {
  return projectSchema.safeParse(input);
};

export function validateProjectPartial (input) {
  return projectSchema.partial().safeParse(input);
};


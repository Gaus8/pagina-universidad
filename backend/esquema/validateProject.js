import { z } from 'zod';


const projectSchema = z.object({
  name: z.string()
    .min(12, { message: 'error1' }),

  email: z.string().email({
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
  ).optional()

});

export function validateRegisterUser (input) {
  return projectSchema.safeParse(input);
};


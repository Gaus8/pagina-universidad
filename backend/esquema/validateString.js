import { z } from 'zod';


const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[\S]{8,16}$/;

const userSchema = z.object({
  name: z.string()
    .min(6, { message: 'El nombre debe poseer al menos 6 caracteres' }),

  email: z.string().email({
    message: 'El correo debe ser un correo valido'
  }).refine(
    (email) => email.endsWith('@ucundinamarca.edu.co'), {
      message: 'El correo debe ser institucional'
    }
  ),

  password: z.string().regex(regex, { message: 'La contraseña debe tener una mayúscula, una minúscula y uno de los siguientes caracteres: .!@#$%^&*' })

});

export function validateRegisterUser (input) {
  return userSchema.safeParse(input);
};

export function validateLoginUser (input) {
  return userSchema.partial().safeParse(input);
}


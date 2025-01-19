import { z } from "zod";


const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*])[\S]{8,16}$/

const userSchema = z.object({
    name: z.string({
        invalid_type_error:'El nombre debe ser una cadena unicamente de texto'
    }),
    email:z.string().email(),

})
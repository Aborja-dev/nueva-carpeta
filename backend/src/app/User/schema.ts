import { UserTypesConst } from '@/app/User/types';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().nonempty({ message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Debe ser un correo electrónico válido.' }).nonempty({ message: 'El correo electrónico es requerido.' }),
  type: z.enum([UserTypesConst[0], UserTypesConst[1], UserTypesConst[2], UserTypesConst[3]], { message: 'Tipo de usuario inválido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
});

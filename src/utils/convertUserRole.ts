import { TUserRole } from '@/services/api/user/UserService'

export const convertUserRole = (userRole: TUserRole) => {
    return (userRole === 'STUDENT') ? 'Aluno' : 'Professor'
}
 

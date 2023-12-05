import * as yup from 'yup'

//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IVFormErrors } from '@/components/forms'
import { FormHandles } from '@unform/core'
import { IFormData, formatValidationCreateSchema } from '../validation/Schema'
import { IDetailQuestion, QuestionService } from '@/services/api/question/QuestionService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setQuestions: (questions: IDetailQuestion[]) => void
    questions: IDetailQuestion[]
    idCourse: number
    idStudent: number
    formRef: React.RefObject<FormHandles>
}

/* A principal motivação de criar esses hooks personalizados é separar o código JS do .tsx ao máximo. Além
de passar os principais, states e setstate de forma global, já que se eu tivesse o varios handles aqui, todos 
teriam acesso aos states e handle states que são passados na criação do CustomHook*/
export const UseHandleQuestion = ({ setIsLoading, setQuestions, questions, idCourse, idStudent, formRef}: IUseHandleCourseProps) => {

    const handleSave = async (data: IFormData) => {
        try {
            //Validando as informações recebidas do form
            const validateData = await formatValidationCreateSchema.validate(data, { abortEarly: false })
            setIsLoading(true)

            //Irá retornar a pergunta criada
            const result = await QuestionService.createQuestion({idCourse, idStudent, ...validateData})
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            //Criando e setando o novo state com as perguntas atualizadas incluindo a que acabou de ser criada
            const updatedQuestions = [result, ...questions]
            setQuestions(updatedQuestions)

            toast.success('Pergunta salva com sucesso!')

            //Limpando os imputs após a criação bem sucedida
            formRef.current?.setData({
                question_text: '',
                idStudent: ''
            })
        } catch (errors) {
            const errorsYup: yup.ValidationError = errors as yup.ValidationError

            const validationErrors: IVFormErrors = {}
            
            //Mapeia e passa os erros para o form
            errorsYup.inner.forEach(error => {
                if (!error.path) return

                validationErrors[error.path] = error.message
                formRef.current?.setErrors(validationErrors)
            })
        }
    }

    return { handleSave }
}


//Toast notification
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { IDetailQuestion, QuestionService } from '@/services/api/question/QuestionService'

interface IUseHandleCourseProps {
    setIsLoading: (status: boolean) => void
    setQuestions: (questions: IDetailQuestion[]) => void
    questions: IDetailQuestion[]
    setTotalCount: (count: number) => void
    totalCount: number
}

/* A principal motivação de criar esses hooks personalizados é separar o código JS do .tsx ao máximo. Além
de passar os principais, states e setstate de forma global, já que se eu tivesse o varios handles aqui, todos 
teriam acesso aos states e handle states que são passados na criação do CustomHook*/
export const UseHandleQuestion = ({ setIsLoading, setQuestions, questions, setTotalCount, totalCount}: IUseHandleCourseProps) => {

    const handleDelete = async (idQuestion: number) => {
        if (confirm('Realmente deseja apagar esta pergunta?')) {
            setIsLoading(true)

            const result = await QuestionService.deleteQuestion(idQuestion)
            setIsLoading(false)

            if (result instanceof Error) {
                toast.error(result.message)
                return
            }

            const newQuestions = questions.filter(question => question.id !== idQuestion)

            setQuestions(newQuestions)
            setTotalCount(totalCount - 1)
            toast.success('Registro apagado com sucesso!')
        }
    }

    return { handleDelete }
}


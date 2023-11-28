import { FormHandles } from '@unform/core'
import { useRef } from 'react'

export const useVForm= (customFormName: string) => {
    const formRef = useRef<FormHandles>(null)

    return { [customFormName]: formRef }
}
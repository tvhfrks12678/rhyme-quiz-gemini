import { createServerFn } from '@tanstack/react-start'
import { getQuizRepository } from '../../infrastructure/getRepository'
import { QuizService } from './quizService'
import { z } from 'zod'

export const getNextQuizFn = createServerFn({ method: 'GET' })
  .inputValidator(z.number())
  .handler(async ({ data: currentIndex }) => {
    const repository = getQuizRepository()
    const service = new QuizService(repository)
    const quiz = await service.getNextQuiz(currentIndex)
    return quiz
  })

export const submitAnswerFn = createServerFn({ method: 'POST' })
  .inputValidator(z.object({
    id: z.string(),
    selectedChoiceIds: z.array(z.string())
  }))
  .handler(async ({ data: { id, selectedChoiceIds } }) => {
    const repository = getQuizRepository()
    const service = new QuizService(repository)
    const result = await service.submitAnswer(id, selectedChoiceIds)
    return result
  })

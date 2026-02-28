import { createFileRoute } from '@tanstack/react-router'
import { getQuizRepository } from '../../../features/quiz/infrastructure/getRepository'
import { QuizService } from '../../../features/quiz/application/services/quizService'
import { SubmitAnswerRequestSchema } from '../../../features/quiz/contracts/quiz'

export async function POST({ request, params }: { request: Request; params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  
  const validatedBody = SubmitAnswerRequestSchema.safeParse(body)
  if (!validatedBody.success) {
    return new Response(JSON.stringify({ error: 'Invalid request body', details: validatedBody.error.errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const repository = getQuizRepository()
  const service = new QuizService(repository)
  const result = await service.submitAnswer(id, validatedBody.data.selectedChoiceIds)

  if (!result) {
    return new Response(JSON.stringify({ error: 'Quiz not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

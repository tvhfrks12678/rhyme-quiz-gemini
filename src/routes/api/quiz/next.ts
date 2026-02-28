import { createFileRoute } from '@tanstack/react-router'
import { getQuizRepository } from '../../../features/quiz/infrastructure/getRepository'
import { QuizService } from '../../../features/quiz/application/services/quizService'

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url)
  const currentIndexStr = url.searchParams.get('currentIndex')
  const currentIndex = currentIndexStr ? parseInt(currentIndexStr, 10) : 0

  const repository = getQuizRepository()
  const service = new QuizService(repository)
  const quiz = await service.getNextQuiz(currentIndex)

  if (!quiz) {
    return new Response(JSON.stringify({ error: 'Quiz not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify(quiz), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

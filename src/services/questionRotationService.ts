import { AppDataSource } from "../config/database"
import { Question } from "../entities/question"
import { Cycle } from "../entities/cycle"
import { Region } from "../entities/region"
import { QuestionAssignment } from "../entities/questionAssignment"
import { IsNull, LessThanOrEqual, MoreThan } from "typeorm"

class QuestionRotationService {
  async assignQuestionsForCycle(cycleId: number): Promise<void> {
    const cycleRepository = AppDataSource.getRepository(Cycle)
    const regionRepository = AppDataSource.getRepository(Region)
    const questionRepository = AppDataSource.getRepository(Question)

    const cycle = await cycleRepository.findOneBy({ id: cycleId })
    if (!cycle) throw new Error("Cycle not found")

    const regions = await regionRepository.find()

    await AppDataSource.transaction(async transactionalEntityManager => {
      for (const region of regions) {
        const question = await questionRepository.findOne({
            where: {
              region: { id: region.id }
            },
            relations: ['questionAssignments'],
            order: {
              id: 'ASC'
            }
          });

        if (question) {
          const assignment = new QuestionAssignment()
          assignment.question = question
          assignment.cycle = cycle
          assignment.region = region
          await transactionalEntityManager.save(assignment)
        } else {
          const firstQuestion = await questionRepository.findOne({
            where: { region: { id: region.id } },
            order: { id: "ASC" }
          })
          if (firstQuestion) {
            const assignment = new QuestionAssignment()
            assignment.question = firstQuestion
            assignment.cycle = cycle
            assignment.region = region
            await transactionalEntityManager.save(assignment)
          }
        }
      }
    })
  }

  async getQuestionForUser(userId:number, region_id: number): Promise<string | null> {
    const assignmentRepository = AppDataSource.getRepository(QuestionAssignment)
    
    const assignment = await assignmentRepository.findOne({
        where: {
          region: { id: region_id },
          cycle: {
            start_date: LessThanOrEqual(new Date()),
            end_date: MoreThan(new Date())
          }
        },
        relations: ['question', 'cycle']
      });

    return assignment ? assignment.question.content : null
  }

  async createNextCycle(): Promise<void> {
    const cycleRepository = AppDataSource.getRepository(Cycle)
    
    const latestCycle = await cycleRepository.findOne({
      order: { end_date: "DESC" }
    })

    if (latestCycle) {
      const newStartDate = new Date(latestCycle.end_date)
      const newEndDate = new Date(newStartDate.getTime() + latestCycle.duration_days * 24 * 60 * 60 * 1000)

      const newCycle = new Cycle()
      newCycle.start_date = newStartDate
      newCycle.end_date = newEndDate
      newCycle.duration_days = latestCycle.duration_days

      const savedCycle = await cycleRepository.save(newCycle)
      await this.assignQuestionsForCycle(savedCycle.id)
    }
  }
}

export default new QuestionRotationService()
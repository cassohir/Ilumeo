import UserSurveyResponseAux from '@/domain/entities/inside-schema/users-surveys-responses-aux.entity';
import { IUserSurveyResponseAuxRepository } from '@/domain/interfaces/user-survey-response-aux.interface';
import { Channel } from '@/shared/dtos/conversion-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class UserSurveyResponseAuxRepository
  implements IUserSurveyResponseAuxRepository
{
  constructor(
    @InjectRepository(UserSurveyResponseAux)
    private ormRepository: Repository<UserSurveyResponseAux>,
  ) {}

  find(filters: any): Promise<UserSurveyResponseAux[]> {
    console.log('find', filters);
    return this.ormRepository.find(filters);
  }

  async findByOrigin(origin: Channel): Promise<UserSurveyResponseAux[]> {
    console.log('findByOrigin', origin);
    return await this.ormRepository.find();
  }

  async index(page: number, limit: number): Promise<UserSurveyResponseAux[]> {
    console.log('index', { page, limit });
    return await this.ormRepository.find();
  }
}

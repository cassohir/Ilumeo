import UserSurveyResponseAux from '@/domain/entities/inside-schema/users-surveys-responses-aux.entity';
import { IUserSurveyResponseAuxRepository } from '@/domain/interfaces/user-survey-response-aux.interface';
import { Repository } from 'typeorm';
export default class UserSurveyResponseAuxRepository implements IUserSurveyResponseAuxRepository {
    private ormRepository;
    constructor(ormRepository: Repository<UserSurveyResponseAux>);
    find(filters: any): Promise<UserSurveyResponseAux[]>;
    index(page: number, limit: number): Promise<UserSurveyResponseAux[]>;
}

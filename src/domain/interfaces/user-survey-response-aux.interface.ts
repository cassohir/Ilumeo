import { Repository } from '@/shared/base/repository';
import UserSurveyResponseAux from '../entities/inside-schema/users-surveys-responses-aux.entity';
import { Channel } from '@/shared/dtos/conversion-rate.dto';

export abstract class IUserSurveyResponseAuxRepository extends Repository<UserSurveyResponseAux> {
  // Provisório ...
  abstract findByOrigin(origin: Channel): Promise<UserSurveyResponseAux[]>;
}

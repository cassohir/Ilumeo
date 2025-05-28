import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity({ schema: 'inside', name: 'users_surveys_responses_aux' })
export default class UserSurveyResponseAux {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  origin: string;

  @Column({ name: 'response_status_id', type: 'int' })
  responseStatusId: number;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../common/entities/abstract.entity';
import { FolowDto } from '../common/modules/folow/folow.dto';
import { UserEntity } from '../../modules/user/user.entity';


@Entity({ name: 'folows' })
export class FolowEntity extends AbstractEntity<FolowDto> {
  catch(arg0: (err: any) => never) {
    throw new Error('Method not implemented.');
  }

  @Column({type: 'uuid'})
  folowerId: string;
  
  @Column({type: 'uuid'})
  folowingId: string;

  @ManyToOne(() => UserEntity, (user) => user.folower)
  @JoinColumn({ name: 'folower_id' })
  folower: UserEntity;


  @ManyToOne(() => UserEntity, (user) => user.folowing)
  @JoinColumn({ name: 'folowing_id' })
  folowing: UserEntity;




  dtoClass = FolowDto;
}

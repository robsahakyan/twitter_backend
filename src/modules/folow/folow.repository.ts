import { Repository } from 'typeorm';
import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { UserNotFoundException } from './exceptions/folow-not-found.exception';
import { FolowEntity } from './folow.entity';

@CustomRepository(FolowEntity)
export class FolowRepository extends Repository<FolowEntity> {
  async findById(id: string): Promise<FolowEntity | null> {
    return this.findOne({ where: { id } })
  }
  async findByfolowerId(folowerId: string): Promise<FolowEntity[] | null> {
    return this.find({ where: { folowerId } }).catch((err) => {
      throw new UserNotFoundException();
    });
  }
  async findByfolowingId(folowingId: string): Promise<FolowEntity[] | null> {
    return this.find({ where: { folowingId } }).catch((err) => {
      throw new UserNotFoundException();
    });
  }
  
}

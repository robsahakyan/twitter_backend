import { UserNotFoundException } from './exceptions/folow-not-found.exception';
import { Injectable } from '@nestjs/common';
import { FolowRepository } from './folow.repository';
import { FolowEntity } from './folow.entity';
import { UtilsProvider } from '../../providers/utils.provider';
import { FolowDto } from 'modules/common/modules/folow/folow.dto';
import { FlowFlags } from 'typescript';
import { UserUnauthenticatedException } from '../../modules/auth/exceptions/user-unauthenticated.exception';
import { error } from 'console';

@Injectable()
export class FolowService {
  constructor(private folowRepository: FolowRepository) {}

  async folow(folowDto,user) {
    let data = {
      folowerId:user.id,
      folowingId:folowDto.folowing
    };
    // console.log(data);
    const validationFolowerId = await this.folowRepository.findByfolowerId(data.folowerId)
    for (let i = 0; i < validationFolowerId.length; i++) {
      console.log( validationFolowerId.toDtos()[0].id);
      
    }
    
    // const folowEntity = this.folowRepository.create(data)
  
    // return await this.folowRepository.save(data)
  }
}

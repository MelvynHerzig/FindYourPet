import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { AdvertsEntity } from '../../../models/adverts/adverts.entity';


export class ReadMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, AdvertsEntity);
  }
}

export class CreateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, AdvertsEntity);
  }
}

export class DeleteMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, AdvertsEntity);
  }
}

export class UpdateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, AdvertsEntity);
  }
}

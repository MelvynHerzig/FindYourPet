import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { AdvertsEntity } from '../../../models/adverts/adverts.entity';

export class ReadAdvertsPolicyhandler implements IPolicyHandler {

  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, AdvertsEntity);
  }
}

export class CreateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, AdvertsEntity);
  }
}

export class DeleteAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, AdvertsEntity);
  }
}

export class UpdateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, AdvertsEntity);
  }
}

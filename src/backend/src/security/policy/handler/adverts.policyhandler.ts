import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { Advert } from '../../../models/adverts/entities/adverts.entity';

export class ReadAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Advert);
  }
}

export class CreateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Advert);
  }
}

export class DeleteAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Advert);
  }
}

export class ManageAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Manage, Advert);
  }
}

export class UpdateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, Advert);
  }
}

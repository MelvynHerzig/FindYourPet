import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { Adverts } from '../../../models/adverts/entities/adverts.entity';

export class ReadAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Adverts);
  }
}

export class CreateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Adverts);
  }
}

export class DeleteAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Adverts);
  }
}

export class ManageAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Manage, Adverts);
  }
}

export class UpdateAdvertsPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, Adverts);
  }
}

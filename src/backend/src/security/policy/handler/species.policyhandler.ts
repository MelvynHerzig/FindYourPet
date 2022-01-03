import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { Species } from '../../../models/species/entities/species.entity';

export class ReadSpeciesPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Species);
  }
}

export class CreateSpeciesPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Species);
  }
}

export class DeleteSpeciesPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Species);
  }
}

export class UpdateSpeciesPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, Species);
  }
}

import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { Member } from '../../../models/members/entities/members.entity';

export class ReadMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Member);
  }
}

export class CreateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Member);
  }
}

export class DeleteMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Member);
  }
}

export class UpdateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, Member);
  }
}

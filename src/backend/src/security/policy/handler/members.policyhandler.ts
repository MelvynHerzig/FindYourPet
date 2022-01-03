import { IPolicyHandler } from './policyhandler.interface';
import { Action, AppAbility } from '../../casl/casl-ability.factory';
import { Members } from '../../../models/members/entities/members.entity';

export class ReadMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Members);
  }
}

export class CreateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Members);
  }
}

export class DeleteMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Delete, Members);
  }
}

export class UpdateMembersPolicyhandler implements IPolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Update, Members);
  }
}

import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Adverts } from '../../models/adverts/entities/adverts.entity';
import { Members } from '../../models/members/entities/members.entity';
import { Injectable } from '@nestjs/common';
import { Species } from '../../models/species/entities/species.entity';

type Subjects =
  | InferSubjects<typeof Adverts | typeof Species | typeof Members>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForMember(member: Members) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (member) {
      if (member.isAdmin) {
        can(Action.Manage, 'all'); // read-write access to everything
      }

      // Adverts
      can(Action.Read, Adverts);
      can(Action.Create, Adverts);
      can(Action.Manage, Adverts, { memberId: member.id });

      // Species
      can(Action.Read, Species);

      // Members
      can(Action.Manage, Members, { id: member.id });
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

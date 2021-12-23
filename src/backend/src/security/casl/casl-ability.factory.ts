import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { AdvertsEntity } from '../../models/adverts/adverts.entity';
import { MembersEntity } from '../../models/members/members.entity';
import { Injectable } from '@nestjs/common';
import { SpeciesEntity } from '../../models/species/species.entity';

type Subjects =
  | InferSubjects<typeof AdvertsEntity | typeof SpeciesEntity | typeof MembersEntity>
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
  createForMember(member: MembersEntity) {
    const {can, cannot, build} = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);

    if (member) {
      if (member.isAdmin) {
        can(Action.Manage, 'all'); // read-write access to everything
      }

      // Adverts
      can(Action.Read, AdvertsEntity);
      can(Action.Create, AdvertsEntity);
      can(Action.Manage, AdvertsEntity, {memberId: member.id});

      // Species
      can(Action.Read, SpeciesEntity);

      // Members
      can(Action.Manage, MembersEntity, {id: member.id});
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

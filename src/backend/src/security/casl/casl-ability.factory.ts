import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Advert } from '../../models/adverts/entities/adverts.entity';
import { Member } from '../../models/members/entities/members.entity';
import { Injectable } from '@nestjs/common';
import { Species } from '../../models/species/entities/species.entity';

type Subjects =
  | InferSubjects<typeof Advert | typeof Species | typeof Member>
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
/**
 * Class for ability of each user
 * @author Alec Berney, Teo Ferrari, Quentin Forestier, Melvyn Herzig
 */
export class CaslAbilityFactory {
  /**
   * Create all ability of the member
   * @param member Member to create ability for
   */
  createForMember(member: Member) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (member) {
      if (member.isAdmin) {
        can(Action.Read, 'all');
        can(Action.Create, 'all');
        can(Action.Update, 'all');
        can(Action.Delete, 'all');
      } else {
        // Adverts
        can(Action.Read, Advert);
        can(Action.Create, Advert);
        can(Action.Update, Advert, { memberId: member.id });
        can(Action.Delete, Advert, { memberId: member.id });

        // Species
        can(Action.Read, Species);

        // Members
        can(Action.Read, Member, { id: member.id });
        can(Action.Update, Member, { id: member.id });
        can(Action.Delete, Member, { id: member.id });
      }
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

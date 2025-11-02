import { Rune } from '../types/rune';
import { ArmorRuneData } from './rune/Armor';
import { EmblemRuneData } from './rune/Emblem';
import { WeaponRuneData } from './rune/Weapon';

import { WarriorRuneData } from './rune/Warrior';
import { GreatSwordWarriorRuneData } from './rune/GreatSwordWarrior';
import { SwordMasterRuneData } from './rune/SwordMaster';

import { ArcherRuneData } from './rune/Archer';
import { CrossbowRuneData } from './rune/Crossbow';
import { LongbowRuneData } from './rune/Longbow';

import { MageRuneData } from './rune/Mage';
import { FrostMageRuneData } from './rune/FrostMage';
import { FireMageRuneData } from './rune/FireMage';
import { LightningMageRuneData } from './rune/LightningMage';

import { ThiefRuneData } from './rune/Thief';
import { DualBladeRuneData } from './rune/DualBlade';
import { FighterRuneData } from './rune/Fighter';

import { HealerRuneData } from './rune/Healer';
import { PriestRuneData } from './rune/Priest';
import { MonkRuneData } from './rune/Monk';
import { DarkMageRuneData } from './rune/DarkMage';

import { BardRuneData } from './rune/Bard';
import { SingerRuneData } from './rune/Singer';
import { DancerRuneData } from './rune/Dancer';

export const RuneData: Rune[] = [
  ...WeaponRuneData,
  ...ArmorRuneData,
  ...EmblemRuneData,
  // 전사
  ...WarriorRuneData,
  ...GreatSwordWarriorRuneData,
  ...SwordMasterRuneData,
  // 궁수
  ...ArcherRuneData,
  ...CrossbowRuneData,
  ...LongbowRuneData,
  // 마법사
  ...MageRuneData,
  ...FrostMageRuneData,
  ...FireMageRuneData,
  ...LightningMageRuneData,
  // 도적
  ...ThiefRuneData,
  ...DualBladeRuneData,
  ...FighterRuneData,
  // 힐러
  ...HealerRuneData,
  ...PriestRuneData,
  ...MonkRuneData,
  ...DarkMageRuneData,
  // 음유시인
  ...BardRuneData,
  ...SingerRuneData,
  ...DancerRuneData,
];

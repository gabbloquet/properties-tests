const {elfArbitrary, trollArbitrary} = require("./generator");

const fc = require('fast-check');
const Troll = require('../lib/troll');

describe('Troll Invariance', () => {
  test('Troll score should be 0 when all elves resurrected', () => {
    fc.assert(
      fc.property(
        trollArbitrary(),
        troll => Troll.allElvesResurrected(troll).scoring() === 0
      )
    );
  });
  test('Troll score should always be >= 0', () => {
    fc.assert(fc.property(trollArbitrary(), troll => troll.scoring() >= 0));
  });
});

describe('Troll Inverse', () => {
  test('oopsHeSurvived should always be inverse of iGotOne', () => {
    fc.assert(
        fc.property(
            trollArbitrary(),
            elfArbitrary(),
            (troll, elf) => {
              const trollKillOne = Troll.iGotOne(elf)(troll);
              const trollTheOops = Troll.oopsHeSurvived(elf)(trollKillOne);
              return troll.scoring() === trollTheOops.scoring()
            }
        )
    )
  });
});

describe('Troll Analogy', () => {
  test('iGotOne and iGot should be consistent', () => {
    fc.assert(
        fc.property(
            trollArbitrary(),
            elfArbitrary(),
            (troll, elf) => {
              const kills = fc.integer(1, 50);
              let trollKillOneByOne = Troll.iGotOne(elf)(troll);
              for(let i = 1; i < kills; i++) {
                trollKillOneByOne = Troll.iGotOne(elf)(trollKillOneByOne);
              }
              const trollKillX = Troll.iGot(kills)(elf)(troll);
              return trollKillOneByOne.scoring() === trollKillX.scoring()
            }
        )
    )
  });
});

describe('Troll Idempotence', () => {
  test('allElvesOfAKind_resurrected brings the Troll killing list to a stable state', () => {
    /* Test go there */
  });
});

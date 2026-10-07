# -*- coding: utf-8 -*-
"""Build worklist.json: every unit to restyle, with description, refs, target height."""
import json, io, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
units = {u['id']: u for u in json.load(io.open(os.path.join(ROOT, 'units.json'), encoding='utf-8'))['units']}

REF = {
    'arm_dark':  ['nazgul_sword', 'mt_spear', 'gothmog'],
    'hero':      ['boromir', 'hirluin', 'gondor_knight'],
    'elf':       ['legolas', 'anborn', 'gildor'],
    'robe':      ['radagast', 'saruman', 'mouth_of_sauron'],
    'orc':       ['orc_sword2', 'hunter_orc', 'moria_goblin'],
    'monster':   ['war_troll', 'mountain_troll', 'balrog'],
    'beast':     ['warg', 'werewolf', 'huan'],
    'dragon':    ['glaurung', 'smaug', 'cave_drake'],
    'flyer':     ['great_eagle', 'crebain_swarm', 'bat_swarm'],
    'cav':       ['rohan_royal_guard', 'gondor_knight', 'elf_knight'],
    'cav_warg':  ['warg_rider', 'sharku', 'azog_warg_rider'],
    'ent':       ['ent', 'huorn'],
    'hobbit':    ['frodo', 'samwise', 'merry'],
    'dwarf':     ['gimli', 'dwarf_guardian', 'dwarf_axeshield'],
}

# per-unit: (archetype, description)   target_h derived from base/base_mm unless 'h' given
W = {
# -- lotr 6 --
'aragorn':            ('hero',   "Aragorn: dark green hooded ranger cloak, brown hair, leather straps, longsword held low."),
'gandalf':            ('robe',   "Gandalf the Grey: long grey robes, pointed grey wizard hat, wooden staff, grey beard."),
'warrior_minas_tirith':('hero',  "Gondor soldier: silver steel helm, black-and-silver plate, shield bearing the White Tree, sword."),
'witchking_foot':     ('arm_dark',"Witch-king on foot: tall hooded black wraith-lord, ragged dark mantle, iron crown under hood, longsword."),
'orc_sword':          ('orc',    "Mordor orc soldier: hunched, crude black iron plates, reddish-brown skin, scimitar."),
'cave_troll':         ('monster',"Cave troll: massive grey-green muscular troll, tiny head between shoulders, wooden club."),
# -- topdown 4 --
'glorfindel_foot':    ('elf',    "Glorfindel: elf lord, long golden hair, white-silver plate armor, sky-blue cloak, slender sword."),
'glorfindel_mounted': ('cav',    "Glorfindel mounted: elf lord with golden hair, white-silver armor and blue cloak, riding a white horse."),
'witchking_fellbeast':('flyer',  "Witch-king on fell beast: black-robed crowned rider on a huge winged leathery black wyvern, wings spread."),
'witchking_mounted':  ('arm_dark',"Witch-king mounted: black hooded wraith in dark armor riding an armored black horse."),
# -- single/other 4 --
'ancalagon':          ('dragon', "Ancalagon the Black: colossal black dragon, wings spread wide, ember-red belly scales."),
'nazgul_fellbeast':   ('flyer',  "Ringwraith on fell beast: hooded black rider on a winged leathery wyvern with spread wings."),
'fellbeast':          ('flyer',  "Fell beast: huge winged leathery dark wyvern, long neck and tail, wings spread."),
'quickbeam':          ('ent',    "Quickbeam: tall rowan-tree ent, green leafed crown, bark skin, long branch arms."),
# -- px-nb 58 --
'turgon':     ('elf', "Turgon, King of Gondolin: white-and-silver elven plate, long dark hair, sword."),
'fingon':     ('elf', "Fingon: elven warrior prince, silver chainmail, blue cloak, long dark hair, sword."),
'ecthelion':  ('elf', "Ecthelion of the Fountain: ornate silver elven armor, blue accents, sword."),
'finrod_felagund':('elf',"Finrod Felagund: golden-haired elf king, green-and-silver armor, sword."),
'tuor':       ('elf', "Tuor: mortal hero in elven gear, winged helm, shield, axe."),
'hurin_thalion':('hero',"Hurin: rugged human warrior, fur cloak, heavy sword."),
'maedhros':   ('elf', "Maedhros: tall elf lord, copper-red hair, silver armor, sword."),
'celegorm':   ('elf', "Celegorm the Fair: elf hunter-lord, green-and-silver armor, spear."),
'thingol':    ('elf', "Thingol, King of Doriath: tall silver-haired elf king, grey-and-silver robes, sword."),
'mablung_sindar':('elf',"Mablung: sindar elf captain, green-brown ranger gear, sword."),
'melian':     ('robe', "Melian the Maia: elven queen, flowing grey-silver gown, circlet, staff."),
'mim':        ('dwarf',"Mim the petty-dwarf: tiny grizzled old dwarf, hooded brown cloak, dagger."),
'doriath_warrior':('elf',"Doriath elf warrior: grey-green cloak, leaf-shaped sword, light armor."),
'falathrim_archer':('elf',"Falathrim elf archer: sea-grey tunic, longbow."),
'nargothrond_ranger':('elf',"Nargothrond elf ranger: hooded green cloak, bow."),
'edain_warrior':('hero',"Edain warrior: first-age man, fur-and-leather armor, sword."),
'gondolin_guard':('elf',"Gondolin guard: ornate white-and-silver elven plate, tall spear."),
'mirkwood_captain':('elf',"Mirkwood elf captain: green-grey forest armor, sword."),
'mordor_uruk':('orc',  "Mordor uruk: large black-breed orc, heavy dark iron armor, broad sword."),
'morgul_orc': ('orc',  "Morgul orc: lean orc in dark leather, greenish skin, curved blade."),
'morgul_rat': ('orc',  "Morgul rat-orc: small scrawny rat-faced orc, rags, dagger."),
'ufthak':     ('orc',  "Ufthak: burly orc of Cirith Ungol, dark armor, wide blade."),
'orc_sergeant':('orc', "Orc sergeant: whip-wielding orc officer, dark leather and iron, whip."),
'ashrak':     ('orc',  "Ashrak: spider-emblem orc champion, dark segmented armor, twin blades."),
'isengard_troll':('monster',"Isengard troll: huge grey troll in iron-banded harness, club."),
'dunlending_horseman':('cav',"Dunlending horseman: wild dark-haired rider on a shaggy pony, axe and hide shield."),
'wulf':       ('arm_dark',"Wulf of Dunland: wild hillman chief, dark furs and iron, great two-handed sword."),
'hera':       ('hero', "Hera of Rohan: shieldmaiden, blonde braids, mail and green cloak, axe."),
'frealaf':    ('hero', "Frealaf of Rohan: young lord, mail shirt, green cloak, axe."),
'rohan_yeoman':('hero',"Rohan yeoman: mail shirt, green cloak, spear and round shield."),
'serpent_guard':('arm_dark',"Serpent Guard of Harad: crimson-and-gold armor, serpent mask helm, glaive."),
'corsair_crossbowman':('arm_dark',"Umbar corsair crossbowman: dark leather, crimson sash, heavy crossbow."),
'mahud_blowpipe':('arm_dark',"Mahud blowpipe warrior: scarred face, bone ornaments, blowpipe."),
'khandish_warrior':('arm_dark',"Khandish warrior: bronze lamellar, fur mantle, mace."),
'easterling_mounted_archer':('cav',"Easterling mounted archer: bronze-armored rider on dark horse, bow."),
'far_harad_chieftain':('arm_dark',"Far Harad chieftain: tall dark warrior, feathered headdress, spear."),
'numenorean_knight':('cav',"Numenorean knight: full silver-and-black plate on armored black horse, long lance."),
'arnor_archer':('hero',"Arnor archer: grey-green cloak, leather armor, longbow."),
'duilin':     ('hero', "Duilin of Gondor: citadel guard, silver helm, bow."),
'derufin':    ('hero', "Derufin of Gondor: nimble soldier, dark armor, twin daggers."),
'hirgon':     ('hero', "Hirgon: Gondor errand-rider, green-and-silver, sword."),
'pippin_citadel':('hobbit',"Pippin in citadel guard kit: small hobbit in silver Gondor helmet and black-silver tabard, sword."),
'beorn_bear': ('monster',"Beorn in bear form: huge black-brown grizzly bear rearing up."),
'gwaihir':    ('flyer',"Gwaihir the Windlord: giant eagle, golden-brown feathers, wings spread."),
'lobelia':    ('hobbit',"Lobelia Sackville-Baggins: stout old hobbit lady, green dress, umbrella."),
'will_whitfoot':('hobbit',"Will Whitfoot: portly hobbit mayor, brown waistcoat, umbrella."),
'dwarf_shieldbearers':('dwarf',"Two dwarf shieldbearers carrying an oak shield palanquin - render as one stout dwarf holding a big oval shield."),
'iron_hills_captain':('dwarf',"Iron Hills dwarf captain: dark iron plate, forked beard, mattock hammer."),
'fingolfin_mounted':('cav',"Fingolfin on Rochallor: high elf king in blue-silver armor riding a white horse, sword raised."),
'galadhrim_knight':('cav',"Galadhrim knight: silver-grey elven rider on grey horse, spear."),
'mahud_raider':('arm_dark',"Mahud raider: dark wiry raider, feathered hair, club."),
'camel_rider': ('cav', "Mahud camel rider: dark raider with spear riding a saddled camel."),
'dale_warrior':('hero',"Warrior of Dale: blue-and-grey tunic, shield, sword."),
'esgaroth_archer':('hero',"Esgaroth archer: laketown bowman, grey cloak, longbow."),
'thorondor':  ('flyer',"Thorondor, King of Eagles: colossal golden eagle, wings spread wide."),
'rhosgobel_rabbit':('beast',"Rhosgobel rabbit-sled: two big grey rabbits harnessed side by side pulling a small sled."),
'morgul_duellist':('orc',"Morgul duellist: lithe orc blade-master, dark leather, thin duelling sword."),
'troll_shaman':('monster',"Troll shaman: hulking troll with bone fetishes and gnarled staff."),
# -- none 36 --
'pallando':   ('robe', "Pallando the Blue: wizard in deep blue robes, pointed hat, staff."),
'alatar':     ('robe', "Alatar the Blue: wizard in blue robes, pointed hat, staff."),
'annatar':    ('elf',  "Annatar, Lord of Gifts: fair radiant elf-like form, golden-white robes, circlet."),
'sauron_wolf':('beast',"Sauron in wolf form: huge black wolf, hackles raised, red eyes."),
'landroval':  ('flyer',"Landroval: giant eagle, dark brown plumage, wings spread."),
'meneldor':   ('flyer',"Meneldor: giant eagle, grey-brown plumage, wings spread."),
'leaflock':   ('ent',  "Leaflock: ancient ent, dense green leaf canopy, gnarled bark limbs."),
'beechbone':  ('ent',  "Beechbone: pale-barked ent, grey-smooth trunk, sparse leaves."),
'azaghal':    ('dwarf',"Azaghal of Belegost: dwarf king, heavy iron plate, great axe."),
'nain':       ('dwarf',"Nain of the Iron Hills: grizzled dwarf lord, iron armor, axe."),
'maglor':     ('elf',  "Maglor: tall elf harper-lord, dark hair, grey cloak, sword."),
'gwindor':    ('elf',  "Gwindor of Nargothrond: scarred elf noble, dark green cloak, sword."),
'celebrimbor':('elf',  "Celebrimbor: elf smith-lord, dark tunic, forge-hammer."),
'daeron':     ('robe', "Daeron the Minstrel: dark-haired elf minstrel, grey robes, staff."),
'earnur':     ('hero', "Earnur, King of Gondor: silver-black plate, winged crown-helm, sword."),
'sangarunya': ('arm_dark',"Sangarunya, Corsair Captain: dark leather corsair captain, crimson sash, curved sabre."),
'huor':       ('hero', "Huor: tall yellow-haired man of the Edain, heavy two-handed sword."),
'barahir':    ('hero', "Barahir of Ladros: outlaw lord, green-brown cloak, great sword."),
'elendur':    ('hero', "Elendur: Numenorean prince, silver-black armor, sword."),
'arpharazon': ('hero', "Ar-Pharazon the Golden: golden-armored king, ornate gold plate, sword."),
'anarion':    ('hero', "Anarion: Numenorean prince, silver-black plate, tall helm, sword."),
'earendil':   ('elf',  "Earendil: half-elven mariner, silver-white armor, deep blue cloak, star-jewel circlet."),
'maeglin':    ('elf',  "Maeglin: dark-haired elf of Gondolin, black-silver armor, sword."),
'eol':        ('elf',  "Eol the Dark Elf: dark armor, black cloak, sword."),
'galdor':     ('elf',  "Galdor of the Grey Havens: tall elf, sea-grey robes, staff."),
'thrain':     ('dwarf',"Thrain, son of Thror: dwarf king, blue-silver armor, warhammer."),
'thror':      ('dwarf',"Thror, King of Erebor: old dwarf king, ornate armor, warhammer."),
'golfimbul':  ('orc',  "Golfimbul of Mount Gram: huge goblin chief, dark armor, great two-handed club."),
'eomund':     ('cav',  "Eomund, Marshal of the Riddermark: Rohan marshal on grey horse, spear."),
'guthlaf':    ('hero', "Guthlaf: Rohan banner-bearer, mail, green cloak, banner and spear."),
'ingold':     ('hero', "Ingold: Gondor gate-guard, silver helm, spear and shield."),
'corsair_captain':('arm_dark',"Corsair Captain of Umbar: dark leather and scale, crimson cloak, sabre."),
'butterbur':  ('hobbit',"Barliman Butterbur: fat balding innkeeper, white shirt, brown apron, beer mug."),
'bill_ferny': ('hobbit',"Bill Ferny: weaselly man of Bree, dark cloak, cudgel."),
'scatha':     ('dragon',"Scatha the Worm: long grey-gold wingless dragon, coiled serpent body."),
'war_hound':  ('beast',"Rohan war hound: big grey-muzzled mastiff, spiked collar."),
# -- keep-family extras --
'hobbit_militia':('hobbit',"Hobbit militia: stout hobbit, green cloak, feathered hat, staff-sling."),
'tom_bombadil':('hobbit',"Tom Bombadil: merry stout man, bright blue coat, yellow boots, pointed hat with feather."),
'goldberry':  ('hobbit',"Goldberry: river-daughter, long blonde hair, green gown with water-lilies."),
}

def target_h(u):
    base, mm = u.get('base','M'), u.get('base_mm','')
    mm_i = int(mm.replace('mm','')) if mm and mm.endswith('mm') else 25
    if base == 'XXL':
        return {60:570, 100:640, 120:660}.get(mm_i, 590)
    if base == 'XL': return 490
    if base == 'GS': return 490 if mm_i >= 50 else 350
    if mm_i >= 50: return 490
    if base == 'S': return 320
    if base == 'L': return 360
    return 350

out = []
for uid, (arch, desc) in W.items():
    u = units.get(uid)
    if not u:
        print('MISSING', uid); continue
    h = target_h(u)
    # short races stay short even on bigger bases
    if arch == 'hobbit': h = min(h, 320)
    if arch == 'dwarf':  h = min(h, 340)
    out.append({'id': uid, 'refs': REF[arch], 'desc': desc, 'h': h,
                'file': u['file'], 'base': u['base']})
json.dump(out, io.open(os.path.join(ROOT, 'survey', 'worklist.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('worklist:', len(out))

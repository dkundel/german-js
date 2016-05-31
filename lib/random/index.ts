const POPULAR_BEERS = [
  'Beck’s',
  'Krombacher',
  'Warsteiner',
  'Veltins',
  'Bitburger',
  'König Pilsener',
  'Oettinger',
  'Erdinger',
  'Paulaner',
  'Radeberger',
  'Hasseröder',
  'Jever',
  'Schöfferhofer',
  'Köstritzer',
  'Clausthaler',
  'Franziskaner'
]

export function beer() {
  let idx = Math.floor(Math.random() * POPULAR_BEERS.length);
  return POPULAR_BEERS[idx];
}
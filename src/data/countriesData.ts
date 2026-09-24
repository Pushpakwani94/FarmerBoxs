export interface FruitOriginCountry {
  name: string;
  flag: string;
  code: string;
}

export const IMPORT_COUNTRIES: FruitOriginCountry[] = [
  { name: 'USA', flag: '🇺🇸', code: 'US' },
  { name: 'New Zealand', flag: '🇳🇿', code: 'NZ' },
  { name: 'Egypt', flag: '🇪🇬', code: 'EG' },
  { name: 'South Africa', flag: '🇿🇦', code: 'ZA' },
  { name: 'Iran', flag: '🇮🇷', code: 'IR' },
  { name: 'Chile', flag: '🇨🇱', code: 'CL' },
  { name: 'Turkey', flag: '🇹🇷', code: 'TR' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { name: 'Thailand', flag: '🇹🇭', code: 'TH' },
  { name: 'Peru', flag: '🇵🇪', code: 'PE' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { name: 'Afghanistan', flag: '🇦🇫', code: 'AF' },
  { name: 'Vietnam', flag: '🇻🇳', code: 'VN' },
  { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
  { name: 'Greece', flag: '🇬🇷', code: 'GR' },
  { name: 'Israel', flag: '🇮🇱', code: 'IL' },
  { name: 'China', flag: '🇨🇳', code: 'CN' }
];

export const getCountryFlag = (countryName?: string): string => {
  if (!countryName) return '🌐';
  const match = IMPORT_COUNTRIES.find(c => c.name.toLowerCase() === countryName.trim().toLowerCase());
  return match ? match.flag : '🌐';
};

import {DadataTypes} from '../../interfaces/DadataTypes';
import {DadataLocation} from '../../interfaces/DadataLocation';

export interface Bound {
  value: 'country' | 'region' | 'city' | 'street' | 'settlement' | 'area' | 'house';
}

export interface Bounds {
  fromBound?: Bound;
  toBound?: Bound;
}

export interface DadataConfig {
  type?: DadataTypes;
  delay?: number;
  limit?: number;
  locations?: DadataLocation[];
  bounds?: Bounds;
  placeholder?: string;
  class?: string;
  constraint?: string;
  label?: string;
}

export const DadataConfigDefault: DadataConfig = {
  type: DadataTypes.address,
  delay: 500,
  limit: 10,
  placeholder: '',
  class: '',
  label: '',
};

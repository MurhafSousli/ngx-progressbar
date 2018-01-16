export interface NgProgressState {
  active?: boolean;
  value?: number;
}

export interface NgProgressConfig {
  spinnerPosition?: 'left' | 'right';
  direction?: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
  ease?: string;
  color?: string;
  thick?: boolean;
  meteor?: boolean;
  spinner?: boolean;
  max?: number;
  min?: number;
  speed?: number;
  trickleSpeed?: number;
}


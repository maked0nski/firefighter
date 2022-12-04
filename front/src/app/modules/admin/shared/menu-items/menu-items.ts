import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'fuel_cards', name: 'Паливні картки', type: 'link', icon: 'payment'},
  {state: 'sim_cards', name: 'Сім картки', type: 'link', icon: 'sim_card'},
  {state: 'positions', name: 'Посади', type: 'link', icon: 'assignment_ind'},
  {state: 'clients', name: 'Фірми-клієнти', type: 'link', icon: 'business'},
  {state: 'cars', name: 'Автомобілі', type: 'link', icon: 'directions_car'},
  {state: 'lists', name: 'Lists', type: 'link', icon: 'view_list'},
  {state: 'menu', name: 'Menu', type: 'link', icon: 'view_headline'},
  {state: 'tabs', name: 'Tabs', type: 'link', icon: 'tab'},
  {state: 'stepper', name: 'Stepper', type: 'link', icon: 'web'},
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
  {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
  {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
  {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

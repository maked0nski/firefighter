import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenuItems} from "./menu-items/menu-items";
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from "./accordion";



@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [ MenuItems ]
})
export class SharedModule { }

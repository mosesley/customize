import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
/**
 * button 鼠标hover动画：变大为原来的1.2倍
 * @type {AnimationTriggerMetadata}
 * Created by maxu0 on 2017/5/12.
 */
export const btnHoverAnimation: AnimationTriggerMetadata =
  trigger('btnState', [
    state('active', style({
      transform: 'scale(1.2)'
    })),
    state('inactive',   style({
      transform: 'scale(1)'
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
  ]);

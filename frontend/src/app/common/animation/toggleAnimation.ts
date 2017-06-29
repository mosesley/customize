import { animate, AnimationTriggerMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';
/**
 * 用户菜单的展开和收缩
 * @type {AnimationTriggerMetadata}
 * Created by maxu0 on 2017/5/12.
 */
export const toggleAnimation: AnimationTriggerMetadata = trigger('toggleAnimation', [
  transition(':enter', [ // 进场动画
    animate(200, keyframes([
      style({ height: '0', opacity: 0, offset: 0 }), // 元素高度0，元素隐藏(透明度为0)，动画帧在0%
      style({ height: '*', opacity: 1, offset: 1 }) // 200ms后高度自适应展开，元素展开(透明度为1)，动画帧在100%
    ]))
  ]),
  transition(':leave', [
    animate(200, keyframes([
      style({ height: '*', opacity: 1, offset: 0 }), // 与之对应，让元素从显示到隐藏一个过渡
      style({ height: '0', opacity: 0, offset: 1 })
    ]))
  ]),
]);


/**
 * 菜单右边小图标90度旋转动画
 * @type {AnimationTriggerMetadata}
 * Created by maxu0 on 2017/6/29.
 */
export const rotateAnimation: AnimationTriggerMetadata = trigger('rotateAnimation', [
  state('right', style({transform: 'rotate(0)'})),
  state('down',   style({transform: 'rotate(90deg)'})),
  transition('right => down', animate('200ms ease-in')),
  transition('down => right', animate('200ms ease-out'))
]);

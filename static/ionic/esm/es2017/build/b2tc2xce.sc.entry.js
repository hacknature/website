import { h } from '../ionic.core.js';

import { a as BACKDROP, c as present, d as dismiss, e as eventMethod, f as createOverlay, g as dismissOverlay, h as getOverlay } from './chunk-4f24dff4.js';
import { a as getClassMap } from './chunk-7c632336.js';
import { a as attachComponent, b as detachComponent } from './chunk-99929188.js';
import './chunk-90d954cd.js';
import { a as deepReady } from './chunk-da1efb5f.js';

function iosEnterAnimation(AnimationC, baseEl, ev) {
    let originY = 'top';
    let originX = 'left';
    const contentEl = baseEl.querySelector('.popover-content');
    const contentDimentions = contentEl.getBoundingClientRect();
    const contentWidth = contentDimentions.width;
    const contentHeight = contentDimentions.height;
    const bodyWidth = window.innerWidth;
    const bodyHeight = window.innerHeight;
    const targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    const targetTop = targetDim != null && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - contentHeight / 2;
    const targetLeft = targetDim != null && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
    const targetWidth = (targetDim && targetDim.width) || 0;
    const targetHeight = (targetDim && targetDim.height) || 0;
    const arrowEl = baseEl.querySelector('.popover-arrow');
    const arrowDim = arrowEl.getBoundingClientRect();
    const arrowWidth = arrowDim.width;
    const arrowHeight = arrowDim.height;
    if (targetDim == null) {
        arrowEl.style.display = 'none';
    }
    const arrowCSS = {
        top: targetTop + targetHeight,
        left: targetLeft + targetWidth / 2 - arrowWidth / 2
    };
    const popoverCSS = {
        top: targetTop + targetHeight + (arrowHeight - 1),
        left: targetLeft + targetWidth / 2 - contentWidth / 2
    };
    let checkSafeAreaLeft = false;
    let checkSafeAreaRight = false;
    if (popoverCSS.left < POPOVER_IOS_BODY_PADDING + 25) {
        checkSafeAreaLeft = true;
        popoverCSS.left = POPOVER_IOS_BODY_PADDING;
    }
    else if (contentWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25 > bodyWidth) {
        checkSafeAreaRight = true;
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_IOS_BODY_PADDING;
        originX = 'right';
    }
    if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
        arrowCSS.top = targetTop - (arrowHeight + 1);
        popoverCSS.top = targetTop - contentHeight - (arrowHeight - 1);
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
    }
    arrowEl.style.top = arrowCSS.top + 'px';
    arrowEl.style.left = arrowCSS.left + 'px';
    contentEl.style.top = popoverCSS.top + 'px';
    contentEl.style.left = popoverCSS.left + 'px';
    if (checkSafeAreaLeft) {
        contentEl.style.left = `calc(${popoverCSS.left}px + var(--ion-safe-area-left, 0px))`;
    }
    if (checkSafeAreaRight) {
        contentEl.style.left = `calc(${popoverCSS.left}px - var(--ion-safe-area-right, 0px))`;
    }
    contentEl.style.transformOrigin = originY + ' ' + originX;
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    backdropAnimation.fromTo('opacity', 0.01, 0.08);
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.01, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(100)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}
const POPOVER_IOS_BODY_PADDING = 5;

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    backdropAnimation.fromTo('opacity', 0.08, 0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl, ev) {
    let originY = 'top';
    let originX = 'left';
    const contentEl = baseEl.querySelector('.popover-content');
    const contentDimentions = contentEl.getBoundingClientRect();
    const contentWidth = contentDimentions.width;
    const contentHeight = contentDimentions.height;
    const bodyWidth = window.innerWidth;
    const bodyHeight = window.innerHeight;
    const targetDim = ev && ev.target && ev.target.getBoundingClientRect();
    const targetTop = targetDim != null && 'top' in targetDim
        ? targetDim.top
        : bodyHeight / 2 - contentHeight / 2;
    const isRTL = document.dir === 'rtl';
    const targetLeft = targetDim != null && 'left' in targetDim
        ? isRTL
            ? targetDim.left - contentWidth + targetDim.width
            : targetDim.left
        : bodyWidth / 2 - contentWidth / 2;
    const targetHeight = (targetDim && targetDim.height) || 0;
    const popoverCSS = {
        top: targetTop,
        left: targetLeft
    };
    if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
        popoverCSS.left = POPOVER_MD_BODY_PADDING;
    }
    else if (contentWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left >
        bodyWidth) {
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_MD_BODY_PADDING;
        originX = 'right';
    }
    if (targetTop + targetHeight + contentHeight > bodyHeight &&
        targetTop - contentHeight > 0) {
        popoverCSS.top = targetTop - contentHeight;
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom';
    }
    else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
    }
    contentEl.style.top = popoverCSS.top + 'px';
    contentEl.style.left = popoverCSS.left + 'px';
    contentEl.style.transformOrigin = originY + ' ' + originX;
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.01, 1);
    const contentAnimation = new AnimationC();
    contentAnimation.addElement(baseEl.querySelector('.popover-content'));
    contentAnimation.fromTo('scale', 0.001, 1);
    const viewportAnimation = new AnimationC();
    viewportAnimation.addElement(baseEl.querySelector('.popover-viewport'));
    viewportAnimation.fromTo('opacity', 0.01, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(300)
        .add(backdropAnimation)
        .add(wrapperAnimation)
        .add(contentAnimation)
        .add(viewportAnimation));
}
const POPOVER_MD_BODY_PADDING = 12;

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper'));
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    backdropAnimation.fromTo('opacity', 0.32, 0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease')
        .duration(500)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

class Popover {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.backdropDismiss = true;
        this.showBackdrop = true;
        this.translucent = false;
        this.animated = true;
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    onBackdropTap() {
        this.dismiss(undefined, BACKDROP);
    }
    lifecycle(modalEvent) {
        const el = this.usersElement;
        const name = LIFECYCLE_MAP[modalEvent.type];
        if (el && name) {
            const event = new CustomEvent(name, {
                bubbles: false,
                cancelable: false,
                detail: modalEvent.detail
            });
            el.dispatchEvent(event);
        }
    }
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector('.popover-content');
        if (!container) {
            throw new Error('container is undefined');
        }
        const data = Object.assign({}, this.componentProps, { popover: this.el });
        this.usersElement = await attachComponent(this.delegate, container, this.component, ['popover-viewport', this.el['s-sc']], data);
        await deepReady(this.usersElement);
        return present(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, this.event);
    }
    async dismiss(data, role) {
        const shouldDismiss = await dismiss(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event);
        if (shouldDismiss) {
            await detachComponent(this.delegate, this.usersElement);
        }
        return shouldDismiss;
    }
    onDidDismiss() {
        return eventMethod(this.el, 'ionPopoverDidDismiss');
    }
    onWillDismiss() {
        return eventMethod(this.el, 'ionPopoverWillDismiss');
    }
    hostData() {
        return {
            'aria-modal': 'true',
            'no-router': true,
            style: {
                zIndex: 20000 + this.overlayIndex,
            },
            class: Object.assign({}, getClassMap(this.cssClass), { 'popover-translucent': this.translucent })
        };
    }
    render() {
        return [
            h("ion-backdrop", { tappable: this.backdropDismiss, visible: this.showBackdrop }),
            h("div", { class: "popover-wrapper" },
                h("div", { class: "popover-arrow" }),
                h("div", { class: "popover-content" }))
        ];
    }
    static get is() { return "ion-popover"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "backdropDismiss": {
            "type": Boolean,
            "attr": "backdrop-dismiss"
        },
        "component": {
            "type": String,
            "attr": "component"
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "dismiss": {
            "method": true
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "event": {
            "type": "Any",
            "attr": "event"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayIndex": {
            "type": Number,
            "attr": "overlay-index"
        },
        "present": {
            "method": true
        },
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionPopoverDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionPopoverDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }, {
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionPopoverDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionPopoverDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return ".sc-ion-popover-md-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1000}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md-h   .popover-content.sc-ion-popover-md, [dir=rtl]   .sc-ion-popover-md-h   .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:.1s;transition-delay:.1s}"; }
    static get styleMode() { return "md"; }
}
const LIFECYCLE_MAP = {
    'ionPopoverDidPresent': 'ionViewDidEnter',
    'ionPopoverWillPresent': 'ionViewWillEnter',
    'ionPopoverWillDismiss': 'ionViewWillLeave',
    'ionPopoverDidDismiss': 'ionViewDidLeave',
};

class PopoverController {
    create(opts) {
        return createOverlay(this.doc.createElement('ion-popover'), opts);
    }
    dismiss(data, role, id) {
        return dismissOverlay(this.doc, data, role, 'ion-popover', id);
    }
    async getTop() {
        return getOverlay(this.doc, 'ion-popover');
    }
    static get is() { return "ion-popover-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}

export { Popover as IonPopover, PopoverController as IonPopoverController };

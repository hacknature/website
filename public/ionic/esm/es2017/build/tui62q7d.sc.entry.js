import { h } from '../ionic.core.js';

import { c as createColorClasses } from './chunk-7c632336.js';

class TabBar {
    constructor() {
        this.keyboardVisible = false;
        this.translucent = false;
    }
    selectedTabChanged() {
        this.ionTabBarChanged.emit({
            tab: this.selectedTab
        });
    }
    onKeyboardWillHide() {
        setTimeout(() => this.keyboardVisible = false, 50);
    }
    onKeyboardWillShow() {
        if (this.el.getAttribute('slot') !== 'top') {
            this.keyboardVisible = true;
        }
    }
    componentWillLoad() {
        this.selectedTabChanged();
    }
    hostData() {
        const { color, translucent, keyboardVisible } = this;
        return {
            'role': 'tablist',
            'aria-hidden': keyboardVisible ? 'true' : null,
            class: Object.assign({}, createColorClasses(color), { 'tab-bar-translucent': translucent, 'tab-bar-hidden': keyboardVisible })
        };
    }
    render() {
        return (h("slot", null));
    }
    static get is() { return "ion-tab-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "doc": {
            "context": "document"
        },
        "el": {
            "elementRef": true
        },
        "keyboardVisible": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "queue": {
            "context": "queue"
        },
        "selectedTab": {
            "type": String,
            "attr": "selected-tab",
            "watchCallbacks": ["selectedTabChanged"]
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionTabBarChanged",
            "method": "ionTabBarChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "window:keyboardWillHide",
            "method": "onKeyboardWillHide"
        }, {
            "name": "window:keyboardWillShow",
            "method": "onKeyboardWillShow"
        }]; }
    static get style() { return ".sc-ion-tab-bar-ios-h{padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-bottom:var(--ion-safe-area-bottom,0);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-tab-bar-ios-h{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}.ion-color.sc-ion-tab-bar-ios-h, .sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > ion-tab-button{background:var(--ion-color-base);color:rgba(var(--ion-color-contrast-rgb),.7)}.sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > ion-tab-button{--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}.sc-ion-tab-bar-ios-h.ion-color .sc-ion-tab-bar-ios-s > .tab-selected{color:var(--ion-color-contrast)}[slot=top].sc-ion-tab-bar-ios-h{padding-bottom:0;border-top:0;border-bottom:var(--border)}.tab-bar-hidden.sc-ion-tab-bar-ios-h{display:none!important}.sc-ion-tab-bar-ios-h{--background:var(--ion-tab-bar-background,var(--ion-background-color,#fff));--background-focused:var(--ion-tab-bar-background-focused,#e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));--color:var(--ion-tab-bar-color,var(--ion-color-step-450,#8c8c8c));--color-selected:var(--ion-tab-bar-color-activated,var(--ion-color-primary,#3880ff));height:50px}.tab-bar-translucent.sc-ion-tab-bar-ios-h{background-color:rgba(var(--ion-color-base-rgb),.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}"; }
    static get styleMode() { return "ios"; }
}

class TabButton {
    constructor() {
        this.selected = false;
        this.disabled = false;
    }
    onTabBarChanged(ev) {
        this.selected = this.tab === ev.detail.tab;
    }
    onClick(ev) {
        if (this.tab !== undefined) {
            if (!this.disabled) {
                this.ionTabButtonClick.emit({
                    tab: this.tab,
                    href: this.href,
                    selected: this.selected
                });
            }
            ev.preventDefault();
        }
    }
    componentWillLoad() {
        if (this.layout === undefined) {
            this.layout = this.config.get('tabButtonLayout', 'icon-top');
        }
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    hostData() {
        const { disabled, hasIcon, hasLabel, layout, selected, tab } = this;
        return {
            'role': 'tab',
            'aria-selected': selected ? 'true' : null,
            'id': tab !== undefined ? `tab-button-${tab}` : null,
            class: {
                'tab-selected': selected,
                'tab-disabled': disabled,
                'tab-has-label': hasLabel,
                'tab-has-icon': hasIcon,
                'tab-has-label-only': hasLabel && !hasIcon,
                'tab-has-icon-only': hasIcon && !hasLabel,
                [`tab-layout-${layout}`]: true,
                'ion-activatable': true,
            }
        };
    }
    render() {
        const { mode, href } = this;
        return (h("a", { href: href },
            h("slot", null),
            mode === 'md' && h("ion-ripple-effect", { type: "unbounded" })));
    }
    static get is() { return "ion-tab-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "doc": {
            "context": "document"
        },
        "el": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "layout": {
            "type": String,
            "attr": "layout",
            "mutable": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "queue": {
            "context": "queue"
        },
        "selected": {
            "type": Boolean,
            "attr": "selected",
            "mutable": true
        },
        "tab": {
            "type": String,
            "attr": "tab"
        }
    }; }
    static get events() { return [{
            "name": "ionTabButtonClick",
            "method": "ionTabButtonClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "parent:ionTabBarChanged",
            "method": "onTabBarChanged"
        }, {
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return ".sc-ion-tab-button-ios-h{--ripple-color:var(--color-selected);-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:var(--background);color:var(--color)}.sc-ion-tab-button-ios-h, a.sc-ion-tab-button-ios{height:100%}a.sc-ion-tab-button-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;border:0;outline:none;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){a.sc-ion-tab-button-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}a.sc-ion-tab-button-ios:focus-visible{background:var(--background-focused)}\@media (any-hover:hover){a.sc-ion-tab-button-ios:hover{color:var(--color-selected)}}.tab-selected.sc-ion-tab-button-ios-h{color:var(--color-selected)}.tab-hidden.sc-ion-tab-button-ios-h{display:none!important}.tab-disabled.sc-ion-tab-button-ios-h{pointer-events:none;opacity:.4}.sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-s > ion-label{display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.sc-ion-tab-button-ios-s > ion-label{-ms-flex-order:0;order:0}.sc-ion-tab-button-ios-s > ion-icon{-ms-flex-order:-1;order:-1;height:1em}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-label{white-space:normal}.sc-ion-tab-button-ios-s > ion-badge{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}.tab-layout-icon-start.sc-ion-tab-button-ios-h{-ms-flex-direction:row;flex-direction:row}.tab-layout-icon-end.sc-ion-tab-button-ios-h{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.tab-layout-icon-bottom.sc-ion-tab-button-ios-h{-ms-flex-direction:column-reverse;flex-direction:column-reverse}.sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-label{display:none}ion-ripple-effect.sc-ion-tab-button-ios{color:var(--ripple-color)}.sc-ion-tab-button-ios-h{--padding-top:0;--padding-end:2px;--padding-bottom:0;--padding-start:2px;max-width:240px;font-size:10px}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-label{margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;font-size:12px;font-size:14px;line-height:1.1}.sc-ion-tab-button-ios-s > ion-badge{padding-left:6px;padding-right:6px;padding-top:1px;padding-bottom:1px;left:calc(50% + 6px);top:4px;height:auto;font-size:12px;line-height:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-tab-button-ios-s > ion-badge{padding-left:unset;padding-right:unset;-webkit-padding-start:6px;padding-inline-start:6px;-webkit-padding-end:6px;padding-inline-end:6px}}.sc-ion-tab-button-ios-h[dir=rtl] .sc-ion-tab-button-ios-s > ion-badge, [dir=rtl] .sc-ion-tab-button-ios-h .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 6px)}.sc-ion-tab-button-ios-s > ion-icon{margin-top:4px;font-size:30px}.sc-ion-tab-button-ios-s > ion-icon:before{vertical-align:top}.sc-ion-tab-button-ios-s > ion-label{margin-top:0;margin-bottom:1px;min-height:11px}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-label, .sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-label, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-label{margin-top:2px;margin-bottom:2px;font-size:14px;line-height:1.1}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-icon, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-icon{min-width:24px;height:26px;margin-top:2px;margin-bottom:1px;font-size:24px}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 12px)}.sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 12px)}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-icon{margin-top:0;margin-bottom:1px}.sc-ion-tab-button-ios-h.tab-layout-icon-bottom .sc-ion-tab-button-ios-s > ion-label{margin-top:4px}.sc-ion-tab-button-ios-h.tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 35px);top:10px}.sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-end .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-start .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 35px)}.sc-ion-tab-button-ios-h.tab-has-label-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-badge{left:calc(50% + 30px);top:10px}.sc-ion-tab-button-ios-h[dir=rtl].tab-has-label-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h[dir=rtl].tab-layout-icon-hide .sc-ion-tab-button-ios-s > ion-badge{right:calc(50% + 30px)}.sc-ion-tab-button-ios-h.tab-has-icon-only .sc-ion-tab-button-ios-s > ion-badge, .sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-badge{top:10px}.sc-ion-tab-button-ios-h.tab-layout-label-hide .sc-ion-tab-button-ios-s > ion-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; }
    static get styleMode() { return "ios"; }
}

export { TabBar as IonTabBar, TabButton as IonTabButton };

import {
  script
} from "./chunk-UGK56YZS.js";
import {
  Ripple
} from "./chunk-7DRKSPMN.js";
import {
  DomHandler,
  ObjectUtils,
  ZIndexUtils
} from "./chunk-XADPZ4M6.js";
import {
  Transition,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderSlot,
  resolveComponent,
  resolveDirective,
  withCtx,
  withDirectives
} from "./chunk-R225DL6P.js";

// node_modules/primevue/focustrap/focustrap.esm.js
function bind(el, binding) {
  const { onFocusIn, onFocusOut } = binding.value || {};
  el.$_pfocustrap_mutationobserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList" && !el.contains(document.activeElement)) {
        const findNextFocusableElement = (el2) => {
          const focusableElement = DomHandler.isFocusableElement(el2) ? el2 : DomHandler.getFirstFocusableElement(el2);
          return ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : findNextFocusableElement(el2.nextSibling);
        };
        DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
      }
    });
  });
  el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_mutationobserver.observe(el, {
    childList: true
  });
  el.$_pfocustrap_focusinlistener = (event) => onFocusIn && onFocusIn(event);
  el.$_pfocustrap_focusoutlistener = (event) => onFocusOut && onFocusOut(event);
  el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
  el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
}
function unbind(el) {
  el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
  el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
  el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
}
function autoFocus(el, binding) {
  const { autoFocusSelector = "", firstFocusableSelector = "", autoFocus: autoFocus2 = false } = binding.value || {};
  let focusableElement = DomHandler.getFirstFocusableElement(el, `[autofocus]:not(.p-hidden-focusable)${autoFocusSelector}`);
  autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, `:not(.p-hidden-focusable)${firstFocusableSelector}`));
  DomHandler.focus(focusableElement);
}
function onFirstHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function onLastHiddenElementFocus(event) {
  const { currentTarget, relatedTarget } = event;
  const focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement ? DomHandler.getLastFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
  DomHandler.focus(focusableElement);
}
function createHiddenFocusableElements(el, binding) {
  const { tabIndex = 0, firstFocusableSelector = "", lastFocusableSelector = "" } = binding.value || {};
  const createFocusableElement = (onFocus) => {
    const element = document.createElement("span");
    element.classList = "p-hidden-accessible p-hidden-focusable";
    element.tabIndex = tabIndex;
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("role", "presentation");
    element.addEventListener("focus", onFocus);
    return element;
  };
  const firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus);
  const lastFocusableElement = createFocusableElement(onLastHiddenElementFocus);
  firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
  firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
  lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
  lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
  el.prepend(firstFocusableElement);
  el.append(lastFocusableElement);
}
var FocusTrap = {
  mounted(el, binding) {
    const { disabled } = binding.value || {};
    if (!disabled) {
      createHiddenFocusableElements(el, binding);
      bind(el, binding);
      autoFocus(el, binding);
    }
  },
  updated(el, binding) {
    const { disabled } = binding.value || {};
    disabled && unbind(el);
  },
  unmounted(el) {
    unbind(el);
  }
};

// node_modules/primevue/sidebar/sidebar.esm.js
var script2 = {
  name: "Sidebar",
  inheritAttrs: false,
  emits: ["update:visible", "show", "hide", "after-hide"],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "left"
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    autoZIndex: {
      type: Boolean,
      default: true
    },
    dismissable: {
      type: Boolean,
      default: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: "pi pi-times"
    },
    modal: {
      type: Boolean,
      default: true
    },
    blockScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      containerVisible: this.visible
    };
  },
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  closeButton: null,
  outsideClickListener: null,
  updated() {
    if (this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount() {
    this.disableDocumentSettings();
    if (this.mask && this.autoZIndex) {
      ZIndexUtils.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
    onEnter() {
      this.$emit("show");
      this.focus();
      if (this.autoZIndex) {
        ZIndexUtils.set("modal", this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
      }
    },
    onAfterEnter() {
      this.enableDocumentSettings();
    },
    onBeforeLeave() {
      if (this.modal) {
        DomHandler.addClass(this.mask, "p-component-overlay-leave");
      }
    },
    onLeave() {
      this.$emit("hide");
    },
    onAfterLeave() {
      if (this.autoZIndex) {
        ZIndexUtils.clear(this.mask);
      }
      this.containerVisible = false;
      this.disableDocumentSettings();
      this.$emit("after-hide");
    },
    onMaskClick(event) {
      if (this.dismissable && this.modal && this.mask === event.target) {
        this.hide();
      }
    },
    focus() {
      const findFocusableElement = (container) => {
        return container.querySelector("[autofocus]");
      };
      let focusTarget = this.$slots.default && findFocusableElement(this.content);
      if (!focusTarget) {
        focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
        if (!focusTarget) {
          focusTarget = findFocusableElement(this.container);
        }
      }
      focusTarget && focusTarget.focus();
    },
    enableDocumentSettings() {
      if (this.dismissable && !this.modal) {
        this.bindOutsideClickListener();
      }
      if (this.blockScroll) {
        DomHandler.addClass(document.body, "p-overflow-hidden");
      }
    },
    disableDocumentSettings() {
      this.unbindOutsideClickListener();
      if (this.blockScroll) {
        DomHandler.removeClass(document.body, "p-overflow-hidden");
      }
    },
    onKeydown(event) {
      if (event.code === "Escape") {
        this.hide();
      }
    },
    containerRef(el) {
      this.container = el;
    },
    maskRef(el) {
      this.mask = el;
    },
    contentRef(el) {
      this.content = el;
    },
    headerContainerRef(el) {
      this.headerContainer = el;
    },
    closeButtonRef(el) {
      this.closeButton = el;
    },
    getPositionClass() {
      const positions = ["left", "right", "top", "bottom"];
      const pos = positions.find((item) => item === this.position);
      return pos ? `p-sidebar-${pos}` : "";
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.isOutsideClicked(event)) {
            this.hide();
          }
        };
        document.addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return this.container && !this.container.contains(event.target);
    }
  },
  computed: {
    containerClass() {
      return [
        "p-sidebar p-component",
        {
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
          "p-sidebar-full": this.fullScreen
        }
      ];
    },
    fullScreen() {
      return this.position === "full";
    },
    closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    },
    maskClass() {
      return [
        "p-sidebar-mask",
        this.getPositionClass(),
        {
          "p-component-overlay p-component-overlay-enter": this.modal,
          "p-sidebar-mask-scrollblocker": this.blockScroll,
          "p-sidebar-visible": this.containerVisible,
          "p-sidebar-full": this.fullScreen
        }
      ];
    }
  },
  directives: {
    focustrap: FocusTrap,
    ripple: Ripple
  },
  components: {
    Portal: script
  }
};
var _hoisted_1 = ["aria-modal"];
var _hoisted_2 = {
  key: 0,
  class: "p-sidebar-header-content"
};
var _hoisted_3 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");
  const _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, null, {
    default: withCtx(() => [
      $data.containerVisible ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref: $options.maskRef,
        class: normalizeClass($options.maskClass),
        onMousedown: _cache[2] || (_cache[2] = (...args) => $options.onMaskClick && $options.onMaskClick(...args))
      }, [
        createVNode(Transition, {
          name: "p-sidebar",
          onEnter: $options.onEnter,
          onAfterEnter: $options.onAfterEnter,
          onBeforeLeave: $options.onBeforeLeave,
          onLeave: $options.onLeave,
          onAfterLeave: $options.onAfterLeave,
          appear: ""
        }, {
          default: withCtx(() => [
            $props.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref: $options.containerRef,
              class: $options.containerClass,
              role: "complementary",
              "aria-modal": $props.modal,
              onKeydown: _cache[1] || (_cache[1] = (...args) => $options.onKeydown && $options.onKeydown(...args))
            }, _ctx.$attrs), [
              createBaseVNode("div", {
                ref: $options.headerContainerRef,
                class: "p-sidebar-header"
              }, [
                _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
                  renderSlot(_ctx.$slots, "header")
                ])) : createCommentVNode("", true),
                $props.showCloseIcon ? withDirectives((openBlock(), createElementBlock("button", {
                  key: 1,
                  ref: $options.closeButtonRef,
                  autofocus: "",
                  type: "button",
                  class: "p-sidebar-close p-sidebar-icon p-link",
                  "aria-label": $options.closeAriaLabel,
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.hide && $options.hide(...args))
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass(["p-sidebar-close-icon", $props.closeIcon])
                  }, null, 2)
                ], 8, _hoisted_3)), [
                  [_directive_ripple]
                ]) : createCommentVNode("", true)
              ], 512),
              createBaseVNode("div", {
                ref: $options.contentRef,
                class: "p-sidebar-content"
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 512)
            ], 16, _hoisted_1)), [
              [_directive_focustrap]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
      ], 34)) : createCommentVNode("", true)
    ]),
    _: 3
  });
}
function styleInject(css, ref) {
  if (ref === void 0)
    ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = "\n.p-sidebar-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: none;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n    background-color: transparent;\n    transition-property: background-color;\n}\n.p-sidebar-mask.p-component-overlay {\n    pointer-events: auto;\n}\n.p-sidebar-visible {\n    display: flex;\n}\n.p-sidebar {\n    display: flex;\n    flex-direction: column;\n    pointer-events: auto;\n    transform: translate3d(0px, 0px, 0px);\n    position: relative;\n    transition: transform 0.3s;\n}\n.p-sidebar-content {\n    overflow-y: auto;\n    flex-grow: 1;\n}\n.p-sidebar-header {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    flex-shrink: 0;\n}\n.p-sidebar-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n.p-sidebar-full .p-sidebar {\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    max-height: 100%;\n    top: 0px !important;\n    left: 0px !important;\n}\n\n/* Animation */\n/* Center */\n.p-sidebar-left .p-sidebar-enter-from,\n.p-sidebar-left .p-sidebar-leave-to {\n    transform: translateX(-100%);\n}\n.p-sidebar-right .p-sidebar-enter-from,\n.p-sidebar-right .p-sidebar-leave-to {\n    transform: translateX(100%);\n}\n.p-sidebar-top .p-sidebar-enter-from,\n.p-sidebar-top .p-sidebar-leave-to {\n    transform: translateY(-100%);\n}\n.p-sidebar-bottom .p-sidebar-enter-from,\n.p-sidebar-bottom .p-sidebar-leave-to {\n    transform: translateY(100%);\n}\n.p-sidebar-full .p-sidebar-enter-from,\n.p-sidebar-full .p-sidebar-leave-to {\n    opacity: 0;\n}\n.p-sidebar-full .p-sidebar-enter-active,\n.p-sidebar-full .p-sidebar-leave-active {\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n/* Position */\n.p-sidebar-left {\n    justify-content: flex-start;\n}\n.p-sidebar-right {\n    justify-content: flex-end;\n}\n.p-sidebar-top {\n    align-items: flex-start;\n}\n.p-sidebar-bottom {\n    align-items: flex-end;\n}\n\n/* Size */\n.p-sidebar-left .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-right .p-sidebar {\n    width: 20rem;\n    height: 100%;\n}\n.p-sidebar-top .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n.p-sidebar-bottom .p-sidebar {\n    height: 10rem;\n    width: 100%;\n}\n.p-sidebar-left .p-sidebar-sm,\n.p-sidebar-right .p-sidebar-sm {\n    width: 20rem;\n}\n.p-sidebar-left .p-sidebar-md,\n.p-sidebar-right .p-sidebar-md {\n    width: 40rem;\n}\n.p-sidebar-left .p-sidebar-lg,\n.p-sidebar-right .p-sidebar-lg {\n    width: 60rem;\n}\n.p-sidebar-top .p-sidebar-sm,\n.p-sidebar-bottom .p-sidebar-sm {\n    height: 10rem;\n}\n.p-sidebar-top .p-sidebar-md,\n.p-sidebar-bottom .p-sidebar-md {\n    height: 20rem;\n}\n.p-sidebar-top .p-sidebar-lg,\n.p-sidebar-bottom .p-sidebar-lg {\n    height: 30rem;\n}\n.p-sidebar-left .p-sidebar-content,\n.p-sidebar-right .p-sidebar-content,\n.p-sidebar-top .p-sidebar-content,\n.p-sidebar-bottom .p-sidebar-content {\n    width: 100%;\n    height: 100%;\n}\n@media screen and (max-width: 64em) {\n.p-sidebar-left .p-sidebar-lg,\n    .p-sidebar-left .p-sidebar-md,\n    .p-sidebar-right .p-sidebar-lg,\n    .p-sidebar-right .p-sidebar-md {\n        width: 20rem;\n}\n}\n";
styleInject(css_248z);
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_sidebar.js.map

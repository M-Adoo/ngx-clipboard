import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from 'ngx-window-token/index';
var ClipboardService = (function () {
    /**
     * @param {?} document
     * @param {?} window
     */
    function ClipboardService(document, window) {
        this.document = document;
        this.window = window;
    }
    Object.defineProperty(ClipboardService.prototype, "isSupported", {
        /**
         * @return {?}
         */
        get: function () {
            return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} element
     * @return {?}
     */
    ClipboardService.prototype.isTargetValid = function (element) {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                // tslint:disable-next-line:max-line-length
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    };
    /**
     * copyFromInputElement
     * @param {?} targetElm
     * @param {?} renderer
     * @return {?}
     */
    ClipboardService.prototype.copyFromInputElement = function (targetElm, renderer) {
        try {
            this.selectTarget(targetElm, renderer);
            var /** @type {?} */ re = this.copyText();
            this.clearSelection(targetElm, this.window);
            return re;
        }
        catch (error) {
            return false;
        }
    };
    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     * @param {?} content
     * @param {?} renderer
     * @return {?}
     */
    ClipboardService.prototype.copyFromContent = function (content, renderer) {
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            this.document.body.appendChild(this.tempTextArea);
        }
        this.tempTextArea.value = content;
        return this.copyFromInputElement(this.tempTextArea, renderer);
    };
    /**
     * @return {?}
     */
    ClipboardService.prototype.destroy = function () {
        if (this.tempTextArea) {
            this.document.body.removeChild(this.tempTextArea);
            this.tempTextArea = undefined;
        }
    };
    /**
     * @param {?} inputElement
     * @param {?} renderer
     * @return {?}
     */
    ClipboardService.prototype.selectTarget = function (inputElement, renderer) {
        renderer.invokeElementMethod(inputElement, 'select');
        renderer.invokeElementMethod(inputElement, 'setSelectionRange', [0, inputElement.value.length]);
        return inputElement.value.length;
    };
    /**
     * @return {?}
     */
    ClipboardService.prototype.copyText = function () {
        return this.document.execCommand('copy');
    };
    /**
     * @param {?} inputElement
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.clearSelection = function (inputElement, window) {
        // tslint:disable-next-line:no-unused-expression
        inputElement && inputElement.blur();
        window.getSelection().removeAllRanges();
    };
    /**
     * @param {?} doc
     * @param {?} window
     * @return {?}
     */
    ClipboardService.prototype.createTempTextArea = function (doc, window) {
        var /** @type {?} */ isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        var /** @type {?} */ ta;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        var /** @type {?} */ yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    };
    return ClipboardService;
}());
export { ClipboardService };
ClipboardService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ClipboardService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [WINDOW,] },] },
]; };
function ClipboardService_tsickle_Closure_declarations() {
    /** @type {?} */
    ClipboardService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ClipboardService.ctorParameters;
    /** @type {?} */
    ClipboardService.prototype.tempTextArea;
    /** @type {?} */
    ClipboardService.prototype.document;
    /** @type {?} */
    ClipboardService.prototype.window;
}
/**
 * @param {?} doc
 * @param {?} win
 * @param {?} parentDispatcher
 * @return {?}
 */
export function CLIPBOARD_SERVICE_PROVIDER_FACTORY(doc, win, parentDispatcher) {
    return parentDispatcher || new ClipboardService(doc, win);
}
;
export var /** @type {?} */ CLIPBOARD_SERVICE_PROVIDER = {
    provide: ClipboardService,
    deps: [DOCUMENT, WINDOW, [new Optional(), new SkipSelf(), ClipboardService]],
    useFactory: CLIPBOARD_SERVICE_PROVIDER_FACTORY
};
//# sourceMappingURL=clipboard.service.js.map
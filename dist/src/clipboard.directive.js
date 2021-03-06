import { Directive, EventEmitter, HostListener, Input, Output, Renderer } from '@angular/core';
import { ClipboardService } from './clipboard.service';
var ClipboardDirective = (function () {
    /**
     * @param {?} clipboardSrv
     * @param {?} renderer
     */
    function ClipboardDirective(clipboardSrv, renderer) {
        this.clipboardSrv = clipboardSrv;
        this.renderer = renderer;
        this.cbOnSuccess = new EventEmitter();
        this.cbOnError = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnInit = function () { };
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.ngOnDestroy = function () {
        this.clipboardSrv.destroy();
    };
    /**
     * @return {?}
     */
    ClipboardDirective.prototype.onClick = function () {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined);
        }
        else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm, this.renderer), this.targetElm.value);
        }
        else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.renderer), this.cbContent);
        }
    };
    /**
     * Fires an event based on the copy operation result.
     * @param {?} succeeded
     * @param {?} copiedContent
     * @return {?}
     */
    ClipboardDirective.prototype.handleResult = function (succeeded, copiedContent) {
        if (succeeded) {
            this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent });
        }
        else {
            this.cbOnError.emit({ isSuccess: false });
        }
    };
    return ClipboardDirective;
}());
export { ClipboardDirective };
ClipboardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxClipboard]'
            },] },
];
/**
 * @nocollapse
 */
ClipboardDirective.ctorParameters = function () { return [
    { type: ClipboardService, },
    { type: Renderer, },
]; };
ClipboardDirective.propDecorators = {
    'targetElm': [{ type: Input, args: ['ngxClipboard',] },],
    'cbContent': [{ type: Input },],
    'cbOnSuccess': [{ type: Output },],
    'cbOnError': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['click', ['$event.target'],] },],
};
function ClipboardDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    ClipboardDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ClipboardDirective.ctorParameters;
    /** @type {?} */
    ClipboardDirective.propDecorators;
    /** @type {?} */
    ClipboardDirective.prototype.targetElm;
    /** @type {?} */
    ClipboardDirective.prototype.cbContent;
    /** @type {?} */
    ClipboardDirective.prototype.cbOnSuccess;
    /** @type {?} */
    ClipboardDirective.prototype.cbOnError;
    /** @type {?} */
    ClipboardDirective.prototype.clipboardSrv;
    /** @type {?} */
    ClipboardDirective.prototype.renderer;
}
//# sourceMappingURL=clipboard.directive.js.map
import { ClipboardDirective } from './clipboard.directive';
import { CLIPBOARD_SERVICE_PROVIDER } from './clipboard.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WindowTokenModule } from 'ngx-window-token/index';
export { ClipboardDirective } from './clipboard.directive';
export { ClipboardService, CLIPBOARD_SERVICE_PROVIDER_FACTORY, CLIPBOARD_SERVICE_PROVIDER } from './clipboard.service';
var ClipboardModule = (function () {
    function ClipboardModule() {
    }
    return ClipboardModule;
}());
export { ClipboardModule };
ClipboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, WindowTokenModule],
                // tslint:disable-next-line:object-literal-sort-keys
                declarations: [ClipboardDirective],
                exports: [ClipboardDirective],
                providers: [CLIPBOARD_SERVICE_PROVIDER]
            },] },
];
/**
 * @nocollapse
 */
ClipboardModule.ctorParameters = function () { return []; };
function ClipboardModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ClipboardModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ClipboardModule.ctorParameters;
}
//# sourceMappingURL=index.js.map
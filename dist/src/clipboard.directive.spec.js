import { ClipboardService } from './clipboard.service';
import { ClipboardModule } from './index';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
/**
 * Helper function to easily build a component Fixture using the specified template
 * From: https://blog.thoughtram.io/angular/2016/12/27/angular-2-advance-testing-with-custom-matchers.html
 * @param {?} template
 * @return {?}
 */
function createTestComponent(template) {
    return TestBed
        .overrideComponent(TestClipboardComponent, { set: { template: template } })
        .createComponent(TestClipboardComponent);
}
var TestClipboardComponent = (function () {
    function TestClipboardComponent() {
        this.text = 'test';
    }
    return TestClipboardComponent;
}());
export { TestClipboardComponent };
TestClipboardComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'test-clipboard',
                template: "<span>PlaceHolder HTML to be Replaced</span>"
            },] },
];
/**
 * @nocollapse
 */
TestClipboardComponent.ctorParameters = function () { return []; };
function TestClipboardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TestClipboardComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TestClipboardComponent.ctorParameters;
    /** @type {?} */
    TestClipboardComponent.prototype.text;
    /** @type {?} */
    TestClipboardComponent.prototype.isCopied;
}
describe('Directive: clipboard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [TestClipboardComponent],
            imports: [
                BrowserModule,
                ClipboardModule,
                FormsModule
            ]
        });
    });
    describe('copy when cbContent is set', function () {
        var /** @type {?} */ template;
        var /** @type {?} */ fixture;
        var /** @type {?} */ clipboardService;
        var /** @type {?} */ spy;
        var /** @type {?} */ button;
        beforeEach(function () {
            template = "<button ngxClipboard [cbContent]=\"'text'\" (cbOnSuccess)=\"isCopied = true\">copy</button>";
            fixture = createTestComponent(template);
            clipboardService = fixture.debugElement.injector.get(ClipboardService);
            // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
            spy = spyOn(clipboardService, 'copyText');
            fixture.detectChanges();
            button = fixture.debugElement.nativeElement.querySelector('button');
        });
        it('should fire cbOnError if environment does not support copy', async(function () {
            spy = spyOn(clipboardService, 'isSupported');
            spy.and.returnValue(false);
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeFalsy();
            });
        }));
        it('should fire cbOnSuccess after copy successfully', async(function () {
            spy.and.returnValue(true);
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeTruthy();
            });
        }));
        it('should fire cbOnError after copy fail', async(function () {
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeFalsy();
            });
        }));
        it('should create a textarea in dom, and remove it after calling destroy', async(function () {
            var /** @type {?} */ doc = fixture.debugElement.injector.get(DOCUMENT);
            expect(doc.querySelector('textarea')).toBeFalsy();
            button.click();
            fixture.whenStable().then(function () {
                expect(doc.querySelector('textarea')).toBeTruthy();
                clipboardService.destroy();
                expect(doc.querySelector('textarea')).toBeFalsy();
            });
        }));
    });
    describe('copy when target is set', function () {
        var /** @type {?} */ template;
        var /** @type {?} */ fixture;
        var /** @type {?} */ clipboardService;
        var /** @type {?} */ spy;
        var /** @type {?} */ button;
        var /** @type {?} */ input;
        beforeEach(function () {
            template = "<input type=\"text\" [(ngModel)]=\"text\"  #inputTarget>\n      <button type=\"button\" [ngxClipboard]=\"inputTarget\" (cbOnSuccess)=\"isCopied = true\">copy</button>";
            fixture = createTestComponent(template);
            clipboardService = fixture.debugElement.injector.get(ClipboardService);
            // Setup spy on the `copyText` method, somehow document.execCommand('copy') doesn't work in Karma
            spy = spyOn(clipboardService, 'copyText');
            fixture.detectChanges();
            button = fixture.debugElement.nativeElement.querySelector('button');
            input = fixture.debugElement.nativeElement.querySelector('input');
            // input 'new test'
            input.value = 'new test';
            input.dispatchEvent(new Event('input'));
        });
        it('should fire cbOnSuccess after copy successfully', async(function () {
            spy.and.returnValue(true);
            fixture.detectChanges();
            // button click to trigger copy
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeTruthy();
            });
        }));
        it('should fire cbOnError if environment does not support copy', async(function () {
            spy = spyOn(clipboardService, 'isSupported');
            spy.and.returnValue(false);
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeFalsy();
            });
        }));
        it('should fire cbOnError after copy fail', async(function () {
            spy.and.returnValue(false);
            fixture.detectChanges();
            // button click to trigger copy
            button.click();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.isCopied).toBeFalsy();
            });
        }));
    });
});
//# sourceMappingURL=clipboard.directive.spec.js.map
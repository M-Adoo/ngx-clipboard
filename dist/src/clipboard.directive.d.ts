import { ClipboardService } from './clipboard.service';
import { EventEmitter, OnDestroy, OnInit, Renderer } from '@angular/core';
export declare class ClipboardDirective implements OnInit, OnDestroy {
    private clipboardSrv;
    private renderer;
    targetElm: HTMLInputElement;
    cbContent: string;
    cbOnSuccess: EventEmitter<any>;
    cbOnError: EventEmitter<any>;
    constructor(clipboardSrv: ClipboardService, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private onClick(button);
    /**
     * Fires an event based on the copy operation result.
     * @param {Boolean} succeeded
     */
    private handleResult(succeeded, copiedContent);
}

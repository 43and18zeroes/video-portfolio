import { Injectable, signal } from '@angular/core';

export type LegalViewType = 'imprint' | 'privacy-policy';

@Injectable({ providedIn: 'root' })
export class LegalDrawerService {
    readonly activeView = signal<LegalViewType | null>(null);
    readonly scrollTarget = signal<string | null>(null);

    open(type: LegalViewType, scrollTargetId?: string): void {
        this.activeView.set(type);
        this.scrollTarget.set(scrollTargetId ?? null);
    }

    close(): void {
        this.activeView.set(null);
        this.scrollTarget.set(null);
    }
}
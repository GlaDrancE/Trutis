import { EventData, Page } from '@nativescript/core';
import { ClientPortalModel } from './main-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new ClientPortalModel();
}
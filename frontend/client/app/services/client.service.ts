import { Observable } from '@nativescript/core';
import { ClientInfo } from '../models/client.model';

export class ClientService extends Observable {
    async submitClientInfo(clientInfo: ClientInfo): Promise<any> {
        try {
            // TODO: Replace with your actual API endpoint
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientInfo)
            });
            return await response.json();
        } catch (error) {
            console.error('Error submitting client info:', error);
            throw error;
        }
    }
}
import { Observable } from '@nativescript/core';
import { ClientService } from './services/client.service';
import { ClientInfo } from './models/client.model';

export class ClientPortalModel extends Observable {
    private clientService: ClientService;
    
    private _shopName: string = '';
    private _ownerName: string = '';
    private _address: string = '';
    private _phone: string = '';
    private _email: string = '';
    private _logo: string = '';
    private _googleAPI: string = '';
    private _password: string = '';
    private _responseMessage: string = '';
    private _isResponseVisible: boolean = false;

    constructor() {
        super();
        this.clientService = new ClientService();
    }

    // Getters and setters for all fields
    get shopName(): string { return this._shopName; }
    set shopName(value: string) {
        if (this._shopName !== value) {
            this._shopName = value;
            this.notifyPropertyChange('shopName', value);
        }
    }

    get ownerName(): string { return this._ownerName; }
    set ownerName(value: string) {
        if (this._ownerName !== value) {
            this._ownerName = value;
            this.notifyPropertyChange('ownerName', value);
        }
    }

    get address(): string { return this._address; }
    set address(value: string) {
        if (this._address !== value) {
            this._address = value;
            this.notifyPropertyChange('address', value);
        }
    }

    get phone(): string { return this._phone; }
    set phone(value: string) {
        if (this._phone !== value) {
            this._phone = value;
            this.notifyPropertyChange('phone', value);
        }
    }

    get email(): string { return this._email; }
    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get logo(): string { return this._logo; }
    set logo(value: string) {
        if (this._logo !== value) {
            this._logo = value;
            this.notifyPropertyChange('logo', value);
        }
    }

    get googleAPI(): string { return this._googleAPI; }
    set googleAPI(value: string) {
        if (this._googleAPI !== value) {
            this._googleAPI = value;
            this.notifyPropertyChange('googleAPI', value);
        }
    }

    get password(): string { return this._password; }
    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get responseMessage(): string { return this._responseMessage; }
    set responseMessage(value: string) {
        if (this._responseMessage !== value) {
            this._responseMessage = value;
            this.notifyPropertyChange('responseMessage', value);
        }
    }

    get isResponseVisible(): boolean { return this._isResponseVisible; }
    set isResponseVisible(value: boolean) {
        if (this._isResponseVisible !== value) {
            this._isResponseVisible = value;
            this.notifyPropertyChange('isResponseVisible', value);
        }
    }

    async onSubmit() {
        try {
            const clientInfo: ClientInfo = {
                shop_name: this.shopName,
                owner_name: this.ownerName,
                address: this.address,
                phone: this.phone,
                email: this.email,
                logo: this.logo,
                googleAPI: this.googleAPI,
                password: this.password
            };

            const response = await this.clientService.submitClientInfo(clientInfo);
            this.responseMessage = JSON.stringify(response, null, 2);
            this.isResponseVisible = true;
        } catch (error) {
            this.responseMessage = 'Error submitting form: ' + error.message;
            this.isResponseVisible = true;
        }
    }
}
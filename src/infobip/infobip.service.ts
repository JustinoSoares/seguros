import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfobipService {
    constructor(
        private readonly configService: ConfigService,
    ) {}

    private apiUrl = this.configService.get<string>('apiUrlInfobip');
    private apiKey = this.configService.get<string>('apiKeyInfobip');

    async sendSms(phoneNumber: string, message: string): Promise<any> {
        const headers = {
            'Authorization': `App ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        const data = {
            messages: [
                {
                    from: this.configService.get<string>('NOME_DA_SEGURADORA'), // Nome ou número da seguradora
                    to: '+244927672567',
                    text: message,
                },
            ],
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Erro ao enviar SMS: ${response.status} - ${errorDetails}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            throw error;
        }
    }
}

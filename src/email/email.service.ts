import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Mailjet = require('node-mailjet');

@Injectable()
export class EmailService {
  private mailjet;

  constructor(private readonly configService: ConfigService) { }

  async sendVerificationEmail(toEmail: string, verificationLink: string): Promise<void> {
    this.mailjet = new Mailjet({
      apiKey: this.configService.get<string>('MAILJET_API_KEY'), // Chave de API configurada no Mailjet
      apiSecret: this.configService.get<string>('MAILJET_API_SECRET'), // Segredo de API configurado no
    });
    try {
      const response = await this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: this.configService.get<string>('EMAIL_USER'), // Email configurado no Mailjet
              Name: this.configService.get<string>('EMAIL_NAME'), // Nome configurado no Mailjet
            },
            To: [
              {
                Email: toEmail,
                Name: 'Usuário',
              },
            ],
            Subject: 'Confirme sua conta',
            TextPart: 'Por favor, confirme sua conta.',
            HTMLPart: `
              <h3>Bem-vindo!</h3>
              <p>Obrigado por se cadastrar na Yame. Clique no link abaixo para verificar sua conta:</p>
              <a href="${verificationLink}">Verificar Conta</a>
            `,
          },
        ],
      });
      console.log('E-mail enviado com sucesso:', response.body);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error('Falha ao enviar e-mail de verificação.');
    }
  }

  async sendEmail(toEmail: string, message: string): Promise<void> {
    this.mailjet = new Mailjet({
      apiKey: this.configService.get<string>('MAILJET_API_KEY'), // Chave de API configurada no Mailjet
      apiSecret: this.configService.get<string>('MAILJET_API_SECRET'), // Segredo de API configurado no
    });
    try {
      const response = await this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: this.configService.get<string>('EMAIL_USER'), // Email configurado no Mailjet
              Name: this.configService.get<string>('EMAIL_NAME'), // Nome configurado no Mailjet
            },
            To: [
              {
                Email: toEmail,
                Name: 'Usuário',
              },
            ],
            Subject: 'Alerta!!',
            HTMLPart: message,
          },
        ],
      });
      console.log('E-mail enviado com sucesso:', response.body);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error('Falha ao enviar e-mail de verificação.');
    }
  }


}

import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InfobipService } from 'src/infobip/infobip.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Controller('alert')
export class AlertController {
    private readonly EARTH_RADIUS = 6371;
    constructor(
        private readonly infobipService: InfobipService,
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly email : EmailService,
    ) { }

    @Post('send')
    async sendAlert(@Body() body: { lat: number; lon: number }): Promise<string> {
        const { lat, lon } = body;
        if (!lat || !lon) {
            throw new Error('Latitude e longitude são obrigatórias');
        }
        // 1. Encontre o parceiro mais próximo com base nas coordenadas (exemplo simplificado)
        const partnerEmail = await this.findClosestPartner(lat, lon);
        if (!partnerEmail) {
            throw new Error('Nenhum parceiro encontrado');
        }
        // 2. Enviar SMS para o parceiro
        const messageToPartner = `Alerta de emergência! Localização: <a href="https://www.google.com/maps/place/${lat},${lon}">Link Para o Google</a>`;
        await this.email.sendEmail(partnerEmail, messageToPartner);
        // 3. Enviar SMS para a seguradora
        const messageToSeguradora = `Alerta de emergência! Localização do cliente: <a href="https://www.google.com/maps/place/${lat},${lon}">Link Para o Google</a>`;
        const seguradoraEmail = this.configService.get<string>('EMAIL_USER');  // Insira o número da seguradora
        await this.email.sendEmail(seguradoraEmail, messageToSeguradora);
    
        return 'Mensagem enviada'
    }


    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const lat1Rad = this.toRadians(lat1);
        const lon1Rad = this.toRadians(lon1);
        const lat2Rad = this.toRadians(lat2);
        const lon2Rad = this.toRadians(lon2);

        const deltaLat = lat2Rad - lat1Rad;
        const deltaLon = lon2Rad - lon1Rad;

        const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return this.EARTH_RADIUS * c; // Retorna a distância em km
    }

    async findClosestPartner(userLat: number, userLon: number) {
        const partners = await this.prisma.parceiro.findMany();  // Busca todos os parceiros no banco de dados
        let closestPartner = null;
        let minDistance = Infinity;

        partners.forEach(partner => {
            const distance = this.haversineDistance(userLat, userLon, partner.latitude, partner.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                closestPartner = partner;
            }
        });
        return closestPartner.email;
    }
}

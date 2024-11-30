import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeocodingService } from 'src/geocoding/geocoding.service';
import { v4 as uuid } from 'uuid';
import { CreateParceiroDto } from './create_parceiro.dto';

@Controller('parceiro')
export class ParceiroController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly geocodingService: GeocodingService,
    ) {}

    @Post('create')
    async create(@Body() parceiroDTO: CreateParceiroDto): Promise<any> {
        const { nome, email, telefone, tipoServico, address } = parceiroDTO;
        // Verifica se o parceiro já existe
        const findParceiro = await this.prisma.parceiro.findFirst({
            where: {
                OR: [
                    { email },
                    { telefone },
                ],
            },
        });

        if (findParceiro) {
            return {
                status: false,
                msg: 'Parceiro already exists',
                statusCode: 400,
            };
        }
        try {
           const { lat, lon } = await this.geocodingService.getCoordinatesFromAddress(
            address,
        );

        if (!lat || !lon) {
            return {
                status: false,
                msg: 'Invalid address provided',
                statusCode: 400,
            };
        }
        const parceiro = await this.prisma.parceiro.create({
            data: {
                id: uuid(),
                nome,
                email,
                telefone,
                tipoServico, // Enum já validado
                address,
                latitude: lat,
                longitude: lon,
            },
        });

        return {
            status: true,
            msg: 'Parceiro created successfully',
            data: parceiro,
            statusCode: 201,
        };  
        } catch (error) {
            console.error(error);
        }
        // Obtém as coordenadas a partir do endereço
       
    }
}

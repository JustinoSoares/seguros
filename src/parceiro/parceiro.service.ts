import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ParceiroService {

    private readonly baseUrl = 'https://nominatim.openstreetmap.org';

    constructor(
        private httpService: HttpService,

    ) { }

    // Método para buscar coordenadas a partir de um endereço
    async getCoordinatesFromAddress(address: string): Promise<{ lat: number; lon: number }> {
        const response$ = this.httpService.get(`${this.baseUrl}/search`, {
            params: {
                q: address,
                format: 'json',
            },
        });

        const response = await lastValueFrom(response$);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
        }
        throw new Error('Endereço não encontrado');
    }

    // Método para buscar endereço a partir de coordenadas
    async getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
        const response$ = this.httpService.get(`${this.baseUrl}/reverse`, {
            params: {
                lat,
                lon,
                format: 'json',
            },
        });

        const response = await lastValueFrom(response$);
        if (response.data && response.data.display_name) {
            return response.data.display_name;
        }
        throw new Error('Coordenadas não encontradas');
    }
}

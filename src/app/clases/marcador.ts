export class Marcador{
    public lat: number;
    public lng: number;
    public title: string = 'Sin titulo';
    public desc: string = 'Sin descripcion';

    constructor( lat: number, lng: number ){
        this.lat = lat;
        this.lng = lng;
    }
}
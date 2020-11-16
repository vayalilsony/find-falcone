import { environment } from '../../../environments/environment';
export class UrlConstants {
    public static readonly baseUrl = environment.baseURL;
    public static readonly urls = {
       /* URL for fetching the planets data */
       planetUrl: `${UrlConstants.baseUrl}planets`,

       // /* URL for fetching the vehicles data */
        vehicleUrl: `${UrlConstants.baseUrl}vehicles`,

       // /* URL for fetching the token */
        tokenUrl: `${UrlConstants.baseUrl}token`,

       // /* URL for finding falcone */
        falconeUrl: `${UrlConstants.baseUrl}find`
    };
}
// imagePath : "../../../../assets/images/";

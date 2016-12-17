/**
 * Created by mart on 17.12.16.
 */
export class AmazonRequest {
  constructor(
    public minPrice: number,
    public maxPrice: number,
    public intent: string,
    public product: string,
    public agenda: string,
    public localSearchQuery: string
  ) {}
}

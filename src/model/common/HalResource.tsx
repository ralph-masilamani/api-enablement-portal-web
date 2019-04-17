
//const emptyResource: HalResource = new HalResource()

export class HalResource {

    constructor(
      public resource?: any,
      public identity?: string,
      public properties: Map<string, any> = new Map(),
      public embedded: Map<string, Array<HalResource>> = new Map(),
      public links?: Map<string, any>,
    ) {}
  
    getFirstEmbeddedResourceByName(embeddedResource: string) :any {
      if (this.embedded && this.embedded[embeddedResource]) {
        return this.embedded[embeddedResource][0];
      }
      return undefined;
    }
  
    getAllEmbeddedResourceByName(embeddedResource: string) :HalResource[] {
      if (this.embedded && this.embedded[embeddedResource]) {
        return this.embedded[embeddedResource];
      } 
      return [];
    }
  
    resolvePropertyOnResource(embeddedResource: string, propName: string): string {
      let external = this.getFirstEmbeddedResourceByName(embeddedResource);
      if (external) {
        return external.properties[propName];
      }
      return '';
    }
}

export class HalLink {
    constructor(
        public name: string,
        public href: string,
    ) {}
}

export class ErrorResource {

  constructor(
    public response?: any,
    public status?: number,
    public message?: string
  ) {}
}
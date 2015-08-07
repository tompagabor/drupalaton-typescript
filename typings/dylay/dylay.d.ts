interface DyLay {
    ( opts? : any,
      $element? : any
    ): JQuery;

    position(): void;
    filter(settings:any): void;
    sort(by?:string, any?:string): void;
}

interface JQuery {
    dylay: DyLay;
}
interface DyLaySettings {
    opts? : any;
    $element? : any;
}

interface DyLayStatic {
    position(): void;
    filter(settings:any): void;
    sort(by?:string, any?:string): void;

    settings: DyLaySettings;
}

interface DyLay {
    (settings: DyLaySettings): JQuery;
}

interface JQuery {
    dylay: DyLay;
}
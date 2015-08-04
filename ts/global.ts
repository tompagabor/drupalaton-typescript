///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/dylay/dylay.d.ts' />


module Drupal8filter {
    export class Filter {
        $elements:any;

        constructor(elements: any) {
            $elements: elements;
            this.initFilter('.view-frontpage');
        }


        public initFilter(elements: any): void {
            // init
            $(elements).dylay({
                // selector to define elements
                selector: '.views-row'
            });

        }
    }
}

var greeter = new Drupal8filter.Filter(".view-frontpage");


$(document).ready(function () {
    $(".views-row")[0].innerHTML = 'egy';
});

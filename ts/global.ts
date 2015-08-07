///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/dylay/dylay.d.ts' />

module Drupal8filter {
    export class Filter {
        // The elements wrapper, what we want to filter.
        $elements:any;
        // The dyLay Library.
        $dylay:any;
        // Count the avaiable filter options.
        availableCounts:number[] = [];

        constructor(elements:string, nodeSelector:string) {
            this.$elements = jQuery(elements);
            this.availableCounts.push(0);
            this.countWordsInTitle();
            this.createFilterList();
            this.initFilter(nodeSelector);
        }

        /*
         Start the filter code.
         */
        private initFilter(nodeSelector: string):void {

            // Init DyLay library.
            this.$dylay = this.$elements.dylay({
                // selector to define elements
                selector: nodeSelector
            });

            // Init controls.
            this.$elements.find('#filters a').on('click', (event) => {
                event.preventDefault();
                this.$elements.dylay('filter', jQuery(event.currentTarget).data('filter'));
            })
        }

        /*
         Create a list of filter options.
         */
        private createFilterList():void {
            var filterButtons:any;

            // The wrapper element.
            filterButtons = jQuery('<div id="filters"></div>');

            this.availableCounts.forEach(function (entry) {
                // The links.
                // Show all item, if entry is 0.
                if (entry == 0) {
                    filterButtons.append(jQuery('<a/>').data('filter', '*').text('all'));
                } else {
                    filterButtons.append(jQuery('<a/>').data('filter', '.count-' + entry).text(entry + 'word(s)'));
                }
            });

            // Prepend all to the $elements.
            this.$elements.prepend(filterButtons);
        }

        /*
         Count words in title, and save the result.
         */
        private countWordsInTitle():void {
            var wordsLength:number;
            var _me = this;

            this.$elements.find('.views-row').each(function () {
                // Calculate all items length and add class based on length.
                wordsLength = jQuery(this).find('.field-node--title').text().split(' ').length;
                jQuery(this).addClass('count-' + wordsLength);

                // Save the result if not exist.
                if (_me.availableCounts.indexOf(wordsLength) == -1) {
                    _me.availableCounts.push(wordsLength);
                }
            });
        }
    }
}

// Start our app.
var myfilter = new Drupal8filter.Filter(".view-frontpage", ".views-row");

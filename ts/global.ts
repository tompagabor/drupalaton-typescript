///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/dylay/dylay.d.ts' />

module Drupal8filter {
    export class Filter {
        $elements:any;
        $dylay:any;
        availableCounts:number[] = [0];

        constructor(elements:any) {
            this.$elements = $(elements);
            this.countWordsInTitle();
            this.createFilterList();
            this.initFilter();
        }

        public initFilter():void {
            var _me = this;

            // Init DyLay library.
            this.$dylay = this.$elements.dylay({
                // selector to define elements
                selector: '.views-row'
            });

            // Init controls.
            this.$elements.find('#filters a').on('click', function (e) {
                e.preventDefault();

                _me.$elements.dylay('filter', $(this).data('filter'));
            })
        }

        /*
         Create a list of filter options.
         */
        private createFilterList():void {
            var filterButtons:any;

            // The wrapper element.
            filterButtons = $('<div id="filters"></div>');

            this.availableCounts.forEach(function (entry) {
                // The links.
                // Show all item, if entry is 0.
                if (entry == 0) {
                    filterButtons.append($('<a/>').data('filter', '*').text('all'));
                } else {
                    filterButtons.append($('<a/>').data('filter', '.count-' + entry).text(entry + 'word(s)'));
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
                wordsLength = $(this).find('.field-node--title').text().split(' ').length;
                $(this).addClass('count-' + wordsLength);

                // Save the result if not exist.
                if (_me.availableCounts.indexOf(wordsLength) == -1) {
                    _me.availableCounts.push(wordsLength);
                }
            });
        }
    }
}


var myfilter = new Drupal8filter.Filter(".view-frontpage");

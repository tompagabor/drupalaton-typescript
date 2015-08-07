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
            this.createSortList();
            this.initSort(nodeSelector);
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

        private initSort(nodeSelector: string): void {
            // Init controls.
            var that = this;
            this.$elements.find('#sorts a').on('click', (event) => {
                event.preventDefault();

                var rowList:Array<any> = [];
                jQuery('div.views-row').each((key, item) => {
                    rowList.push(jQuery(item)[0]);
                });

                rowList = rowList.sort((a: any, b: any) => {
                    if (jQuery(a).find('h2.node__title').text() > jQuery(b).find('h2.node__title').text()) {
                        return 1;
                    }
                    else if (jQuery(a).find('h2.node__title').text() < jQuery(b).find('h2.node__title').text()) {
                        return -1;
                    }
                    return 0;
                });
                if (jQuery(event.currentTarget).data('sort') === 'DESC') {
                    rowList = rowList.reverse();
                }

                var html: String = '';
                jQuery(rowList).each((key: any, value: any) => {
                    html += value.outerHTML;
                });
                that.$elements.find('div.view-content').html(html);
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

        private createSortList():void {
            var sortButtons:any;
            sortButtons = jQuery('<div id="sorts"></div>');

            sortButtons.append(jQuery('<a/>').data('sort', 'ASC').text('Ascending'));
            sortButtons.append(jQuery('<a/>').data('sort', 'DESC').text('Descending'));

            return this.$elements.prepend(sortButtons);
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

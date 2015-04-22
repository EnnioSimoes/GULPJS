jQuery(document).ready(function($) {
    	
        var rowOptions = {
            connectWith:'.layout_builder_row',
            placeholder: 'ui-state-highlight',
            items: 'li:not(.empty-row)',
            receive: function(event, ui) {
                var row = $(ui.item).parent();
                layout.validateReceived(row, ui);
            }
        };

        $('.layout_builder').sortable();
    	$('.layout_builder_row').sortable(rowOptions);

        // insert new row in layout
    	$('.lb_add_new_row').click(function(event) {
    		event.preventDefault();
    		var tpl = 	$('<ul class="sort"><li>List item 1</li><li>List item 2</li><li>List item 3</li><li>List item 4</li><li>List item 5</li></ul>');
			$('.ct').prepend(tpl).sortable("refresh");
			$('.layout_builder_row').sortable({connectWith:'.layout_builder_row', items: 'li:not(.empty-row)'});
    	});

       	var layout = {
       		options: {

       		},

            validateReceived: function (row, ui) {
                if (layout.rowSize(row) == 1) {
                    var empty = $('.layout_builder_row li.empty-row');
                    if (empty.length) {
                        empty.remove();
                    };
                };
                console.log(layout.rowSize(row) );
                if (layout.rowSize(row) > 12) {
                    $(ui.sender).sortable('cancel');
                    alert("Decrease the size of this column or one from the row ");
                };
            },

       		init:function() {
       			// body...
       		},

       		resizeElement: function(element, resizeType) {
       			$(element);
       		},

       		// calculate the size of columns in a specific row
       		rowSize: function(row) {
        		var sum = 0;

        		row.find('li:not(.empty-row)').each(function(index, element) {	
        			sum += parseInt($(this).attr("data-columns"));
        		});

				return sum;
       		},

       		// return the row of 
       		getElementRow: function(ui) {
       			return $(ui.item).parent();
       		},

       		insertRow: function(container, position) {
       			var containter = $(containter);
       			if (position == 'top') {
       				containter.prepend('row');
       			} else {
       				containter.append('row');
       			};
       			containter.sortable('refresh'); 
       		},

       		insertColumn: function(row, size) {
       			if (layout.getRowSize(row) + size > 12) {

       			} else {
	       			$(row).append('row design');
       			};
       		} 

       	};

       	// make rows sortable
    //     $('#layout').sortable({tolerance: 'pointer', handle: "li.move-row"});
        
    //     // make columns sortable
    //     $('.layout-row').sortable({ 
    //     	items:'li.sortable-item',
    //     	scroll: false,
    //     	tolerance:'pointer',
    //     	cursor: 'crosshair',
    //     	delay: 100,
    //     	opacity: 0.85,
    //     	connectWith: '.layout-row', // allow moving columns from one row to another
    //     	placeholder: 'ui-state-highlight',
    //     	receive: function(event, ui) {

				// var item = $(ui.item);
				// var row = item.parent();
				// var item_cols = parseInt(item.attr('data-columns'));

	  	// 		if (layout.getRowSize(row) > 12) {
    //                 alert("Decrease the size of this column or one from the row ");
    //                 $(ui.sender).sortable('cancel');
    // 			};
    //     	}
    //     });

        // increase column size
        $(document).on('click', '.layout_builder_row span.plus', function(event) {
            event.preventDefault();

            var element = $(this).parent();
            var row = element.parent();
            var current_size = parseInt(element.attr("data-columns"));

            if (layout.rowSize(row) < 12) {
                element.css({width :'+=58px'});
                current_size++;
                element.attr("data-columns", current_size);
            } else {
                alert("Limit exceded");
            };

            console.log(layout.rowSize(row));
        });

        // decrease column size
        $(document).on('click', '.layout_builder_row span.minus', function(event) {
            event.preventDefault();
            
            var element = $(this).parent();
            var current_size = parseInt(element.attr("data-columns"));

            if (current_size >= 2) {
                element.css({width :'-=58px'});
                current_size--;
                element.attr("data-columns", current_size);

            } else {
                alert('The minimum value is of column is 1');
            };
        }); 
        // delete column
		$(document).on('click', '.layout_builder_row span.delete', function(event) {
            event.preventDefault();
            $(this).parent().remove();
        });

        // inserting a row on the top
        $('#add-top-row').on('click',  function(event) {
        	event.preventDefault();

        	var rowSource   = $("#dragable-row-tpl").html();
			var template = Handlebars.compile(rowSource);
			var context = {};
			var rowTemplate = $(template(context));
		
			$('.layout_builder').prepend(rowTemplate).sortable("refresh");
        	$('.layout_builder_row').sortable(rowOptions);
        });

        // inserting a row on the bottom
        $('#add-bottom-row').on('click',  function(event) {
            event.preventDefault();

            var rowSource   = $("#dragable-row-tpl").html();
            var template = Handlebars.compile(rowSource);
            var context = {};
            var rowTemplate = $(template(context));
        
            $('.layout_builder').append(rowTemplate).sortable("refresh");
            $('.layout_builder_row').sortable(rowOptions);
        });
    });

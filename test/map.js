casper.test.begin('Testing map manipulation', 19, function suite(test) {
   var url = casper.cli.get('url');
   var username = casper.cli.get('login');
   var password = casper.cli.get('password');
   casper.start(url);

   casper.then(function() {
      test.info('Logging in');
      if(this.exists('form#credentials')) {
         this.fillSelectors('form#credentials', {
            'input[name="username"]': username,
            'input[name="password"]': password
         }, false);
         this.click('button.SubmitBtn[name="Submit1"]');
      }
      this.waitForUrl(url, function(){
	 test.pass('Logged in');
      }, function () {
	 test.fail('Did not log in the backoffice');
      });
   });
  
   casper.then(function() {
      test.info('Testing map section');
      test.assertExists('div.bs-docs-section div.page-header h1#map', "Map items header exists");
      test.assertExists('table#mapItem-table', "Map items table exists");
   });

   casper.then(function() {
      test.info('Testing map items add without inputing coordinates');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('a#addMapItemTriggerModal');
      this.waitUntilVisible('div#addMapItemModal', function() {
	 this.fillSelectors('div#addMapItemModal form', {
	    'div#addMapItemModal form input#newLabel': '000test',
	    'div#addMapItemModal form select#addMapItem-linked-info': '-1',
	 }, false);
	 this.click('button#addMapItemButton');
	 this.wait(4000, function() {
            var newCount = this.evaluate(function() {
               return __utils__.findAll('table#mapItem-table tbody tr').length;
            });
            test.assertEquals(newCount, count + 1, 'One map item has been added');
	    test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(1)', '000test', 'New label is ok');
	    test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(2)', '0', 'New X coordinate is ok');
	    test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(3)', '0', 'New Y coordinate is ok');
	    test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(4)', 'Aucune info liée', 'New linked info is ok');
	 }, function() {
	    test.fail('New map item was not added');
	 });
      }, function() {
	 test.fail('Add map item modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Testing map item delete');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('table#mapItem-table tbody tr:first-child button.mapItemDeleteButton');
      this.waitUntilVisible('div#onDeleteMapItemsAlert', function() {
	 test.pass('Map items delete modal is displayed');
      }, function() {
	 test.fail('Map items delete alert did not show up');
      });
      this.wait(4000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#mapItem-table tbody tr').length;
         });
	 test.assertEquals(newCount, count -1, 'One map item has been removed');
	 test.assertSelectorDoesntHaveText('table#mapItem-table tbody tr:first-child td:nth-of-type(1)', '000test');
      }, function() {
	 test.fail('Map item was not deleted');
      });
   });

   casper.then(function() {
      test.info('Testing map items add with coordinates from click on map');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('a#addMapItemTriggerModal');
      this.waitUntilVisible('div#addMapItemModal', function() {
	 this.wait(500, function() {
            var x = this.getElementBounds('#add-map').left + 1;
            var y = this.getElementBounds('#add-map').top + 1;
            this.mouse.click(x, y);
	    var expectedX = (1000/this.getElementBounds('#add-map').width).toFixed(4);
	    var expectedY = (1000/this.getElementBounds('#add-map').height).toFixed(5);
	    this.wait(500, function() {
	       this.fillSelectors('div#addMapItemModal form', {
	          'div#addMapItemModal form input#newLabel': '000test',
	          'div#addMapItemModal form select#addMapItem-linked-info': '-1',
	       }, false);
	       this.click('button#addMapItemButton');
	       this.wait(4000, function() {
                  var newCount = this.evaluate(function() {
                     return __utils__.findAll('table#mapItem-table tbody tr').length;
                  });
                  test.assertEquals(newCount, count + 1, 'One map item has been added');
	          test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(1)', '000test', 'New label is ok');
	          test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(2)', expectedX, 'New X coordinate is ok');
	          test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(3)', expectedY, 'New Y coordinate is ok');
	          test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(4)', 'Aucune info liée', 'New linked info is ok');
	       }, function() {
	          test.fail('New map item was not added');
	       });
	    });
	 });
      }, function() {
	 test.fail('Add map item modal was not visible');
      });
   });

   casper.then(function() {
      test.info('map item delete');
      var count = this.evaluate(function() {
	 return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('table#mapItem-table tbody tr:first-child button.mapItemDeleteButton');
      this.waitUntilVisible('div#onDeleteMapItemsAlert', function() {
	 test.pass('Map items delete modal is displayed');
      }, function() {
	 test.fail('Map items delete alert did not show up');
      });
      this.wait(4000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#mapItem-table tbody tr').length;
         });
	 test.assertEquals(newCount, count -1, 'One map item has been removed');
	 test.assertSelectorDoesntHaveText('table#mapItem-table tbody tr:first-child td:nth-of-type(1)', '000test');
      }, function() {
	 test.fail('Map item was not deleted');
      });
   });

   //Add with linked info and remove

   casper.run(function() {
      test.done();
   });
});

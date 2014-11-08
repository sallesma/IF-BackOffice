casper.test.begin('Testing map manipulation', 32, function suite(test) {
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
      test.info('Add map items without inputing coordinates');
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
      test.info('Delete map item');
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
      test.info('Add map items with coordinates from click on map');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('a#addMapItemTriggerModal');
      this.waitUntilVisible('div#addMapItemModal', function() {
         this.wait(500, function() {
            var x = this.getElementBounds('#add-map').left + 1;
            var y = this.getElementBounds('#add-map').top + 1;
            this.mouse.click(x, y);
            var expectedX = (100/this.getElementBounds('#add-map').width).toFixed(5);
            var expectedY = (100/this.getElementBounds('#add-map').height).toFixed(6);
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
      test.info('Delete map item');
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
      test.info('Add info');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree ul li').length;
      });
      this.click('a#showInfoModalToAdd');
      this.waitUntilVisible('div#addInfoModal', function() {
         this.evaluate(function(term) {
            document.querySelector('input#add-info').setAttribute('checked', true);
         });
         this.fillSelectors('div#addInfoModal form', {
            'div#addInfoModal form input#add-info-name': '000testinfo',
            'div#addInfoModal form select#add-info-parent': '0'
         }, false);
         this.click('button#addInfoButton');
         this.wait(4000, function() {
            var newCount = this.evaluate(function() {
               return __utils__.findAll('div#infos-tree ul li').length;
            });
            test.assertEquals(newCount, count + 1, 'One info has been added');
            test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testinfo', 'New name is ok');
            this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
            this.wait(4000, function() {
               test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'New info is not displayed on map');
               infoId = this.evaluate(function() {
                  return __utils__.getFormValues('form#infos-form')['id'];
               });
            }, function() {
               test.fail('Could not open new info');
            });
         }, function() {
            test.fail('New info was not added');
         });
      }, function() {
         test.fail('Add Infos modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Add map items linked to info');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#mapItem-table tbody tr').length;
      });
      this.click('a#addMapItemTriggerModal');
      this.waitUntilVisible('div#addMapItemModal', function() {
         this.fillSelectors('div#addMapItemModal form', {
            'div#addMapItemModal form input#newLabel': '000test',
            'div#addMapItemModal form select#addMapItem-linked-info': infoId,
         }, false);
         this.click('button#addMapItemButton');
         this.wait(4000, function() {
            var newCount = this.evaluate(function() {
               return __utils__.findAll('table#mapItem-table tbody tr').length;
            });
            test.assertEquals(newCount, count + 1, 'One map item has been added');
            test.assertSelectorHasText('table#mapItem-table tbody tr:first-child td:nth-of-type(4)', '000testinfo', 'New linked info is ok');
            this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
            this.wait(4000, function() {
               test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Oui', 'New info is displayed on map');
            }, function() {
               test.fail('Could not open new info');
            });
         }, function() {
            test.fail('New map item was not added');
         });
      }, function() {
         test.fail('Add map item modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Delete map item linked to info');
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
         this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
         this.wait(4000, function() {
            test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'New info is not displayed on map');
         }, function() {
            test.fail('Could not open new info');
         });
      }, function() {
         test.fail('Map item was not deleted');
      });
   });

   casper.then(function() {
      test.info('Delete info');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree li').length;
      });
      this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
      this.wait(4000, function() {
         this.click('#infosDeleteButton');
         this.waitUntilVisible('div#onDeleteInfoAlert', function() {
            test.pass('Info delete modal is displayed');
         }, function() {
            test.fail('Info delete alert did not show up');
         });
         this.wait(4000, function() {
            var newCount = this.evaluate(function() {
               return __utils__.findAll('div#infos-tree li').length;
            });
            test.assertEquals(newCount, count -1, 'One info has been removed');
            test.assertSelectorDoesntHaveText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testinfo', 'Info has been deleted');
         }, function() {
            test.fail('Info was not deleted');
         });
      });
   });

   casper.run(function() {
      test.done();
   });
});

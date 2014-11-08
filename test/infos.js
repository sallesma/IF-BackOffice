var fs = require('fs');
var emptyfilesize = 514;

casper.test.begin('Testing infos manipulation', 27, function suite(test) {
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
      test.info('Testing infos section');
      test.assertExists('div.bs-docs-section div.page-header h1#infos', "Infos header exists");
      test.assertExists('div#infos-div', "Infos tree exists");
   });

   casper.then(function() {
      test.info('Testing category add');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree ul li').length;
      });
      this.click('a#showInfoModalToAdd');
      this.waitUntilVisible('div#addInfoModal', function() {
         this.fill('div#addInfoModal form', {
            'files[]': 'test/image.png'
         }, false);
         this.wait(4000, function() {
            this.evaluate(function(term) {
               document.querySelector('input#add-category').setAttribute('checked', true);
            });
            this.fillSelectors('div#addInfoModal form', {
               'div#addInfoModal form input#add-info-name': '000test',
               'div#addInfoModal form select#add-info-parent': '0'
            }, false);
            this.click('button#addInfoButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('div#infos-tree ul li').length;
               });
               test.assertEquals(newCount, count + 1, 'One category has been added');
               test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000test', 'New name is ok');
               this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
               this.wait(4000, function() {
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-name'] == "000test";
                  }, 'New name in edit form is ok');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['isCategoryRadio'] == "1";
                  }, 'New info is a category');
                  test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'New category is not displayed on map');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-parent'] == "0";
                  }, 'New category has no parent');
                  test.assertEvalEquals(function() {
                     return document.querySelectorAll('div#infos-edit-form #edit-photoInfo img')[0].getAttribute("src");
                  }, url + 'src/fileUpload/infos/image.png', 'New category picture is ok');
                  this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
                  test.assertNotEquals(fs.size('uploaded.png'), emptyfilesize, 'Category picture was uploaded');
                  fs.remove('uploaded.png');
               }, function() {
                  test.fail('Could not open new category');
               });
            }, function() {
               test.fail('New category was not added');
            });
         }, function() {
            test.fail('Could not upload category picture');
         });
      }, function() {
         test.fail('Add Infos modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Testing category delete');
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
            test.assertSelectorDoesntHaveText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000test', 'New name is ok');
            this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
            test.assertEquals(fs.size('uploaded.png'), emptyfilesize, 'Category picture was deleted');
            fs.remove('uploaded.png');
         }, function() {
            test.fail('Category was not deleted');
         });
      });
   });

   casper.then(function() {
      test.info('Testing info add');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree ul li').length;
      });
      this.click('a#showInfoModalToAdd');
      this.waitUntilVisible('div#addInfoModal', function() {
         this.fill('div#addInfoModal form', {
            'files[]': 'test/image.png'
         }, false);
         this.wait(4000, function() {
            this.evaluate(function(term) {
               document.querySelector('input#add-info').setAttribute('checked', true);
            });
            this.fillSelectors('div#addInfoModal form', {
               'div#addInfoModal form input#add-info-name': '000test',
               'div#addInfoModal form select#add-info-parent': '0'
            }, false);
            this.click('button#addInfoButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('div#infos-tree ul li').length;
               });
               test.assertEquals(newCount, count + 1, 'One info has been added');
               test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000test', 'New name is ok');
               this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
               this.wait(4000, function() {
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-name'] == "000test";
                  }, 'New name in edit form is ok');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['isCategoryRadio'] == "0";
                  }, 'New info is an info');
                  test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'New info is not displayed on map');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-parent'] == "0";
                  }, 'New info has no parent');
                  test.assertEvalEquals(function() {
                     return document.querySelectorAll('div#infos-edit-form #edit-photoInfo img')[0].getAttribute("src");
                  }, url + 'src/fileUpload/infos/image.png', 'New info picture is ok');
                  this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
                  test.assertNotEquals(fs.size('uploaded.png'), emptyfilesize, 'Info picture was uploaded');
                  fs.remove('uploaded.png');
               }, function() {
                  test.fail('Could not open new info');
               });
            }, function() {
               test.fail('New info was not added');
            });
         }, function() {
            test.fail('Could not upload info picture');
         });
      }, function() {
         test.fail('Add Infos modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Testing info delete');
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
            test.assertSelectorDoesntHaveText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000test', 'New name is ok');
            this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
            test.assertEquals(fs.size('uploaded.png'), emptyfilesize, 'Info picture was deleted');
            fs.remove('uploaded.png');
         }, function() {
            test.fail('Info was not deleted');
         });
      });
   });

   casper.run(function() {
      test.done();
   });
});

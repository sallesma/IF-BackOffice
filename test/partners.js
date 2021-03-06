casper.test.begin('Testing partners manipulation', 23, function suite(test) {
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
      test.info('Testing partners section');
      test.assertExists('div.bs-docs-section div.page-header h1#partners', "Partners header exists");
      test.assertExists('table#partners-table', "Partners table exists");
   });

   casper.then(function() {
      test.info('Add partners');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#partners-table tbody tr').length;
      });
      this.click('a#addPartnersTriggerModal');
      this.waitUntilVisible('div#addPartnerModal', function() {
         this.fill('div#addPartnerModal form', {
            'files[]': 'test/image.png'
         }, false);
         this.wait(4000, function() {
            this.fillSelectors('div#addPartnerModal form', {
               'div#addPartnerModal form input#newName': 'test',
               'div#addPartnerModal form input#newWebsite': 'testtesttest',
               'div#addPartnerModal form input#newPriority': '999999999'
            }, false);
            this.click('button#addPartnerButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('table#partners-table tbody tr').length;
               });
               test.assertEquals(newCount, count + 1, 'One partner has been added');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(1)', 'test', 'New name is ok');
               test.assertEvalEquals(function() {
                  return document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img')[0].getAttribute("src");
               }, url + 'src/fileUpload/partners/image.png', 'New picture is ok');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(3)', 'testtesttest', 'New website is ok');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(4)', '999999999', 'New priority is ok');
               this.download(url + '/src/fileUpload/partners/doesnotexist.png', 'doesnotexist.png');
               this.download(url + '/src/fileUpload/partners/image.png', 'uploaded.png');
               test.assertNotEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Partner picture was uploaded');
               fs.remove('uploaded.png');
               fs.remove('doesnotexist.png');
            }, function() {
               test.fail('New partner was not added');
            });
         }, function() {
            test.fail('Could not upload partner picture');
         });
      }, function() {
         test.fail('Add partners modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Update partner');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#partners-table tbody tr').length;
      });
      this.click('table#partners-table tbody tr:first-child button.modifyPartnerButton');
      this.waitUntilVisible('div#editPartnerModal', function() {
         this.fill('div#editPartnerModal form', {
            'files[]': 'test/ananas.jpg'
         }, false);
         this.wait(4000, function() {
            this.fillSelectors('div#editPartnerModal form', {
               'div#editPartnerModal form input#name': 'test2',
               'div#editPartnerModal form input#website': 'testtesttest2',
               'div#editPartnerModal form input#priority': '999999998'
            }, false);
            this.click('button#editPartnerButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('table#partners-table tbody tr').length;
               });
               test.assertEquals(newCount, count, 'No partner has been added');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(1)', 'test2', 'Updated name is ok');
               test.assertEvalEquals(function() {
                  return document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img')[0].getAttribute("src");
               }, url + 'src/fileUpload/partners/ananas.jpg', 'Updated picture is ok');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(3)', 'testtesttest2', 'Updated website is ok');
               test.assertSelectorHasText('table#partners-table tbody tr:first-child td:nth-of-type(4)', '999999998', 'Updated priority is ok');
               this.download(url + '/src/fileUpload/partners/doesnotexist.png', 'doesnotexist.png');
               this.download(url + '/src/fileUpload/partners/image.png', 'uploaded.png');
               test.assertEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Partner old picture was deleted');
               fs.remove('uploaded.png');
               this.download(url + '/src/fileUpload/partners/ananas.jpg', 'uploaded.jpg');
               test.assertNotEquals(fs.size('uploaded.jpg'), fs.size('doesnotexist.png'), 'Partner picture was uploaded');
               fs.remove('uploaded.jpg');
               fs.remove('doesnotexist.png');

            });
         });
      }, function() {
         test.fail('Add partners modal was not visible');
      });
   });
   casper.then(function() {
      test.info('Delete partners');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#partners-table tbody tr').length;
      });
      this.click('table#partners-table tbody tr:first-child button.partnerDeleteButton');
      this.waitUntilVisible('div#onDeletePartnersAlert', function() {
         test.pass('Partners delete modal is displayed');
      }, function() {
         test.fail('Partners delete alert did not show up');
      });
      this.wait(4000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#partners-table tbody tr').length;
         });
         test.assertEquals(newCount, count -1, 'One partner has been removed');
         test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(1)', 'test2');
         test.assertEval(function (url) {
            if (document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img').length == 0)
               return true;
            else
               return document.querySelectorAll('table#partners-table tbody tr:first-child td:nth-of-type(2) img')[0].getAttribute('src') != url + 'src/fileUpload/partners/ananas.jpg';
         });
         test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(3)', 'testtesttest2');
         test.assertSelectorDoesntHaveText('table#partners-table tbody tr:first-child td:nth-of-type(4)', '999999998');
         this.download(url + '/src/fileUpload/partners/doesnotexist.png', 'doesnotexist.png');
         this.download(url + '/src/fileUpload/partners/ananas.jpg', 'uploaded.jpg');
         test.assertEquals(fs.size('uploaded.jpg'), fs.size('doesnotexist.png'), 'Partner picture was deleted');
         fs.remove('uploaded.jpg');
         fs.remove('doesnotexist.png');
      }, function() {
         test.fail('Partner was not deleted');
      });
   });
 
   casper.run(function() {
      test.done();
   });
});

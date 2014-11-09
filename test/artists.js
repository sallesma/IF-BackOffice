var fs = require('fs');
var emptyfilesize = 514;

casper.test.begin('Testing artists manipulation', 26, function suite(test) {
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
      test.info('Testing artists section');
      test.assertExists('div.bs-docs-section div.page-header h1#artists', "Artists header exists");
      test.assertExists('table#artists-table', "Artists table exists");
   });

   casper.then(function() {
      test.info('Add artists');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#artists-table tbody tr').length;
      });
      this.click('#showArtistModalToAdd');
      this.waitUntilVisible('div#artistModal', function() {
         this.fill('div#artistModal form#artist-add-form', {
            'files[]': 'test/image.png'
         }, false);
         this.wait(4000, function() {
            this.fillSelectors('div#artistModal form#artist-add-form', {
               'div#artistModal form input#art-name': '000test',
               'div#artistModal form input#art-style': 'teststyle',
               'div#artistModal form textarea#art-description': 'testtesttest',
               'div#artistModal form select#art-scene': 'principale',
               'div#artistModal form select#art-day': 'vendredi',
               'div#artistModal form input#art-start-time': '01:00',
               'div#artistModal form input#art-end-time': '03:00',
               'div#artistModal form input#art-website': 'testwebsite',
               'div#artistModal form input#art-facebook': 'testfacebook',
               'div#artistModal form input#art-twitter': 'testtwitter',
               'div#artistModal form input#art-youtube': 'testyoutube'
            }, false);
            this.click('button#artistModalActionButton');
            this.wait(4000, function() {
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(1)', 'test', 'New name is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(2)', 'teststyle', 'New style is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(3)', 'principale', 'New stage is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(4)', 'vendredi', 'New day is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(5)', '01:00', 'New hour is ok');
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('table#artists-table tbody tr').length;
               });
               test.assertEquals(newCount, count + 1, 'One artist has been added');
               this.download(url + '/src/fileUpload/artists/image.png', 'uploaded.png');
               test.assertNotEquals(fs.size('uploaded.png'), emptyfilesize, 'Artist picture was uploaded');
               fs.remove('uploaded.png');
            }, function() {
               test.fail('New artist was not added');
            });
         }, function() {
            test.fail('Could not upload artist picture');
         });
      }, function() {
         test.fail('Add artist modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Update artist');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#artists-table tbody tr').length;
      });
      test.assertEvalEquals(function() {
         return document.querySelectorAll('div#artistModal form#artist-add-form #photoArtist img')[0].getAttribute("src");
      }, url + 'src/fileUpload/artists/image.png', 'Modal contains artist picture');
      this.click('table#artists-table tbody tr:first-child button.showArtistButton');
      this.waitUntilVisible('div#artistModal', function() {
         test.pass('Edit artist modal is visible');
         this.fillSelectors('div#artistModal form#artist-add-form', {
            'div#artistModal form input#art-name': '000test2',
            'div#artistModal form input#art-style': 'teststyle2',
            'div#artistModal form textarea#art-description': 'testtesttest2',
            'div#artistModal form select#art-scene': 'chapiteau',
            'div#artistModal form select#art-day': 'samedi',
            'div#artistModal form input#art-start-time': '02:00',
            'div#artistModal form input#art-end-time': '04:00',
            'div#artistModal form input#art-website': 'testwebsite2',
            'div#artistModal form input#art-facebook': 'testfacebook2',
            'div#artistModal form input#art-twitter': 'testtwitter2',
            'div#artistModal form input#art-youtube': 'testyoutube2'
         }, false);
         this.fill('div#artistModal form#artist-add-form', {
            'files[]': 'test/ananas.jpg'
         }, false);
         this.wait(4000, function() {
            this.click('button#artistModalActionButton');
            this.wait(4000, function() {
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(1)', 'test2', 'Updated name is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(2)', 'teststyle2', 'Updated style is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(3)', 'chapiteau', 'Updated stage is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(4)', 'samedi', 'Updated day is ok');
               test.assertSelectorHasText('table#artists-table tbody tr:first-child td:nth-of-type(5)', '02:00', 'Updated hour is ok');
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('table#artists-table tbody tr').length;
               });
               test.assertEquals(newCount, count, 'No artist has been added');
               this.download(url + '/src/fileUpload/artists/image.png', 'uploaded.png');
               test.assertEquals(fs.size('uploaded.png'), emptyfilesize, 'Artist old picture was deleted');
               fs.remove('uploaded.png');
               this.download(url + '/src/fileUpload/artists/ananas.jpg', 'uploaded.jpg');
               test.assertNotEquals(fs.size('uploaded.jpg'), emptyfilesize, 'Artist updated picture was uploaded');
               fs.remove('uploaded.jpg');
            }, function() {
               test.fail('Last artist was not updated');
            });
         });
      }, function() {
         test.fail('Edit artist modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Delete artist');
      var count = this.evaluate(function() {
         return __utils__.findAll('table#artists-table tbody tr').length;
      });
      this.click('table#artists-table tbody tr:first-child button.artistDeleteButton');
      this.waitUntilVisible('div#onDeleteArtistAlert', function() {
         test.pass('Artist delete modal is displayed');
      }, function() {
         test.fail('Artist delete alert did not show up');
      });
      this.wait(4000, function() {
         var newCount = this.evaluate(function() {
            return __utils__.findAll('table#artists-table tbody tr').length;
         });
         test.assertEquals(newCount, count - 1, 'One artist has been removed');
         test.assertSelectorDoesntHaveText('table#artists-table tbody tr:first-child td:nth-of-type(1)', '000test');
         test.assertSelectorDoesntHaveText('table#artists-table tbody tr:first-child td:nth-of-type(2)', 'teststyle');
         test.assertSelectorDoesntHaveText('table#artists-table tbody tr:first-child td:nth-of-type(5)', '01:00');
         this.download(url + '/src/fileUpload/artists/ananas.jpg', 'uploaded.jpg');
         test.assertEquals(fs.size('uploaded.jpg'), emptyfilesize, 'Artist picture was deleted');
         fs.remove('uploaded.jpg');
      }, function() {
         test.fail('Artist was not deleted');
      });
   });
 
   casper.run(function() {
      test.done();
   });
});

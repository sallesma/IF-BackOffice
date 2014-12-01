casper.test.begin('Testing infos manipulation', 44, function suite(test) {
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
      test.info('Add category');
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
               'div#addInfoModal form input#add-info-name': '000testcat',
               'div#addInfoModal form select#add-info-parent': '0'
            }, false);
            this.click('button#addInfoButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('div#infos-tree ul li').length;
               });
               test.assertEquals(newCount, count + 1, 'One category has been added');
               test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testcat', 'New name is ok');
               this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
               this.wait(4000, function() {
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-name'] == "000testcat";
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
                  this.download(url + '/src/fileUpload/infos/doesnotexist.png', 'doesnotexist.png');
                  this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
                  test.assertNotEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Category picture was uploaded');
                  fs.remove('uploaded.png');
                  fs.remove('doesnotexist.png');
                  categoryId = this.evaluate(function() {
                     return __utils__.getFormValues('form#infos-form')['id'];
                  });
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
      test.info('Add info');
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
               'div#addInfoModal form input#add-info-name': '000testinfo',
               'div#addInfoModal form textarea#add-info-content': 'testtesttest',
               'div#addInfoModal form select#add-info-parent': categoryId
            }, false);
            this.click('button#addInfoButton');
            this.wait(4000, function() {
               var newCount = this.evaluate(function() {
                  return __utils__.findAll('div#infos-tree ul li').length;
               });
               test.assertEquals(newCount, count + 1, 'One info has been added');
               test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child  > ul > li', '000testinfo', 'New name is ok');
               this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child > ul > li > div');
               this.wait(4000, function() {
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-name'] == "000testinfo";
                  }, 'New name in edit form is ok');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['info-content'] == "testtesttest";
                  }, 'New content in edit form is ok');
                  this.test.assertEval(function() {
                     return __utils__.getFormValues('form#infos-form')['isCategoryRadio'] == "0";
                  }, 'New info is an info');
                  test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'New info is not displayed on map');
                  this.test.assertEval(function() {
                     var select = document.querySelectorAll('form#infos-form select#info-parent')[0];
                     return select.options[select.selectedIndex].innerHTML == '000testcat'
                  }, 'New info has the added category as a parent');
                  test.assertEvalEquals(function() {
                     return document.querySelectorAll('div#infos-edit-form #edit-photoInfo img')[0].getAttribute("src");
                  }, url + 'src/fileUpload/infos/image_1.png', 'New info picture is ok');
                  this.download(url + '/src/fileUpload/infos/doesnotexist.png', 'doesnotexist.png');
                  this.download(url + '/src/fileUpload/infos/image_1.png', 'uploaded.png');
                  test.assertNotEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Info picture was uploaded');
                  fs.remove('uploaded.png');
                  fs.remove('doesnotexist.png');
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
      test.info('Delete category and contained info is moved up');
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
            test.assertSelectorDoesntHaveText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testcat', 'Category has been deleted');
            this.download(url + '/src/fileUpload/infos/doesnotexist.png', 'doesnotexist.png');
            this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
            test.assertEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Category picture was deleted');
            fs.remove('uploaded.png');
            fs.remove('doesnotexist.png');
            this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child > div');
            this.wait(4000, function() {
               this.test.assertEval(function() {
                  return __utils__.getFormValues('form#infos-form')['info-name'] == "000testinfo";
               }, 'New name in edit form is ok');
               this.test.assertEval(function() {
                  var select = document.querySelectorAll('form#infos-form select#info-parent')[0];
                  return select.options[select.selectedIndex].innerHTML == 'Aucun parent'
               }, 'New info has no parent');
            }, function() {
               test.fail('Could not check that new info was moved up in the tree info');
            });
         }, function() {
            test.fail('Category was not deleted');
         });
      });
   });

   casper.then(function() {
      test.info('Add category');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree ul li').length;
      });
      this.click('a#showInfoModalToAdd');
      this.waitUntilVisible('div#addInfoModal', function() {
         this.click('input#add-category');
         this.fillSelectors('div#addInfoModal form', {
            'div#addInfoModal form input#add-info-name': '000testcatupdate',
            'div#addInfoModal form select#add-info-parent': '0'
         }, false);
         this.click('button#addInfoButton');
         this.wait(4000, function() {
            var newCount = this.evaluate(function() {
               return __utils__.findAll('div#infos-tree ul li').length;
            });
            test.assertEquals(newCount, count + 1, 'One category has been added');
            test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testcatupdate', 'New name is ok');
            this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div.jqx-tree-item');
            this.wait(4000, function() {
               categoryId = this.evaluate(function() {
                  return __utils__.getFormValues('form#infos-form')['id'];
               });
            });
        }, function() {
           test.fail('New category was not added');
        });
      }, function() {
         test.fail('Add Infos modal was not visible');
      });
   });

   casper.then(function() {
      test.info('Update info');
      this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:nth-last-child(2) > div');
      this.wait(4000, function() {
         this.fillSelectors('form#infos-form', {
            'input#info-name': '000testinfo2',
            'textarea#info-content': 'testtesttest2',
            'select#info-parent': categoryId
         }, false);
         this.fill('form#infos-form', {
            'files[]': 'test/ananas.jpg'
         }, false);
         this.wait(4000, function() {
            this.click('button#infosEditButton');
            this.wait(4000, function(){
                  test.assertSelectorHasText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child  > ul > li', '000testinfo2', 'Updated name is ok');
               this.test.assertEval(function() {
                  return __utils__.getFormValues('form#infos-form')['info-name'] == "000testinfo2";
               }, 'Update name in edit form is ok');
               this.test.assertEval(function() {
                  return __utils__.getFormValues('form#infos-form')['info-content'] == "testtesttest2";
               }, 'Update content in edit form is ok');
               this.test.assertEval(function() {
                  return __utils__.getFormValues('form#infos-form')['isCategoryRadio'] == "0";
               }, 'Updated info is an info');
               test.assertSelectorHasText('div#infos-edit-form p#info-map', 'Non', 'Updated info is not displayed on map');
               this.test.assertEval(function() {
                  var select = document.querySelectorAll('form#infos-form select#info-parent')[0];
                  return select.options[select.selectedIndex].innerHTML == '000testcatupdate'
               }, 'Updated info has the added category as a parent');
               test.assertEvalEquals(function() {
                  return document.querySelectorAll('div#infos-edit-form #edit-photoInfo img')[0].getAttribute("src");
               }, url + 'src/fileUpload/infos/ananas.jpg', 'Updated info picture is ok');
               this.download(url + '/src/fileUpload/infos/doesnotexist.png', 'doesnotexist.png');
               this.download(url + '/src/fileUpload/infos/ananas.jpg', 'uploaded.jpg');
               test.assertNotEquals(fs.size('uploaded.jpg'), fs.size('doesnotexist.png'), 'Info picture was uploaded');
               fs.remove('uploaded.jpg');
               this.download(url + '/src/fileUpload/infos/image_1.png', 'uploaded.png');
               test.assertEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Info old picture was deleted');
               fs.remove('uploaded.png');
               fs.remove('doesnotexist.png');
            });
         }, function() {
            test.fail('Could not update image');
         });
      }, function() {
         test.fail('Could not open new info');
      });
   });

   casper.then(function() {
      test.info('Delete info');
      var count = this.evaluate(function() {
         return __utils__.findAll('div#infos-tree li').length;
      });
      this.click('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child > ul > li > div.jqx-tree-item');
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
            test.assertDoesntExist('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child > ul > li > div', 'Info has been deleted');
            this.download(url + '/src/fileUpload/infos/image.png', 'uploaded.png');
            this.download(url + '/src/fileUpload/infos/doesnotexist.png', 'doesnotexist.png');
            test.assertEquals(fs.size('uploaded.png'), fs.size('doesnotexist.png'), 'Info picture was deleted');
            fs.remove('uploaded.png');
            fs.remove('doesnotexist.png');
         }, function() {
            test.fail('Info was not deleted');
         });
      });
   });

   casper.then(function() {
      test.info('Delete category');
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
            test.assertSelectorDoesntHaveText('div#infos-tree ul.jqx-tree-dropdown-root > li:last-child div', '000testcat', 'Category has been deleted');
         }, function() {
            test.fail('Category was not deleted');
         });
      });
   });

   casper.run(function() {
      test.done();
   });
});
